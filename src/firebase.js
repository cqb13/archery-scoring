import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnaw8B1fq-XfFnvd6qBL81mHbdTwAr3_I",
  authDomain: "archery-scoring-6e188.firebaseapp.com",
  projectId: "archery-scoring-6e188",
  storageBucket: "archery-scoring-6e188.appspot.com",
  messagingSenderId: "146906855685",
  appId: "1:146906855685:web:eee2d5f23e1ba5f6111f6c",
  measurementId: "G-NKPQK433WZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
