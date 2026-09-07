# Notes about the project backend database.
---
1. Task management- Users can create, view, edit, complete and delete tasks. Deletion requires confirmation.
2. Progress calculation- The application calculates completed, outstanding and overdue work from task data and displays the result dynamically.
3. Support booking Users- can submit a validated support request and view an appropriate success or error response.
4. Search and filters- Users can search, filter or sort tasks or resources using array methods and reusable functions.
5. Preferences- A non-sensitive preference is written to, read from, modified in and removable from a cookie.
6. Submission> User can submit tasks and a support query. a query token receipt will be provided.
** Print and redirect Users can print a suitable summary and are redirected only when the action and application flow justify it. **

## Task & Submission Management
Code
---
>FUNCTION createTask(title, description, dueDate) IF userRole == ASSESSOR OR ADMIN THEN CREATE new Task object with status "Pending" SAVE to Firebase DISPLAY "Task created" ELSE DISPLAY "Access denied" END IF END FUNCTION

>FUNCTION submitAssignment(learner, assignmentTitle) IF learner.role == LEARNER THEN CREATE new Submission object ADD to submissionRegistry DISPLAY "Submission recorded" ELSE DISPLAY "Only learners can submit" END IF END FUNCTION

>FUNCTION gradeSubmission(assessor, submissionId, grade) IF assessor.role == ASSESSOR THEN FIND submission by ID UPDATE grade + status = "Graded" DISPLAY "Submission graded" ELSE DISPLAY "Access denied" END IF END FUNCTION
---
## Reporting & Admin Tools 
Code 
>FUNCTION printUsersByRole(targetRole) FOR each user in userRegistry IF user.role == targetRole DISPLAY userId + name END IF END FOR END FUNCTION

>FUNCTION printSubmissionDashboard() FOR each submission in submissionRegistry DISPLAY assignmentTitle, learnerName, assessorName, status, grade END FOR END FUNCTION
---
