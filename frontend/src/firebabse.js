// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "techiegold-estate.firebaseapp.com",
  projectId: "techiegold-estate",
  storageBucket: "techiegold-estate.appspot.com",
  messagingSenderId: "487322816641",
  appId: "1:487322816641:web:90281b1bb3b083bf413d80"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);