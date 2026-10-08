import {
  isLearnerAllowed,
  getLearners,
  saveLearner,
  deleteLearnerRecord,
  saveStaff,
  deleteStaffRecord,
} from "./firestore-config.js";

const defaultTasks = [
  {
    id: 1,
    title: "Research Project",
    type: "Written",
    description:
      "Write a short report on your chosen topic and submit by Friday.",
    dueDate: "2026-10-12",
    totalMarks: 100,
    status: "Not Started",
  },
  {
    id: 2,
    title: "Lab Practice",
    type: "Practical",
    description: "Complete and record the practical task in your workbook.",
    dueDate: "2026-10-15",
    totalMarks: 80,
    status: "Written",
  },
  {
    id: 3,
    title: "Quiz Check",
    type: "Test",
    description: "Complete the short online quiz and review your score.",
    dueDate: "2026-10-18",
    totalMarks: 50,
    status: "Submitted",
  },
];

const defaultSubmissions = [
  {
    id: 1,
    learnerName: "Nandi",
    taskTitle: "Research Project",
    status: "Submitted",
    score: 78,
    feedback: "Good structure and clear evidence.",
  },
  {
    id: 2,
    learnerName: "Zain",
    taskTitle: "Lab Practice",
    status: "Graded",
    score: 86,
    feedback: "Well done; improve your conclusion.",
  },
];

const defaultLearners = [];
const defaultStaff = [];

const defaultAttendance = [
  { studentName: "Nandi", attended: 18, total: 20 },
  { studentName: "Zain", attended: 16, total: 20 },
  { studentName: "Admin User", attended: 20, total: 20 },
];

const state = {
  currentRole: "learner",
  editingTaskId: null,
  tasks: loadFromStorage("portalTasks", defaultTasks),
  submissions: loadFromStorage("portalSubmissions", defaultSubmissions),
  learners: loadFromStorage("portalLearners", defaultLearners),
  staff: loadFromStorage("portalStaff", defaultStaff),
  attendance: loadFromStorage("portalAttendance", defaultAttendance),
};

const elements = {
  app: document.getElementById("app"),
  loginScreen: document.getElementById("loginScreen"),
  authBox: document.getElementById("authBox"),
  userInfo: document.getElementById("userInfo"),
  userDisplay: document.getElementById("userDisplay"),
  roleSelect: document.getElementById("roleSelect"),
  userName: document.getElementById("userName"),
  userId: document.getElementById("userId"),
  loginBtn: document.getElementById("loginBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  adminView: document.getElementById("adminView"),
  assessorView: document.getElementById("assessorView"),
  learnerView: document.getElementById("learnerView"),
  taskTitle: document.getElementById("taskTitle"),
  taskType: document.getElementById("taskType"),
  taskDesc: document.getElementById("taskDesc"),
  dueDate: document.getElementById("dueDate"),
  totalMarks: document.getElementById("totalMarks"),
  addTaskBtn: document.getElementById("addTaskBtn"),
  cancelEditBtn: document.getElementById("cancelEditBtn"),
  tasksList: document.getElementById("tasksList"),
  submissionsList: document.getElementById("submissionsList"),
  adminTasksList: document.getElementById("adminTasksList"),
  availableTasks: document.getElementById("availableTasks"),
  myTasks: document.getElementById("myTasks"),
  learnerSteps: document.getElementById("learnerSteps"),
  assessorLearnerSelect: document.getElementById("assessorLearnerSelect"),
  assessorTaskSelect: document.getElementById("assessorTaskSelect"),
  assessorMarks: document.getElementById("assessorMarks"),
  assessorFeedback: document.getElementById("assessorFeedback"),
  saveAssessmentBtn: document.getElementById("saveAssessmentBtn"),
  totalTasks: document.getElementById("totalTasks"),
  totalSubmissions: document.getElementById("totalSubmissions"),
  avgResult: document.getElementById("avgResult"),
  learnerTotal: document.getElementById("learnerTotal"),
  learnerWritten: document.getElementById("learnerWritten"),
  learnerSubmitted: document.getElementById("learnerSubmitted"),
  learnerAvg: document.getElementById("learnerAvg"),
  adminStudentName: document.getElementById("adminStudentName"),
  adminStudentId: document.getElementById("adminStudentId"),
  adminStudentRole: document.getElementById("adminStudentRole"),
  adminStudentActive: document.getElementById("adminStudentActive"),
  adminAddStudentBtn: document.getElementById("adminAddStudentBtn"),
  adminStaffName: document.getElementById("adminStaffName"),
  adminStaffId: document.getElementById("adminStaffId"),
  adminStaffRole: document.getElementById("adminStaffRole"),
  adminStaffActive: document.getElementById("adminStaffActive"),
  adminAddStaffBtn: document.getElementById("adminAddStaffBtn"),
  adminUsersList: document.getElementById("adminUsersList"),
  adminStaffList: document.getElementById("adminStaffList"),
  adminProgressList: document.getElementById("adminProgressList"),
  adminTotalLearners: document.getElementById("adminTotalLearners"),
  adminTotalStaff: document.getElementById("adminTotalStaff"),
  adminCompletedLearners: document.getElementById("adminCompletedLearners"),
  adminActiveUsers: document.getElementById("adminActiveUsers"),
  adminAttendanceRate: document.getElementById("adminAttendanceRate"),
  adminAverageGrade: document.getElementById("adminAverageGrade"),
};

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function saveToStorage() {
  localStorage.setItem("portalTasks", JSON.stringify(state.tasks));
  localStorage.setItem("portalSubmissions", JSON.stringify(state.submissions));
  localStorage.setItem("portalLearners", JSON.stringify(state.learners));
  localStorage.setItem("portalStaff", JSON.stringify(state.staff));
  localStorage.setItem("portalAttendance", JSON.stringify(state.attendance));
}

function showRoleView(role) {
  const views = [
    elements.adminView,
    elements.assessorView,
    elements.learnerView,
  ];
  views.forEach((view) => view.classList.add("hidden"));

  if (role === "admin") {
    elements.adminView.classList.remove("hidden");
  } else if (role === "assessor") {
    elements.assessorView.classList.remove("hidden");
  } else {
    elements.learnerView.classList.remove("hidden");
  }
}

function getCurrentLearnerName() {
  return elements.userDisplay.textContent?.split("(")[0].trim() || "Guest";
}

function getLearnerSubmissionForTask(
  taskId,
  learnerName = getCurrentLearnerName(),
) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task) return null;
  return state.submissions.find(
    (item) => item.taskTitle === task.title && item.learnerName === learnerName,
  );
}

function applyLearnerStep(taskId, step) {
  const learnerName = getCurrentLearnerName();
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task) return;

  let submission = getLearnerSubmissionForTask(taskId, learnerName);

  if (step === "choose-task") {
    if (!submission) {
      submission = {
        id: Date.now(),
        learnerName,
        taskTitle: task.title,
        status: "Chosen",
        score: null,
        feedback: "",
      };
      state.submissions.push(submission);
    } else {
      submission.status = "Chosen";
    }
  }

  if (step === "mark-written") {
    if (!submission) {
      alert("Choose this task before marking it as written.");
      return;
    }
    submission.status = "Written";
  }

  if (step === "submit-task") {
    if (!submission) {
      alert("Choose the task and mark it as written before submitting.");
      return;
    }
    if (submission.status === "Chosen") {
      submission.status = "Written";
    }
    submission.status = "Submitted";
  }

  if (step === "view-result") {
    if (!submission) {
      alert("This task has not been chosen yet.");
      return;
    }
    const resultText = submission.score ?? "Pending";
    alert(`${task.title}: ${resultText}`);
    return;
  }

  saveToStorage();
  renderDashboard();
}

async function handleLogin() {
  const role = elements.roleSelect.value;
  const name = elements.userName.value.trim();
  const id = elements.userId.value.trim();

  if (!name || !id) {
    alert("Please enter your full name and ID before continuing.");
    return;
  }

  if (role === "learner") {
    const isAllowed = await isLearnerAllowed(name, id);

    if (!isAllowed) {
      alert("Access denied. This Learner is not registered in Firestore.");
      return;
    }
  }

  state.currentRole = role;
  elements.userDisplay.textContent = `${name} (${role})`;
  elements.authBox.classList.add("hidden");
  elements.userInfo.classList.remove("hidden");
  elements.loginScreen.classList.add("hidden");
  elements.app.classList.remove("hidden");

  showRoleView(role);
  renderDashboard();
}

document.getElementById('submitQueryBtn').addEventListener('click', 
  function() {
    const queryText =document.getElementById('queryInput').value.trim();
    const message =document.getElementById('queryMessage');
    if (queryText === "") {message.textContent = "Please enter a queryfirst!";message.style.color = "red";
      return;}
    }
  Simulate saving/submitting queryconsole.log("Query Submitted:", queryText);message.textContent = "Query submittedsuccessfully! We will be in touch.";message.style.color = "green";// Clear input after submitdocument.getElementById('queryInput').value= "";
  let queries =JSON.parse(localStorage.getItem('queries')) ||[];
  queries.push({ text: queryText, date: newDate().toLocaleString() });
  localStorage.setItem('queries',JSON.stringify(queries));})
function handleLogout() {
  elements.userInfo.classList.add("hidden");
  elements.authBox.classList.remove("hidden");
  elements.loginScreen.classList.remove("hidden");
  elements.app.classList.add("hidden");
  elements.roleSelect.value = "learner";
  elements.userName.value = "";
  elements.userId.value = "";
}

function renderAdminDashboard() {
  const learners = state.learners.filter(
    (learner) => String(learner.role || "").toLowerCase() === "learner",
  );
  const staffMembers = state.staff.length
    ? state.staff
    : state.learners.filter((learner) =>
        ["assessor", "admin"].includes(
          String(learner.role || "").toLowerCase(),
        ),
      );
  const activeLearners = learners.filter((learner) => learner.active !== false);
  const attendanceTotal = state.attendance.reduce(
    (sum, entry) => sum + Number(entry.total || 0),
    0,
  );
  const attendancePresent = state.attendance.reduce(
    (sum, entry) => sum + Number(entry.attended || 0),
    0,
  );
  const attendanceRate = attendanceTotal
    ? Math.round((attendancePresent / attendanceTotal) * 100)
    : 0;
  const submissionScores = state.submissions
    .map((submission) => Number(submission.score))
    .filter((score) => !Number.isNaN(score));
  const averageGrade = submissionScores.length
    ? Math.round(
        submissionScores.reduce((sum, score) => sum + score, 0) /
          submissionScores.length,
      )
    : 0;

  const allTaskTitles = state.tasks.map((task) => task.title);
  const learnersWhoCompletedAllTasks = learners.filter((learner) => {
    if (!allTaskTitles.length) return false;

    const learnerTaskTitles = new Set(
      state.submissions
        .filter((submission) => submission.learnerName === learner.fullName)
        .map((submission) => submission.taskTitle),
    );

    return allTaskTitles.every((taskTitle) => learnerTaskTitles.has(taskTitle));
  }).length;

  elements.adminTotalLearners.textContent = `Total registered learners: ${learners.length}`;
  elements.adminTotalStaff.textContent = `Total registered staff: ${staffMembers.length}`;
  elements.adminCompletedLearners.textContent = `Learners who submitted all tasks: ${learnersWhoCompletedAllTasks}`;
  elements.adminActiveUsers.textContent = `Active learners: ${activeLearners.length}`;
  elements.adminAttendanceRate.textContent = `Attendance rate: ${attendanceRate}%`;
  elements.adminAverageGrade.textContent = `Average task score: ${averageGrade}%`;

  elements.adminUsersList.innerHTML = "";

  if (!state.learners.length) {
    elements.adminUsersList.innerHTML = "<p>No Learners registered yet.</p>";
  } else {
    state.learners.forEach((learner) => {
      const row = document.createElement("div");
      row.className = "submission-row";
      row.innerHTML = `
        <div>
          <strong>${learner.fullName}</strong><br />
          <span>${learner.learnerId || learner.studentId} • ${learner.role}</span>
        </div>
        <div>
          <span class="badge ${learner.active === false ? "silver" : "navy"}">
            ${learner.active === false ? "Inactive" : "Active"}
          </span>
          <button class="secondary" data-action="delete-user" data-user-id="${learner.learnerId || learner.studentId}">Remove</button>
        </div>
      `;
      elements.adminUsersList.appendChild(row);
    });
  }

  if (elements.adminStaffList) {
    elements.adminStaffList.innerHTML = "";

    if (!staffMembers.length) {
      elements.adminStaffList.innerHTML =
        "<p>No staff members registered yet.</p>";
    } else {
      staffMembers.forEach((staffMember) => {
        const row = document.createElement("div");
        row.className = "submission-row";
        row.innerHTML = `
          <div>
            <strong>${staffMember.fullName}</strong><br />
            <span>${staffMember.learnerId || staffMember.studentId} • ${staffMember.role}</span>
          </div>
          <div>
            <span class="badge ${staffMember.active === false ? "silver" : "navy"}">
              ${staffMember.active === false ? "Inactive" : "Active"}
            </span>
            <button class="secondary" data-action="delete-staff" data-user-id="${staffMember.learnerId || staffMember.studentId}">Remove</button>
          </div>
        `;
        elements.adminStaffList.appendChild(row);
      });
    }
  }

  elements.adminProgressList.innerHTML = "";

  const progressRows = state.learners.map((learner) => {
    const userSubmissions = state.submissions.filter(
      (entry) => entry.learnerName === learner.fullName,
    );
    const scores = userSubmissions
      .map((entry) => Number(entry.score))
      .filter((score) => !Number.isNaN(score));
    const average = scores.length
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) / scores.length,
        )
      : 0;
    const attendance = state.attendance.find(
      (entry) => entry.studentName === learner.fullName,
    );

    return { learner, average, attendance };
  });

  progressRows.forEach(({ learner, average, attendance }) => {
    const item = document.createElement("div");
    item.className = "submission-row";
    item.innerHTML = `
      <div>
        <strong>${learner.fullName}</strong><br />
        <span>${learner.role} • ID: ${learner.learnerId || learner.studentId}</span>
      </div>
      <div>
        <span>Result: ${average}%</span><br />
        <span>Attendance: ${attendance ? `${Math.round((attendance.attended / attendance.total) * 100)}%` : "0%"}</span>
      </div>
    `;
    elements.adminProgressList.appendChild(item);
  });
}

function renderDashboard() {
  renderAssessorStats();
  renderTaskLists();
  renderLearnerPanels();
  renderSubmissions();
  renderAdminDashboard();
  populateAssessorSelectors();
}

function populateAssessorSelectors() {
  if (!elements.assessorLearnerSelect || !elements.assessorTaskSelect) return;

  const learners = [
    ...new Set([
      ...state.learners.map((learner) => learner.fullName),
      ...state.submissions.map((item) => item.learnerName),
    ]),
  ]
    .filter(Boolean)
    .sort();
  const tasks = [...new Set(state.tasks.map((task) => task.title))].filter(
    Boolean,
  );

  elements.assessorLearnerSelect.innerHTML =
    '<option value="">Select learner</option>' +
    learners
      .map((learner) => `<option value="${learner}">${learner}</option>`)
      .join("");

  elements.assessorTaskSelect.innerHTML =
    '<option value="">Select task</option>' +
    tasks
      .map((taskTitle) => `<option value="${taskTitle}">${taskTitle}</option>`)
      .join("");
}

function renderAssessorStats() {
  const total = state.tasks.length;
  const totalSubmissions = state.submissions.length;
  const scores = state.submissions
    .map((submission) => Number(submission.score))
    .filter((score) => !Number.isNaN(score));
  const avg = scores.length
    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    : 0;

  elements.totalTasks.textContent = `Total Tasks: ${total}`;
  elements.totalSubmissions.textContent = `Total Submissions: ${totalSubmissions}`;
  elements.avgResult.textContent = `Average Result: ${avg}%`;
}

function renderTaskLists() {
  if (elements.tasksList) elements.tasksList.innerHTML = "";
  if (elements.adminTasksList) elements.adminTasksList.innerHTML = "";
  if (elements.availableTasks) elements.availableTasks.innerHTML = "";

  if (!state.tasks.length) {
    const empty = document.createElement("p");
    empty.textContent = "No tasks created yet.";
    if (elements.tasksList) elements.tasksList.appendChild(empty);
    if (elements.adminTasksList) {
      elements.adminTasksList.appendChild(empty.cloneNode(true));
    }
    return;
  }

  state.tasks.forEach((task) => {
    const card = document.createElement("article");
    card.className = "task-card";
    card.innerHTML = `
      <h4>${task.title}</h4>
      <p><span class="badge navy">${task.type}</span></p>
      <p>${task.description}</p>
      <p>Due: ${task.dueDate || "No date"}</p>
      <p>Marks: ${task.totalMarks || 0}</p>
      <p>Status: ${task.status}</p>
      <div class="task-actions">
        <button class="secondary" data-action="edit-task" data-id="${task.id}">Edit</button>
        <button class="secondary" data-action="delete-task" data-id="${task.id}">Delete</button>
        <button class="primary" data-action="mark-written" data-id="${task.id}">Mark as Written</button>
      </div>
    `;

    if (elements.tasksList)
      elements.tasksList.appendChild(card.cloneNode(true));
    if (elements.adminTasksList)
      elements.adminTasksList.appendChild(card.cloneNode(true));

    const availableCard = document.createElement("article");
    availableCard.className = "task-card";
    availableCard.innerHTML = `
      <h4>${task.title}</h4>
      <p><span class="badge light">${task.type}</span></p>
      <p>${task.description}</p>
      <p>${task.totalMarks} marks</p>
      <div class="task-actions">
        <button class="primary" data-action="choose-task" data-id="${task.id}">Choose Task</button>
      </div>
    `;
    if (elements.availableTasks)
      elements.availableTasks.appendChild(availableCard);
  });
}

function renderSubmissions() {
  if (!elements.submissionsList) return;

  elements.submissionsList.innerHTML = "";

  if (!state.submissions.length) {
    elements.submissionsList.innerHTML = "<p>No submissions yet.</p>";
    return;
  }

  state.submissions.forEach((submission) => {
    const row = document.createElement("div");
    row.className = "submission-row";
    row.innerHTML = `
      <div>
        <strong>${submission.learnerName}</strong><br />
        <span>${submission.taskTitle}</span>
      </div>
      <div>
        <span class="badge silver">${submission.status}</span>
        <span> Score: ${submission.score ?? "Pending"}</span>
      </div>
    `;
    elements.submissionsList.appendChild(row);
  });
}

function saveAssessment() {
  const learnerName = elements.assessorLearnerSelect.value;
  const taskTitle = elements.assessorTaskSelect.value;
  const score = Number(elements.assessorMarks.value);
  const feedback = elements.assessorFeedback.value.trim();

  if (!learnerName || !taskTitle) {
    alert("Please select a learner and task before saving the assessment.");
    return;
  }

  if (Number.isNaN(score) || score < 0 || score > 100) {
    alert("Please enter a valid mark between 0 and 100.");
    return;
  }

  const submission = state.submissions.find(
    (item) => item.learnerName === learnerName && item.taskTitle === taskTitle,
  );

  if (!submission) {
    alert("This learner has not submitted that task yet.");
    return;
  }

  submission.score = score;
  submission.status = "Graded";
  submission.feedback = feedback || "Marked by assessor.";

  saveToStorage();
  renderDashboard();
  elements.assessorMarks.value = "";
  elements.assessorFeedback.value = "";
}

function renderLearnerPanels() {
  const name =
    elements.userDisplay.textContent?.split("(")[0].trim() || "Guest";
  const learnerSubmissions = state.submissions.filter(
    (item) => item.learnerName === name,
  );
  const writtenCount = learnerSubmissions.filter(
    (item) =>
      item.status === "Submitted" ||
      item.status === "Graded" ||
      item.status === "Written",
  ).length;
  const submittedCount = learnerSubmissions.filter(
    (item) => item.status === "Submitted",
  ).length;
  const scores = learnerSubmissions
    .map((item) => Number(item.score))
    .filter((score) => !Number.isNaN(score));
  const average = scores.length
    ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
    : 0;

  elements.learnerTotal.textContent = `Tasks Chosen: ${learnerSubmissions.length}`;
  elements.learnerWritten.textContent = `Written: ${writtenCount}`;
  elements.learnerSubmitted.textContent = `Submitted: ${submittedCount}`;
  elements.learnerAvg.textContent = `My Average: ${average}%`;

  if (elements.learnerSteps) {
    elements.learnerSteps.innerHTML = "";

    if (!state.tasks.length) {
      elements.learnerSteps.innerHTML = "<p>No task steps available yet.</p>";
    } else {
      state.tasks.forEach((task) => {
        const submission = getLearnerSubmissionForTask(task.id, name);
        const currentStatus = submission?.status || "Not Started";

        const buttons = [
          {
            step: "choose-task",
            label: "Choose Task",
            enabled: true,
          },
          {
            step: "mark-written",
            label: "Mark as Written",
            enabled: Boolean(submission),
          },
          {
            step: "submit-task",
            label: "Submit to Assessor",
            enabled: Boolean(submission),
          },
          {
            step: "view-result",
            label: "View Result",
            enabled: Boolean(submission),
          },
        ];

        const wrapper = document.createElement("div");
        wrapper.className = "submission-row step-row";
        wrapper.innerHTML = `
          <div>
            <strong>${task.title}</strong><br />
            <span>${currentStatus}</span>
          </div>
          <div class="task-actions">
            ${buttons
              .map(
                (button) => `
                  <button class="secondary" data-action="step-select" data-step="${button.step}" data-id="${task.id}" ${button.enabled ? "" : "disabled"}>
                    ${button.label}
                  </button>
                `,
              )
              .join("")}
          </div>
        `;
        elements.learnerSteps.appendChild(wrapper);
      });
    }
  }

  if (elements.myTasks) {
    elements.myTasks.innerHTML = "";

    if (!learnerSubmissions.length) {
      elements.myTasks.innerHTML = "<p>No tasks chosen yet.</p>";
      return;
    }

    learnerSubmissions.forEach((submission) => {
      const card = document.createElement("article");
      card.className = "task-card";
      card.innerHTML = `
        <h4>${submission.taskTitle}</h4>
        <p><span class="badge light">${submission.status}</span></p>
        <p>Result: ${submission.score ?? "Pending"}</p>
        <p>${submission.feedback || "Awaiting assessor feedback."}</p>
      `;
      elements.myTasks.appendChild(card);
    });
  }
}

async function addSchoolUser() {
  const fullName = elements.adminStudentName.value.trim();
  const learnerId = elements.adminStudentId.value.trim();
  const role = elements.adminStudentRole.value;
  const active = elements.adminStudentActive.checked;

  if (!fullName || !learnerId) {
    alert(
      "Add a full name and Learner ID before saving to the school database.",
    );
    return;
  }

  const newLearner = {
    id: learnerId,
    fullName,
    learnerId,
    studentId: learnerId,
    role,
    active,
  };

  const existingIndex = state.learners.findIndex(
    (learner) =>
      String(learner.learnerId || learner.studentId || "").toLowerCase() ===
      learnerId.toLowerCase(),
  );

  if (existingIndex >= 0) {
    state.learners[existingIndex] = {
      ...state.learners[existingIndex],
      ...newLearner,
    };
  } else {
    state.learners.push(newLearner);
  }

  try {
    await saveLearner(newLearner);
  } catch (error) {
    console.warn("Firestore save failed, using local storage fallback:", error);
  }

  saveToStorage();
  elements.adminStudentName.value = "";
  elements.adminStudentId.value = "";
  elements.adminStudentRole.value = "learner";
  elements.adminStudentActive.checked = true;
  renderDashboard();
}

async function deleteSchoolUser(learnerId) {
  const targetId = String(learnerId || "").trim();
  if (!targetId) return;

  state.learners = state.learners.filter(
    (learner) =>
      String(learner.learnerId || learner.studentId || "").toLowerCase() !==
      targetId.toLowerCase(),
  );

  try {
    await deleteLearnerRecord(targetId);
  } catch (error) {
    console.warn(
      "Firestore delete failed, using local storage fallback:",
      error,
    );
  }

  saveToStorage();
  renderDashboard();
}

async function addStaffMember() {
  const fullName = elements.adminStaffName.value.trim();
  const staffId = elements.adminStaffId.value.trim();
  const role = elements.adminStaffRole.value;
  const active = elements.adminStaffActive.checked;

  if (!["assessor", "admin"].includes(role)) {
    alert("Staff must be either an assessor or an admin.");
    return;
  }

  if (!fullName || !staffId) {
    alert("Add a staff full name and staff ID before saving.");
    return;
  }

  const newStaffMember = {
    id: staffId,
    fullName,
    learnerId: staffId,
    studentId: staffId,
    role,
    active,
  };

  const existingIndex = state.staff.findIndex(
    (staff) =>
      String(
        staff.staffId || staff.learnerId || staff.studentId || "",
      ).toLowerCase() === staffId.toLowerCase(),
  );

  if (existingIndex >= 0) {
    state.staff[existingIndex] = {
      ...state.staff[existingIndex],
      ...newStaffMember,
    };
  } else {
    state.staff.push(newStaffMember);
  }

  try {
    await saveStaff(newStaffMember);
  } catch (error) {
    console.warn(
      "Firestore staff save failed, using local storage fallback:",
      error,
    );
  }

  saveToStorage();
  elements.adminStaffName.value = "";
  elements.adminStaffId.value = "";
  elements.adminStaffRole.value = "assessor";
  elements.adminStaffActive.checked = true;
  renderDashboard();
}

async function deleteStaffMember(staffId) {
  const targetId = String(staffId || "").trim();
  if (!targetId) return;

  state.staff = state.staff.filter((staff) => {
    const staffIdentifier = String(
      staff.staffId || staff.learnerId || staff.studentId || "",
    ).trim();
    return staffIdentifier.toLowerCase() !== targetId.toLowerCase();
  });

  try {
    await deleteStaffRecord(targetId);
  } catch (error) {
    console.warn(
      "Firestore staff delete failed, using local storage fallback:",
      error,
    );
  }

  saveToStorage();
  renderDashboard();
}

function addTask() {
  const title = elements.taskTitle.value.trim();
  const type = elements.taskType.value;
  const description = elements.taskDesc.value.trim();
  const dueDate = elements.dueDate.value;
  const totalMarks = Number(elements.totalMarks.value || 0);

  if (!title || !description) {
    alert("Task title and instructions are required.");
    return;
  }

  if (state.editingTaskId) {
    const taskIndex = state.tasks.findIndex(
      (task) => task.id === state.editingTaskId,
    );
    if (taskIndex >= 0) {
      state.tasks[taskIndex] = {
        ...state.tasks[taskIndex],
        title,
        type,
        description,
        dueDate,
        totalMarks,
        status: "Not Started",
      };
    }
  } else {
    state.tasks.unshift({
      id: Date.now(),
      title,
      type,
      description,
      dueDate,
      totalMarks,
      status: "Not Started",
    });
  }

  state.editingTaskId = null;
  saveToStorage();
  clearTaskForm();
  renderDashboard();
}

function clearTaskForm() {
  elements.taskTitle.value = "";
  elements.taskType.value = "Written";
  elements.taskDesc.value = "";
  elements.dueDate.value = "";
  elements.totalMarks.value = "";
  elements.cancelEditBtn.classList.add("hidden");
}

function deleteTask(taskId) {
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  saveToStorage();
  renderDashboard();
}

function editTask(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task) return;

  state.editingTaskId = taskId;
  elements.taskTitle.value = task.title;
  elements.taskType.value = task.type;
  elements.taskDesc.value = task.description;
  elements.dueDate.value = task.dueDate || "";
  elements.totalMarks.value = task.totalMarks || "";
  elements.cancelEditBtn.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function markTaskAsWritten(taskId) {
  applyLearnerStep(taskId, "mark-written");
}

function chooseTask(taskId) {
  applyLearnerStep(taskId, "choose-task");
}

function submitTask(taskId) {
  applyLearnerStep(taskId, "submit-task");
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const id = Number(button.dataset.id);
  const userId = button.dataset.userId;
  const step = button.dataset.step;

  if (!action) return;

  if (action === "delete-task") deleteTask(id);
  if (action === "edit-task") editTask(id);
  if (action === "mark-written") markTaskAsWritten(id);
  if (action === "choose-task") chooseTask(id);
  if (action === "step-select") applyLearnerStep(id, step);
  if (action === "submit-task") submitTask(id);
  if (action === "delete-user") deleteSchoolUser(userId);
  if (action === "delete-staff") deleteStaffMember(userId);
});

elements.loginBtn.addEventListener("click", handleLogin);
elements.logoutBtn.addEventListener("click", handleLogout);
elements.addTaskBtn.addEventListener("click", addTask);
elements.cancelEditBtn.addEventListener("click", clearTaskForm);
elements.adminAddStudentBtn.addEventListener("click", addSchoolUser);
elements.adminAddStaffBtn.addEventListener("click", addStaffMember);
if (elements.saveAssessmentBtn) {
  elements.saveAssessmentBtn.addEventListener("click", saveAssessment);
}

renderDashboard();
