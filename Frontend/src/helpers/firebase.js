
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "speak-verse.firebaseapp.com",
  projectId: "speak-verse",
  storageBucket: "speak-verse.appspot.com",
  messagingSenderId: "534539839994",
  appId: "1:534539839994:web:cf5b7222bcf05cbde95c43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};
