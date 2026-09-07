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