// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW3kfUNrp08PFl0Xp83-z2ScvTJnq2X-k",
  authDomain: "task-management-5d376.firebaseapp.com",
  databaseURL: "https://task-management-5d376-default-rtdb.firebaseio.com",
  projectId: "task-management-5d376",
  storageBucket: "task-management-5d376.firebasestorage.app",
  messagingSenderId: "816084350603",
  appId: "1:816084350603:web:87e9f6e671ae14a0b4068e",
  measurementId: "G-4LBZBEYTJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);