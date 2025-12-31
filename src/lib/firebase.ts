// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrC8tAXxiwkO56t131Wu_k5L0CRHnKx1c",
  authDomain: "aicyberprophet.firebaseapp.com",
  projectId: "aicyberprophet",
  storageBucket: "aicyberprophet.firebasestorage.app",
  messagingSenderId: "476606170242",
  appId: "1:476606170242:web:d410d5a78ddeb40a37a09b",
  measurementId: "G-LZJ8XHQ5DN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
