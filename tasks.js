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
let leaner = new Role("Learner", "Nelly", "nelly@learner.com");

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
