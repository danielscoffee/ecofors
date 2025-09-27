import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  UploadResult,
} from "firebase/storage";

import { auth, db, storage } from "../firebase";

export const authServices = {
  signUp: async (email: string, password: string): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
  },

  signIn: async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  signOut: async (): Promise<void> => {
    return await signOut(auth);
  },

  resetPassword: async (email: string): Promise<void> => {
    return await sendPasswordResetEmail(auth, email);
  },

  updateUserProfile: async (
    user: User,
    profile: { displayName?: string; photoURL?: string },
  ): Promise<void> => {
    return await updateProfile(user, profile);
  },

  getCurrentUser: (): User | null => {
    return auth.currentUser;
  },
};

export const firestoreServices = {
  create: async (
    collectionName: string,
    data: DocumentData,
  ): Promise<string> => {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  },

  set: async (
    collectionName: string,
    docId: string,
    data: DocumentData,
  ): Promise<void> => {
    return await setDoc(doc(db, collectionName, docId), data);
  },

  update: async (
    collectionName: string,
    docId: string,
    data: Partial<DocumentData>,
  ): Promise<void> => {
    return await updateDoc(doc(db, collectionName, docId), data);
  },

  get: async (
    collectionName: string,
    docId: string,
  ): Promise<DocumentSnapshot<DocumentData>> => {
    return await getDoc(doc(db, collectionName, docId));
  },

  getAll: async (
    collectionName: string,
  ): Promise<QuerySnapshot<DocumentData>> => {
    return await getDocs(collection(db, collectionName));
  },

  query: async (
    collectionName: string,
    conditions: { field: string; operator: any; value: any }[],
    orderByField?: string,
    orderDirection: "asc" | "desc" = "asc",
    limitCount?: number,
  ): Promise<QuerySnapshot<DocumentData>> => {
    let q = collection(db, collectionName);

    const whereConditions = conditions.map((condition) =>
      where(condition.field, condition.operator, condition.value),
    );

    let queryRef = query(q, ...whereConditions);

    if (orderByField) {
      queryRef = query(queryRef, orderBy(orderByField, orderDirection));
    }

    if (limitCount) {
      queryRef = query(queryRef, limit(limitCount));
    }

    return await getDocs(queryRef);
  },

  delete: async (collectionName: string, docId: string): Promise<void> => {
    return await deleteDoc(doc(db, collectionName, docId));
  },
};

export const storageServices = {
  upload: async (
    path: string,
    file: Blob | Uint8Array | ArrayBuffer,
  ): Promise<UploadResult> => {
    const storageRef = ref(storage, path);
    return await uploadBytes(storageRef, file);
  },

  getDownloadURL: async (path: string): Promise<string> => {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  },

  delete: async (path: string): Promise<void> => {
    const storageRef = ref(storage, path);
    return await deleteObject(storageRef);
  },

  uploadAndGetURL: async (
    path: string,
    file: Blob | Uint8Array | ArrayBuffer,
  ): Promise<string> => {
    await storageServices.upload(path, file);
    return await storageServices.getDownloadURL(path);
  },
};

