import { db, collection, getDocs, doc, updateDoc } from './firebase-config.js';
import { db } from "./firebase-config.js";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp }from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// ===== OOP: BASE CLASS =====
class User {constructor(name, id, role) { 
    this.name=name; 
    this.id=id; 
    this.role=role; 
}
getDisplayName(){ 
    return `${this.name} (${this.role})`; 
}
canManageTasks(){ 
    return false; 
}
}

class Admin extends User {
    constructor(name,id){ 
        super(name,id,'admin'); 
    }
    canManageTasks(){ 
        return true; 
    }
     canManageUsers(){ 
       return true; 
    }
}

class Assessor extends User {
    constructor(name,id){ 
        super(name,id,'assessor'); 
    }
    canManageTasks(){ r
        eturn true; 
    }
}

class Learner extends User {
    constructor(name,id){ 
        super(name,id,'learner'); 
    }
    canChooseTasks(){ 
        return true; 
    }
}

class Task {
    constructor({title,type,desc,dueDate,totalMarks,createdBy}){
        this.title=title; 
        this.type=type; 
        this.desc=desc; 
        this.dueDate=dueDate;
        this.totalMarks=totalMarks||100; 
        this.createdBy=createdBy;
        this.createdAt=serverTimestamp();
    }
    toFirestore(){ 
        return{title:this.title,type:this.type,desc:this.desc,dueDate:this.dueDate,totalMarks:this.totalMarks,createdBy:this.createdBy,createdAt:this.createdAt} 
    }
}

class TaskRepository {
    static col = collection(db,"tasks");
    static subCol = collection(db,"submissions");
    static async create(task){ 
        return await addDoc(this.col, task.toFirestore()); 
    }
    static async update(id, data){ 
        return await updateDoc(doc(db,"tasks",id), data); 
    }
    static async delete(id){ 
        return await deleteDoc(doc(db,"tasks",id)); 
    }
}

class App {
    constructor(){
        this.currentUser=null; 
        this.editId=null; 
        this.allTasks=[]; 
        this.allSubmissions=[];
        this.cacheEls(); 
        this.loadUser(); 
        this.bindEvents(); 
        this.listenData();
    }
    cacheEls(){ 
        this.els = { roleSelect:document.getElementById("roleSelect"),userName:document.getElementById("userName"),userId:document.getElementById("userId"),loginBtn:document.getElementById("loginBtn"),authBox:document.getElementById("authBox"),userInfo:document.getElementById("userInfo"),userDisplay:document.getElementById("userDisplay"),
            logoutBtn:document.getElementById("logoutBtn"),loginScreen:document.getElementById("loginScreen"),app:document.getElementById("app"),adminView:document.getElementById("adminView"),assessorView:document.getElementById("assessorView"),learnerView:document.getElementById("learnerView"),title:document.getElementById("taskTitle"), 
            type:document.getElementById("taskType"),desc:document.getElementById("taskDesc"), due:document.getElementById("dueDate"),marks:document.getElementById("totalMarks"),addBtn:document.getElementById("addTaskBtn"),cancelBtn:document.getElementById("cancelEditBtn"),tasksList:document.getElementById("tasksList"),
            submissionsList:document.getElementById("submissionsList"),availableTasks:document.getElementById("availableTasks"),myTasks:document.getElementById("myTasks") }; 
    }
    
    loadUser(){ 
        const data=JSON.parse(localStorage.getItem("portal_user")||"null"); 
        if(!data)
            return; this.setUserObject(data); this.showApp(); 
        }

        setUserObject(data){
            if(data.role==='admin') this.currentUser=new Admin(data.name,data.id);
            else if
            (data.role==='assessor') this.currentUser=new Assessor(data.name,data.id);
            else 
                this.currentUser=new Learner(data.name,data.id);
            }
            
            bindEvents(){
                this.els.loginBtn.addEventListener("click",()=>this.login());this.els.logoutBtn.addEventListener("click",()=>{
                    localStorage.removeItem("portal_user");location.reload();});this.els.addBtn.addEventListener("click",(e)=>this.saveTask(e));
                    this.els.cancelBtn.addEventListener("click",()=>{this.editId=null; this.clearForm();     
                    });window.editTask=(id)=>this.editTask(id); 
                    window.deleteTask=(id)=>this.deleteTask(id);window.chooseTask=(id)=>this.chooseTask(id);
                    window.updateStatus=(id,s)=>this.updateStatus(id,s); window.grade=(id)=>this.grade(id);
}

login(){
    const name=this.els.userName.value.trim(), id=this.els.userId.value.trim(),role=this.els.roleSelect.value;
    if(!name||!id) 
        return alert("Enter name and ID");this.setUserObject({name,id,role});
    localStorage.setItem("portal_user",JSON.stringify({name,id,role})); this.showApp();}showApp(){this.els.loginScreen.classList.add("hidden"); this.els.app.classList.remove("hidden");this.els.authBox.classList.add("hidden"); this.els.userInfo.classList.remove("hidden");this.els.userDisplay.textContent=this.currentUser.getDisplayName();this.els.assessorView.classList.add("hidden");this.els.learnerView.classList.add("hidden"); this.els.adminView.classList.add("hidden");
        if(this.currentUser instanceof Admin) this.els.adminView.classList.remove("hidden");
        if(this.currentUser instanceof Assessor || this.currentUser instanceof Admin)this.els.assessorView.classList.remove("hidden");
        if(this.currentUser instanceof Learner) this.els.learnerView.classList.remove("hidden");}listenData(){onSnapshot(collection(db,"tasks"), snap=>{this.allTasks=snap.docs.map(d=>({id:d.id,...d.data()})); this.render(); });onSnapshot(collection(db,"submissions"), snap=>{this.allSubmissions=snap.docs.map(d=>({id:d.id,...d.data()})); this.render(); 
});
}

async saveTask(e){e.preventDefault(); 
    if(!this.currentUser.canManageTasks()) 
        return alert("No permission");

const taskObj=new Task({title:this.els.title.value.trim(), type:this.els.type.value,desc:this.els.desc.value.trim(), dueDate:this.els.due.value,totalMarks:Number(this.els.marks.value)||100, createdBy:this.currentUser.name});
if(!taskObj.title) 
    return alert("Title required");
if(this.editId) await TaskRepository.update(this.editId, taskObj.toFirestore()); 
else 
    awaitTaskRepository.create(taskObj);this.editId=null; this.clearForm(); alert("Task saved!");}clearForm(){ this.els.title.value=""; this.els.desc.value=""; this.els.due.value="";this.els.marks.value=""; this.els.addBtn.textContent="Add Task";this.els.cancelBtn.classList.add("hidden"); }editTask(id){ const t=this.allTasks.find(x=>x.id===id); this.editId=id;this.els.title.value=t.title; this.els.type.value=t.type; this.els.desc.value=t.desc;this.els.due.value=t.dueDate||""; this.els.marks.value=t.totalMarks;this.els.addBtn.textContent="Update Task"; this.els.cancelBtn.classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"}); }async deleteTask(id){ if(!confirm("Delete task?")) return; await TaskRepository.delete(id); }async chooseTask(taskId){ const task=this.allTasks.find(t=>t.id===taskId); awaitaddDoc(collection(db,"submissions"),{taskId,taskTitle:task.title,learnerId:this.currentUser.id,learnerName:this.currentUser.name,status:"NotStarted",result:null,feedback:"",chosenAt:serverTimestamp()}); }async updateStatus(subId,status){ awaitupdateDoc(doc(db,"submissions",subId),{status}); }async grade(subId){ const result=document.getElementById(`res-${subId}`).value,feedback=document.getElementById(`fb-${subId}`).value; awaitupdateDoc(doc(db,"submissions",subId),{result:Number(result),feedback,status:"Graded"}); }render(){if(this.els.tasksList) this.els.tasksList.innerHTML=this.allTasks.map(t=>`<divclass="task-card"><span class="badgenavy">${t.type}</span><h4>${t.title}</h4><p>${t.desc}</p><div class="task-actions"><button onclick="editTask('${t.id}')" class="secondary">Edit</button><button
onclick="deleteTask('${t.id}')"class="secondary">Delete</button></div></div>`).join("")||"No tasks";if(this.els.availableTasks && this.currentUser instanceof Learner){constmyIds=this.allSubmissions.filter(s=>s.learnerId===this.currentUser.id).map(s=>s.taskId);this.els.availableTasks.innerHTML=this.allTasks.filter(t=>!myIds.includes(t.id)).map(t=>`<div class="task-card"><h4>${t.title}</h4><p>${t.desc}</p><buttononclick="chooseTask('${t.id}')" class="primary">Choose Task</button></div>`).join("")||"Allchosen";this.els.myTasks.innerHTML=this.allSubmissions.filter(s=>s.learnerId===this.currentUser.id).map(s=>`<div class="task-card"><span class="badge${s.status==="Graded"?"navy":"silver"}">${s.status}</span>${s.result!=null?`<spanclass="badgenavy">${s.result}%</span>`:""}<h4>${s.taskTitle}</h4>${s.feedback?`<p><b>Feedback:</b> ${s.feedback}</p>`:""}<div class="task-actions">${s.status==="Not Started"?`<buttononclick="updateStatus('${s.id}','Written')" class="secondary">MarkWritten</button>`:""}${s.status==="Written"?`<buttononclick="updateStatus('${s.id}','Submitted')"class="primary">Submit</button>`:""}${s.status==="Graded"?`Final:${s.result}%`:""}</div></div>`).join("")||"No tasks";}if(this.els.submissionsList)this.els.submissionsList.innerHTML=this.allSubmissions.map(s=>`<divclass="submission-row"><b>${s.learnerName}</b> - ${s.taskTitle} - ${s.status}${s.result!=null?`${s.result}%`:""} <input id="res-${s.id}" value="${s.result??""}"placeholder="%"><input id="fb-${s.id}" value="${s.feedback||""}"placeholder="feedback"><button onclick="grade('${s.id}')"class="primary">Save</button></div>`).join("")||"No submissions";}}new App();