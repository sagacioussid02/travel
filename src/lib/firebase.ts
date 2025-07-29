// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Please replace with your actual API key
  authDomain: "comicscript.firebaseapp.com",
  projectId: "comicscript",
  storageBucket: "comicscript.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Please replace
  appId: "YOUR_APP_ID", // Please replace
  measurementId: "YOUR_MEASUREMENT_ID" // Please replace
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
