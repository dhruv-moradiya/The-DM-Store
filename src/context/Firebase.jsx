import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_API_KEY,
//   authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_APP_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_APP_STOREGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyA5qiYN3x5NA5mLhe_iIU1zM1MECzahAKI",
  authDomain: "the-dm-store.firebaseapp.com",
  projectId: "the-dm-store",
  storageBucket: "the-dm-store.appspot.com",
  messagingSenderId: "537671632368",
  appId: "1:537671632368:web:ca75f392b3857e91e18935"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)