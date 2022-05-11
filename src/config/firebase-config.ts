// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHWQApqNGMkySMMB6YGT-ej_mZiqJ6cw8",
  authDomain: "toptal-quizz-app.firebaseapp.com",
  projectId: "toptal-quizz-app",
  storageBucket: "toptal-quizz-app.appspot.com",
  messagingSenderId: "120064475266",
  appId: "1:120064475266:web:f781c9846002de39ffb49b",
  measurementId: "G-1WSQ138JFL",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
export const testing = () => collection(firestore, "quiz");

const analytics = getAnalytics(firebase);
