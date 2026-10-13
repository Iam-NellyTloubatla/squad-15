//import from firebase
import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from './firebase-config.js';
import { db } from './firebase-config.js';
import { task, collection, addDoc, onSnapshot, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// DOM Elements
const authContainer = document.getElementById('authContainer');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const resultsInput = document.getElementById('resultsObtained') || document.querySelector('input[placeholde*="85"]')

let submissions = JSON.parse(localStorage.getItem('portal_submissions') || '[]');
let currentUser = null;
let tasks = [];

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if (user) {
    listenToTasksRealtime();
  }
});

//task list and status
function listenToTasksRealtime() {
  const tasksCol = collection(db, "tasks");
  onSnapshot(tasksCol, (snapshot) => {
    const tasksList = document.getElementById('tasksList');
    if (!tasksList) return;
    tasksList.innerHTML = "";
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const li = document.createElement('li');
      li.textContent = `${data.text} - ${data.status || 'Pending'}`;
      tasksList.appendChild(li);
    });
    calculateStats();
  });
}

async function addTask() {
  const text = taskInput?.value.trim();
  if (!text) return alert("Write a task first");
  
await addDoc(collection(db, "tasks"), {
  learnerID: currentUser ? currentUser.uid : "guest",
  content: text,
  status: 'Pending',
  score: null,
  feedback: '',
  createdAt: serverTimestamp()
  });

  const record = {
  id: Date.now().toString(),
  content: text,
  status: 'Pending',
  score: null,
  feedback: ''
  };
  submissions.push(record);
  localStorage.setItem('portal_submissions', JSON.stringify(submissions));
  taskInput.value = "";
}

function calculateStats() {
  const total = submissions.length;
  const marked = submissions.filter(s => s.status === 'Marked').length;
  const statsEl = document.getElementById('stats');
  if (statsEl) statsEl.textContent = `Total: ${total} | Marked: ${marked}`;
  return { total, marked };
}

async function gradeSubmission(submissionId, marks, textFeedback) {
  submissions = submissions.map(item => {
    if (item.id === submissionId) {
      return { ...item, status: 'Marked', score: marks, feedback: textFeedback };
    }
    return item;
  });
  localStorage.setItem('portal_submissions', JSON.stringify(submissions));
  
  try {
    const docRef = doc(db, "tasks", submissionId);
    await updateDoc(docRef, { status: 'Marked', score: marks, feedback: textFeedback });
  } catch (e) {
    console.warn("Local graded only:", e.message);
  }
  calculateStats();
}

if (addTaskBtn) addTaskBtn.addEventListener('click', addTask);
calculateStats();