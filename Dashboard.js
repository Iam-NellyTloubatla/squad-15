//Dashboard loader
function loadDashboard() {
    if (userRole === "learner") {
    // Load the learner dashboard
    const tasks = currentUser.tasks || [];
    const completedTasks = tasks.filter(t => t.status === "completed"). length;
    const pendingTasks = tasks.filter(t => t.status === "pending").length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    console.log("Learner Dashboard:");
    console.log("Total Tasks:", totalTasks);
    console.log("Completed Tasks:", completedTasks);
    console.log("Pending Tasks:", pendingTasks);
    console.log("Progress:", progress + "%");
    console.log("Mini-game access enabled:")
} else if (userRole === "Assessor") {
    // Load the assessor dashboard
    const submissions = currentUser.submissions || [];
    const totalSubmissions = submissions.length;
    const pendingSubmissions = submissions.filter(s => s.status === "pending").length;
    const completedSubmissions = submissions.filter(s => s.status === "completed").length;

    console.log("Assessor Dashboard:");
    console.log("Total Submissions:", totalSubmissions);
    console.log("Pending Submissions:", pendingSubmissions);
    console.log("Completed Submissions:", completedSubmissions);
    console.log("Grading tools available:")  
} else if (userRole === "Admin") {
    // Load the admin dashboard
    const totalUsers = userRegistry.length;
    const totalSubmissions = submissionRegistry.length;
    const pendingSubmissions = submissionRegistry.filter(s => s.status === "pending").length;
    const completedSubmissions = submissionRegistry.filter(s => s.status === "completed").length;

    console.log("Admin Dashboard:");
    console.log("Total Users:", totalUsers);
    console.log("Total Submissions:", totalSubmissions);
    console.log("Pending Submissions:", pendingSubmissions);
    console.log("Completed Submissions:", completedSubmissions);
    console.log("Master list users by role:",userRegistry);
    console.log("Reports and analytics available:");
} else {
    console.log("No user is currently logged in. Please log in to access the dashboard.");
   }
}
