// <!DOCTYPE html>
//<html lang="en">
<head>
<meta charset="UTF-8">
<metaname="viewport" content="width=device-width,initial-scale=1.0">
<title>Task Management & Results</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="topbar">
<div class="logo-area">
<div class="logo-circle">TM</div>
<div><h1>Task ManagementSystem</h1>
<small>Navy • Light Blue •Silver</small>
</div>
</div>
<div id="authBox">
<select id="roleSelect"><optionvalue="learner">I am aLearner</option>
<option value="assessor">Iam an Assessor</option>
</select>
<input id="userName" placeholder="Fullname"/>
<input id="userId"placeholder="Student/Staff ID"/>
<button id="loginBtn">Enter</button>
</div>
<div id="userInfo" class="hidden">
<spanid="userDisplay"></span>
<buttonid="logoutBtn">Logout</button>
</div>
</header>
<div id="loginScreen" class="center-card">
<h2>Welcome to Task Portal</h2>
<p><b>Assessor:</b> View, Add, Edit, Update,Delete Tasks + Give Results<br>
<b>Learner:</b> Choose Task → MarkWritten → Submit → View Result</p>
<div class="logo-placeholder">Your GroupLogo Will Be Here</div>
</div>
<main id="app" class="hidden">
<section id="assessorView" class="hidden">
<div class="grid-2">
<div class="card">
<h3>Add / Edit Task</h3>
<input id="taskTitle" placeholder="Task Titlee.g. Research Project">
<selectid="taskType">
<option>Written</option>
<option>Practical</option>
<option>Assignment</option>
<option>Test</option>
</select>
<textarea id="taskDesc" placeholder="Taskdescription / instructions forlearners"></textarea>
<input id="dueDate" type="date">
<input id="totalMarks" type="number"placeholder="Total Marks e.g. 100">
<button id="addTaskBtn" class="primary">AddTask</button>
<button id="cancelEditBtn" class="secondaryhidden">Cancel Edit</button>
</div>
<div class="cardhighlight">
<h3>Dashboard</h3>
<pid="totalTasks">Total Tasks: 0</p>
<p id="totalSubmissions">Total Submissions:0</p>
<p id="avgResult">Average Result: -</p>
</div>
</div>
<div class="card">
<h3>All Tasks</h3>
<divid="tasksList" class="tasks-grid">
</div>
</div>
<div class="card">
<h3>Learner TaskSubmissions</h3>
<div class="filter-row">
<selectid="filterTask">
<option value="all">AllTasks</option>
</select><selectid="filterStatus">
<option value="all">AllStatus</option>
<option>NotStarted</option>
<option>Written</option>
<option>Submitted</option>
<option>Graded</option>
</select>
</div>
<div id="submissionsList">
</div>
</div>
</section>
<section id="learnerView" class="hidden">
<div class="grid-2">
<div class="card highlight">
<h3>My TaskProgress</h3>
<p id="learnerTotal">TasksChosen: 0</p>
<p id="learnerWritten">Written:0</p>
<p id="learnerSubmitted">Submitted:0</p>
<p id="learnerAvg">My Average: -</p>
</div><divclass="card">
<h3>Steps</h3>
<ol><li>ChooseTask</li>
<li>Mark as Written</li>
<li>Submit toAssessor</li>
<li>View Result</li>
</ol>
</div>
</div>
<div class="card">
<h3>Available Tasks toChoose</h3>
<div id="availableTasks"class="tasks-grid"></div>