import { db, collection, getDocs, doc, updateDoc } from './firebase-config.js';

// Fetch all written submissions for the assessor view
async function loadAssessorDashboard() {
const querySnapshot = await getDocs(collection(db, "submissions"));

querySnapshot.forEach((document) => {
const item = document.data();
const docId = document.id; // Unique Firebase document reference string

// Render rows using this docId dynamically
console.log(learner: ${item.learnerName}, Subject: ${item.subject});
});
}

// Update a specific student submission with score and remarks
async function markAssessmentInCloud(docId, scoreObtained, textFeedback) {
const documentRef = doc(db, "submissions", docId);
try {
await updateDoc(documentRef, {
status: "Marked",
score: parseFloat(scoreObtained),
feedback: textFeedback
});
alert("Marks successfully pushed to learner report card!");
} catch (error) {
console.error("Error updating document: ", error);
}
}

import { db, collection, query, where, getDocs } from './firebase-config.js';

async function viewMyResults(learnerNameInput) {
// Filter database rows down to match only the searching student's name
const q = query(collection(db, "submissions"), where("learnerName", "==", learnerNameInput));
const querySnapshot = await getDocs(q);

querySnapshot.forEach((document) => {
const record = document.data();
console.log(learner: ${record.learnerName} | Subject: ${record.subject} | Grade: ${record.score}% | Feedback: ${record.feedback});
});
}


import { db, collection, addDoc } from './firebase-

config.js';

async function submitAssessmentToCloud(learnerName, subject, type, taskContent) {
try {
// 'addDoc' automatically creates a unique global ID for this entry
const docRef = await addDoc(collection(db, "submissions"), {
learnerName: learnerName,
subject: subject, // Math, English, Robotics
type: type, // Written, Not Written
content: taskContent,
status: "Pending", // Default un-marked state
score: null,
feedback: "",
timestamp: new Date() // Stores exact submission date-time
});

console.log("Document successfully written with ID: ", docRef.id);
alert("Assessment submitted successfully to the Assessor!");
} catch (error) {
console.error("Error adding document: ", error);
}
}

import { auth, db, collection, addDoc } from './firebase-config.js';

async function submitAssessmentToCloud(subject, type, taskContent) {
// Get the currently logged-in user's unique ID
const currentUser = auth.currentUser;

if (!currentUser) return alert("You must be logged in!");


try {
await addDoc(collection(db, "submissions"), {
studentUid: currentUser.uid, // <-- Save the unique user ID here
studentEmail: currentUser.email,
subject: subject, // Math, English, Robotics
type: type, // Written, Not Written
content: taskContent,
status: "Pending",
score: null,
feedback: "",
timestamp: new Date()
});
alert("Assessment submitted!");
} catch (error) {
console.error("Submission failed: ", error);
}
}



// Application State (Initialize from localStorage or default to empty array)
let assessments = JSON.parse(localStorage.getItem('assessments')) || [];

// DOM Elements
const form = document.getElementById('assessment-form');
const titleInput = document.getElementById('title');
const typeInput = document.getElementById('type');
const scoreInput = document.getElementById('score');

const writtenList = document.getElementById('written-list');

const notWrittenList = document.getElementById('not-written-list');

const overallAvgDisplay = document.getElementById('overall-average');
const totalWrittenDisplay = document.getElementById('total-written');
const totalNonWrittenDisplay = document.getElementById('total-non-written');

// Handle Form Submission
form.addEventListener('submit', (e) => {
e.preventDefault();

// Create unique assessment object
const newAssessment = {
id: Date.now(),
title: titleInput.value.trim(),
type: typeInput.value,
score: parseFloat(scoreInput.value)

};

assessments.push(newAssessment);
updateApp();
form.reset();
});

// Delete an Assessment
function deleteAssessment(id) {
assessments = assessments.filter(item => item.id !== id);
updateApp();
}

// Calculate and Update Dashboards Statistics
function calculateStats() {
const writtenCount = assessments.filter(item => item.type === 'Written').length;
const nonWrittenCount = assessments.filter(item => item.type === 'Not 

Written').length;

// Overall Average calculation using Array.reduce
let average = 0;
if (assessments.length > 0) {
const totalScore = assessments.reduce((sum, item) => sum + item.score, 0);
average = Math.round(totalScore / assessments.length);
}

// Render Stats to DOM
overallAvgDisplay.textContent = ${average}%`;
totalWrittenDisplay.textContent = writtenCount;
totalNonWrittenDisplay.textContent = nonWrittenCount;

// Optional conditional styling for average
if (average >= 75) {
overallAvgDisplay.style.color = '#2ecc71'; // 

Green for excellent performance
} else if (average >= 50) {
overallAvgDisplay.style.color = '#3498db'; // Blue for passing
} else {
overallAvgDisplay.style.color = '#e74c3c'; // Red for failing/at risk
}
}

// Render Lists to DOM
function renderLists() {
// Clear both container elements first
writtenList.innerHTML = '';
notWrittenList.innerHTML = '';

assessments.forEach(item => {
const li = document.createElement('li');
// Standardise class name strings for CSS compliance

const safeClassName = item.type.replace(' ', '-');
li.className = assessment-item${safeClassName}`;

li.innerHTML = &lt;div class="item-info"&gt; &lt;span class="item-title"&gt;${item.title}</span>
</div>
<div style="display: flex; align-items: center; gap: 15px;">
<span class="item-score">${item.score}%&lt;/span&gt; &lt;button class="btn-delete" onclick="deleteAssessment(${item.id})"&gt;❌&lt;/button&gt; &lt;/div&gt;;

// Direct item routing based on category data type
if (item.type === 'Written') {
writtenList.appendChild(li);
} else {
notWrittenList.appendChild(li);

}
});
}

// Core Master Sync Pipeline
function updateApp() {
localStorage.setItem('assessments', JSON.stringify(assessments));
renderLists();
calculateStats();
}

// Initial Boot Cycle Run execution
updateApp();

// Application State Lifecycle
let submissions = JSON.parse(localStorage.getItem('portal_submissions')) || [];


// Action Router: Student registers an assessment
function submitAssessment(learnerID) {
const record = {
id: Date.now(), // Unique lookup identifier
learnerName: learnerID.name,
subject: learnerID.subject, // Math, English, or Robotics
type: learnerID.type, // Written or Not Written
content: learnerID.text,
status: 'Pending', // Changes to 'Marked' post-grading
score: null,
feedback: ''
};
submissions.push(record);
localStorage.setItem('portal_submissions', JSON.stringify(submissions));
}


// Action Router: Assessor updates grading indices
function gradeSubmission(submissionId, marks, textFeedback) {
submissions = submissions.map(item => {
if (item.id === submissionId) {
return { ...item, status: 'Marked', score: marks, feedback: textFeedback };
}
return item;
});
localStorage.setItem('portal_submissions', JSON.stringify(submissions));
}
import {
auth,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged

} from './firebase-config.js';

const authContainer = document.getElementById('auth-container');
const appWorkspace = document.getElementById('app-workspace');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('btn-logout');
const userDisplay = document.getElementById('user-display-email');
const authError = document.getElementById('auth-error');

// 1. Process Account Login Form
loginForm.addEventListener('submit', async (e) => {
e.preventDefault();
authError.textContent = ""; // Clear errors


const email = document.getElementById('login-email').value.trim();
const password = document.getElementById('login-password').value;

try {
await signInWithEmailAndPassword(auth, email, password);
loginForm.reset();
} catch (error) {
authError.textContent = Authentication failed: ${error.message}`;
}
});

// 2. Monitor Active User Authentication State
onAuthStateChanged(auth, (user) => {
if (user) {

// User logged in successfully
authContainer.style.display = 'none';
appWorkspace.style.display = 'block';
userDisplay.textContent = Logged in as:${user.email}`;

// Role Check Strategy
if (user.email.includes('teacher') || user.email.includes('assessor')) {
showAssessorView();
} else {
showStudentView(user.email); // Auto-load data for this student's account email
}
} else {
// User is logged out
authContainer.style.display = 'block';
appWorkspace.style.display = 'none';
}
});


// 3. Process Account Sign-out Action
logoutBtn.addEventListener('click', () => {
signOut(auth).then(() => {
alert("Session terminated securely.");
});
});

class subjects {
    constructor(task, grade, learnerID) {
        this.task = task;
        this.grade = grade;
        this.learnerID = learnerID
    }// creating classes

 
displayInfo() {
    console.log("Task:", this.task);
    console.log("grade:", this.grade);
    console.log("learner:", this.learnerID);
    }
}


//create a subject

let maths = new subjects("Complete the square", 75, "nelly@gmail.com")

maths.displayInfo()

class subjects {
    constructor(task, grade, learnerID) {
        this.task = task;
        this.grade = grade;
        this.learnerID = learnerID
    }// creating classes

 
displayInfo() {
    console.log("Task:", this.task);
    console.log("grade:", this.grade);
    console.log("learner:", this.learnerID);
    }
}


//create a subject

let maths = new subjects("Complete the square", 10, "nelly@gmail.com")
let physics = new subjects("Newton's Laws", 11, "john@gmail.com")
let chemistry = new subjects("Chemical Reactions", 10, "jane@gmail.com")    

maths.displayInfo()
physics.displayInfo()
chemistry.displayInfo()

// create an array of subjects
//let subjectsArray = [maths, physics, chemistry]

// display all subjects in the array
//function displayInfo() {
//    for (let subject of subjectsArray) {
//        subject.displayInfo();
//    }
//}

//creating class roles
class Role {
    constructor(Admin, Assessor, Learner) {
        this.Admin = Admin
        this.Assessor = Assessor
        this.Learner = Learner
    }

displayinfo(){
    console.log("Admin:", this.Admin);
    console.log("Assessor:", this.Assessor);
    console.log("Learner:", this.Learner);
    }
}

let Admin = new Role("Admin", "12345")
let Assessor = new Role("Assessor", "Joe", "assessor@gmail.com");
let learner = new Role("Learner", "Nelly", "nelly@learner.com");

Admin.displayinfo();
Assessor.displayinfo();
learner.display();

class Task {
    constructor(taskName, taskDescription, taskDeadline) {
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.taskDeadline = taskDeadline;
    }

    displayTaskInfo() {
        console.log("Task Name:", this.taskName);
        console.log("Task Description:", this.taskDescription);
        console.log("Task Deadline:", this.taskDeadline);
    }
}
let task1 = new Task("Math Assignment", "Complete the square problems", "2024-06-30");
task1.displayTaskInfo();
let task2 = new Task("Physics Lab Report", "Write a report on Newton's Laws experiment", "2024-07-05");
task2.displayTaskInfo();
