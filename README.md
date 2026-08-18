# JavaScript programmer two month integrated project 

---

## Skills Track Learner Support  

---

### **Project Goal**
1. Register and Login
2. Manage students
3. Manage assessors
4. Manage student attendance
5. Record attendance and student details
6. Record leaner progress
7. Manage Task
8. Manage development goals
9. Sort learner progress by marks obtained
10. Access the platform from any device
---

### **Required tools**
|Area |Tool |
|-------|---|
|Core Development | HTML5, CSS3, JavaScript| 
|IDE | VS code|
|Database |Firebase Realtime |
|Authentication | Firebase Authentication|
|REST Communication | Firebase Realtime Database REST API using GET, POST, PUT or PATCH, and DELETE.|
|Framework or Library | One Assessor-approved JavaScript|
|Version Control | Git and GitHub (Repository, Branches, Commits, Pull requests, Merges and contribution history)|
|Continuous integration | GitHub Workflow|
|Testing | Browser developer tools, breakpoints, console, stack traces, manual test cases and evidence of corrections. |
----

### **Firebase requirements**
| Path | Purpose | Fields |
|----------|-------------|------------|
| users/{uid}| Basic learner profile and application role.| displayName, email, role, createdAt|
| tasks/{taskId}| Learning tasks owned by a user.| userId, title, category, dueDate, priority, completed, createdAt|
| bookings/{bookingId}| Support-session requests.| userId, topic, preferredDate, notes, status|
| scores/{scoreId}|  Mini-game or quiz results.| userId, score, duration, completedAt|
| resources/{resourceId}| Optional learning resources.| title, type, url, description|

----

### **Project folder structure**
> Learner-Support-Portal/
> > README.md
> > 
> > CHANGELOG.md
> > 
> > LICENSE
> > .gitignore
> > 
> > docs/
> > > Client Brief
> > > 
> > >  Requirements
> > > 
> > > Research
> > > 
> > > Meeting Minute
> > > 
> > > User stories
> > > 
> > > User cases
> > > 
> > > Wireframes
> > > 
> > > UI Design
> > > 
> > > Test plan
> > 
> > design
> > > Figma link.md
> > > UI Mockup
> > > Images
> > src
> > assets
> > presentation

> Skills Task
> > client
> > > Components
> > > Pages
> > > Dashboard
> > > Services
> > > App.js
> > > Index.js
>  
> > server
> > > Routes
> > > Controllers
> > > Models
> > > Middleware
> > > Utils
> > > Server.js
>
> README.md
---

### **Application Workflow**
1. Login
2. Select Role( Admin, Assesor or Learner )
3. Dashboard
4. Manage classes
5. Attandance
6. Tasks
7. Results and Reports
---

### **Features**
#### *User Authentication*
* * Admin
  * Assessor
  * Leaner
* API Routes
* * (POST/api/auth/register)
  * (POST/api/auth/login)

#### *Learner Management*
* * learner Name
  * Class
  * Date of Birth
  * Parent name and number
  * learner Number
  * Section

#### *Assessor Management*
* * Assessor Name
  * Subject
  * Qualification
  * Experience
  * Contact Details
* * * Assessor can:
    * Update profiles
    * View assigned classes
    * Record attendance
    * Upload marks

### *Admin*
#### * Class & Subject Management*
* Manage:
* * Classes
  * Sections
  * Subjects
  * Timetable
  * Assign teachers to each subject.

### *Attendance Management*
* Assessor can:
* * Mark daily attendance
  * Edit attendance
  * View attendance history
  * Students can view their attendance percentage.

### *Examination & Results*
* Manage:
* * Tasks
  * Marks
  * Grades
  * Report Cards
  * * Automatically calculate:
    * Total Marks
    * Percentage
    * Grade

### *Dashboard*
* Display:
* * Total Students
  * Total Teachers
  * Attendance Percentage
  * Upcoming Tasks
  * Recent Activities

### *Notifications*
* Notify users about:
* * Upcoming examinations
  * Homework submissions
  * Attendance shortages
  * School announcements

### ***Responsive Design***

