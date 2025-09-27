import { onAuthStateChanged } from "firebase/auth";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase";
import { authServices, firestoreServices } from "../services";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  schoolName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isOnboardingCompleted: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, "id"> & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await firestoreServices.get(
            "users",
            firebaseUser.uid,
          );
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const user: User = {
              id: firebaseUser.uid,
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              email: firebaseUser.email || "",
              schoolName: userData.schoolName || "",
              role: userData.role || "",
            };
            setUser(user);
            setIsAuthenticated(true);
            setIsOnboardingCompleted(userData.isOnboardingCompleted || false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setIsOnboardingCompleted(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const userCredential = await authServices.signIn(email, password);
      const firebaseUser = userCredential.user;

      const userDoc = await firestoreServices.get("users", firebaseUser.uid);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const user: User = {
          id: firebaseUser.uid,
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: firebaseUser.email || "",
          schoolName: userData.schoolName || "",
          role: userData.role || "",
        };
        setUser(user);
        setIsAuthenticated(true);
        setIsOnboardingCompleted(userData.isOnboardingCompleted || false);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (userData: Omit<User, "id"> & { password: string }) => {
    try {
      setIsLoading(true);

      const userCredential = await authServices.signUp(
        userData.email,
        userData.password,
      );
      const firebaseUser = userCredential.user;

      const userProfileData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        schoolName: userData.schoolName,
        role: userData.role,
        isOnboardingCompleted: false,
        createdAt: new Date().toISOString(),
      };

      await firestoreServices.set("users", firebaseUser.uid, userProfileData);

      await authServices.updateUserProfile(firebaseUser, {
        displayName: `${userData.firstName} ${userData.lastName}`,
      });

      const newUser: User = {
        id: firebaseUser.uid,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        schoolName: userData.schoolName,
        role: userData.role,
      };

      setUser(newUser);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      await authServices.signOut();

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const completeOnboarding = async () => {
    try {
      if (user) {
        await firestoreServices.update("users", user.id, {
          isOnboardingCompleted: true,
        });
        setIsOnboardingCompleted(true);
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
      setIsOnboardingCompleted(true);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isOnboardingCompleted,
    isLoading,
    login,
    signup,
    logout,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;

