import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCbdfeIIiPt2Rg6BfYuuSee6UE3NGPamzM",
  authDomain: "ecofors-eco.firebaseapp.com",
  projectId: "ecofors-eco",
  storageBucket: "ecofors-eco.firebasestorage.app",
  messagingSenderId: "190467798835",
  appId: "1:190467798835:android:0466b0e7ec1d653264b046",
};

const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth: Auth = getAuth(app);

export const db: Firestore = getFirestore(app);

export const storage: FirebaseStorage = getStorage(app);

export default app;