import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnwTSP0kX1YUjaDk6_8ogpxTrHn7cAO3c",
  authDomain: "yumora-1924f.firebaseapp.com",
  databaseURL: "https://yumora-1924f-default-rtdb.firebaseio.com",
  projectId: "yumora-1924f",
  storageBucket: "yumora-1924f.firebasestorage.app",
  messagingSenderId: "941292655864",
  appId: "1:941292655864:web:45c14dd7f3e12f42a1570d",
  measurementId: "G-JB785EWQV2",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
