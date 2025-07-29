// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyM6DPHM1mLrPqPVXR47KYfc_D_RqGTF4",
  authDomain: "comicscript-e26wr.firebaseapp.com",
  projectId: "comicscript-e26wr",
  storageBucket: "comicscript-e26wr.appspot.com",
  messagingSenderId: "545455533059",
  appId: "1:545455533059:web:869bfc3b43fd5e02a03236"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
