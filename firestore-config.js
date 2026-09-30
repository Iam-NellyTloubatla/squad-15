import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
apiKey: "YOUR_API_KEY",
authDomain: "task-management-5dxxx.firebaseapp.com",
projectId: "task-management-5dxxx",
storageBucket: "task-management-5dxxx.appspot.com",
messagingSenderId: "xxx",

appId: "xxx"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
signInAnonymously(auth).catch(console.error);
