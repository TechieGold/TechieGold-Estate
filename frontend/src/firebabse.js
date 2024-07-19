// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-estate-app-901b8.firebaseapp.com",
  projectId: "my-estate-app-901b8",
  storageBucket: "my-estate-app-901b8.appspot.com",
  messagingSenderId: "892409629302",
  appId: "1:892409629302:web:6028eded2db22ff59c2d57"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);