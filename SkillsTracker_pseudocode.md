# 1. System Setup
Code
BEGIN PROGRAM SkillTracker
    INITIALIZE Firebase connection
    INITIALIZE userRegistry = []
    INITIALIZE submissionRegistry = []
    SET currentUser = null
    SET userRole = null
END SETUP
# 2. User Management
Code
FUNCTION registerUser(userId, name, email, role)
    CREATE new User object
    ADD User to userRegistry
    DISPLAY "User registered successfully"
END FUNCTION

FUNCTION loginUser(email, password)
    AUTHENTICATE with Firebase
    IF success THEN
        SET currentUser = User object
        SET userRole = currentUser.role
        REDIRECT to dashboard
    ELSE
        DISPLAY "Login failed"
    END IF
END FUNCTION

FUNCTION logoutUser()
    CONFIRM "Are you sure?"
    IF yes THEN
        CLEAR currentUser
        REDIRECT to login page
    END IF
END FUNCTION
# 3. Dashboards
Code
FUNCTION loadDashboard()
    IF userRole == LEARNER THEN
        FETCH tasks for currentUser
        CALCULATE progress = (completed / total) * 100
        DISPLAY learner dashboard: tasks, progress, mini-game access
    ELSE IF userRole == ASSESSOR THEN
        FETCH submissions assigned
        DISPLAY assessor dashboard: pending reviews, grading tools
    ELSE IF userRole == ADMIN THEN
        DISPLAY admin dashboard: 
            - Master list of all users by role
            - Submission dashboard (overview of all learners)
            - Reports and analytics
    END IF
END FUNCTION
# 4. Task & Submission Management
Code
FUNCTION createTask(title, description, dueDate)
    IF userRole == ASSESSOR OR ADMIN THEN
        CREATE new Task object with status "Pending"
        SAVE to Firebase
        DISPLAY "Task created"
    ELSE
        DISPLAY "Access denied"
    END IF
END FUNCTION

FUNCTION submitAssignment(learner, assignmentTitle)
    IF learner.role == LEARNER THEN
        CREATE new Submission object
        ADD to submissionRegistry
        DISPLAY "Submission recorded"
    ELSE
        DISPLAY "Only learners can submit"
    END IF
END FUNCTION

FUNCTION gradeSubmission(assessor, submissionId, grade)
    IF assessor.role == ASSESSOR THEN
        FIND submission by ID
        UPDATE grade + status = "Graded"
        DISPLAY "Submission graded"
    ELSE
        DISPLAY "Access denied"
    END IF
END FUNCTION
# 5. Reporting & Admin Tools
Code
FUNCTION printUsersByRole(targetRole)
    FOR each user in userRegistry
        IF user.role == targetRole
            DISPLAY userId + name
        END IF
    END FOR
END FUNCTION

FUNCTION printSubmissionDashboard()
    FOR each submission in submissionRegistry
        DISPLAY assignmentTitle, learnerName, assessorName, status, grade
    END FOR
END FUNCTION
# 6. Mini-Game
Code
FUNCTION startMiniGame()
    SET score = 0
    SET timer = 60 seconds
    WHILE timer > 0
        DISPLAY question + 4 answers
        WAIT for learner input
        IF correct THEN
            score += 10
        END IF
        LOAD next question
    END WHILE
    SAVE score to Firebase
    DISPLAY final score
END FUNCTION
# 7. Main Program Flow
Code
ON PAGE LOAD
    APPLY theme from preferences
    IF user logged in THEN
        loadDashboard()
    ELSE
        SHOW login/register page
    END IF
END PROGRAM

