import { User, onAuthStateChanged } from "firebase/auth";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase";

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  initialized: boolean;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
  initialized: false,
});

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!initialized) {
        setInitialized(true);
      }
    });

    return () => unsubscribe();
  }, [initialized]);

  const value = {
    user,
    loading,
    initialized,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextType => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

