import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOvifi-9GbjLYRgunC6ZWaC-sGQTD2xcM",
  authDomain: "sidoni-ai.firebaseapp.com",
  projectId: "sidoni-ai",
  storageBucket: "sidoni-ai.appspot.com",
  messagingSenderId: "1078070784045",
  appId: "1:1078070784045:web:cbb2a74e075e96317148a4"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
