//import from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//firebase configuarations methods and API's
const firebaseConfig = {
  apiKey: "AIzaSyCW3kfUNrp08PFl0Xp83-z2ScvTJnq2X-k",
  authDomain: "https://console.firebase.google.com/project/task-management-5d376/firestore/databases/-default-/data/~2Ftasks~2Ftasks?view=panel-view&query=1%7CLIM%7C3%2F100&scopeType=collection&scopeName=%2Ftasks",
  projectId: "https://console.firebase.google.com/project/task-management-5d376/firestore/databases",
  storageBucket: "task-management-5d376.appspot.com",
  messagingSenderId: "1054484845678",
  appId: "1:1054484845678:web:1234567890abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { signInWithEmailAndPassword, signOut, onAuthStateChanged };
