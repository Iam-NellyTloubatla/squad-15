# Part 1 – Architecture Investigation

## 1. Client-side development

Client-side development refers to creating the user-facing part of a web application (the frontend), where the code executes directly inside the user's web browser rather than on a remote web server. When a user visits a website, the remote server sends raw source files—HTML, CSS, and JavaScript—over the internet to the user's device. The code executes inside the user's web browser (such as Google Chrome, Mozilla Firefox, Safari, or Microsoft Edge) utilizing the device's local hardware (CPU and RAM)

## 2. Server-side development

Server-side development (also known as back-end development) refers to creating code that executes on a remote web server, rather than on the user's local device. When you visit a website, the server-side code handles background tasks—like querying databases, verifying passwords, and processing payments—before sending the final webpage structure to your computer. The primary difference is where the code physically runs and what it has access to. Code executing in the browser (client-side) runs locally on your machine and focuses on user interaction, layout, and visual logic

## 3. Roles in SkillsTrack

In the context of SkillsTrack (a skills tracking or learning platform), these technologies function as a cohesive ecosystem. They are split into two categories: the Front-End User Interface (handled locally in the browser by HTML, CSS, and JavaScript) and the Cloud Back-End (handled remotely by Firebase services)

### 1. Front-End User Interface (The Client-Side)

These three technologies run inside the user's web browser to construct what the student or mentor physically sees and interacts with.

- HTML (HyperText Markup Language): Builds the structural layout of the platform. It dictates where elements sit on the page—creating the login text fields, the user dashboard, the tracking progress bars, and the submit buttons for new competencies.
- CSS (Cascading Style Sheets): Handles the visual presentation and styling. It turns plain HTML text into a clean dashboard. It handles the mobile-responsive layout, sets the brand colours, adds progress bar animations, and styles form states (such as turning a field red if a skill entry is invalid).
- JavaScript (JS): Drives the platform's local logic and interactivity. When a student clicks "Log a New Skill," JavaScript intercepts the click, packages the input data, and makes the asynchronous background requests to Firebase without reloading the entire page.

### 2. Firebase Cloud Services (The Back-End)

Firebase replaces the need to build a traditional, custom server-side backend. It securely manages data, authorization, and connectivity via the cloud.

- Firebase Authentication: Manages secure user identity and access control. When a user enters their credentials, JavaScript passes them to the Firebase Auth SDK. It securely registers new users, logs them in,
  and generates an encrypted digital ID token. This token ensures that a student can only view or modify their own progress, while an admin or mentor can view everything.
- Firebase Realtime Database: Stores the platform’s live tracking data as a JSON tree. Every time a student updates a skill or a mentor approves a milestone, the data is saved here. Because it is a realtime cloud database, any update automatically pushes live changes to connected dashboards using WebSockets. For instance, if an evaluator approves a module, the student's progress bar updates instantly on their screen without requiring a page refresh.
- Firebase REST API: Acts as a universal data bridge for external or lightweight environments. While JavaScript apps normally use persistent, always-connected SDKs to communicate with Firebase, the REST API allows the platform to interact with the database using standard HTTPS requests (GET, POST, PUT, DELETE) by simply appending .json to a database URL. This is useful if SkillsTrack needs to send completion data to an external automated certificate generator, sync data with a corporate HR tool, or pull data into a lightweight mobile environment where full SDKs are too heavy.

## 4. Is Firebase server-side JavaScript?

No, Firebase and server-side JavaScript are entirely different things, though they are frequently used together in modern web development.
Server-side JavaScript is a programming language environment used to write custom back-end logic, while Firebase is a pre-built cloud platform that handles the back-end infrastructure for you so you don't have to write that server code from scratch.

## 5. Learner creates a task – client vs server operations

When a learner creates a new learning task in an application like SkillsTrack, the workflow is split seamlessly between instant actions on their local device and secure processing in the cloud.
Here is exactly how the operations are divided between the client side (browser) and the remote/server-side service (Firebase):

### 1. Client-Side Operations (In the Browser)

The browser handles everything the user sees, touches, and experiences instantly. These operations happen locally on the user's machine before any data is sent over the internet:

- UI Interaction: The browser detects the user clicking the "Create Task" button and opens the input form.
- Local Input Validation: JavaScript instantly checks the form fields before submission. For example, itensures the task title is not blank, the description meets length requirements, and the target completion date is a valid future date. This provides instant feedback without wasting network data.
- Identity Token Retrieval: The client-side application securely fetches the learner's encrypted authentication token (JWT) currently stored in the browser session, preparation for proving who they are to the server.
- Data Packaging: JavaScript compiles the form inputs (title, priority, due date) and pairs them with metadata (the user's ID and a timestamp) into a clean JSON data object.
- Optimistic UI Updates (Optional): Many modern apps will visually add the task to the learner's screen immediately with a slight loading spinner, assuming the server request will succeed to make the app feel incredibly fast.

### 2. Remote / Server-Side Operations (In the Cloud)

Once the browser sends the packaged data over the network, Firebase takes over. These operations are hidden from the user and ensure security, persistence, and consistency:

- Authentication & Authorization: The remote server intercepts the request and verifies the learner's digital token. It checks: Is this a valid, logged-in user? and Does this specific user have permission to write data to this specific tracking list?
- Database Writes: Once authorized, the remote service processes the request and writes the new task entry into the persistent cloud storage (e.g., Firebase Realtime Database).
- Global Timestamping: The server can apply a trusted, standardized server-side timestamp to the entry, preventing users from cheating the system by altering their local computer's clock.
- Data Syncing & Broadcasting: The database pushes the newly created task data out to any other authorized, connected screens. For example, if a mentor has the learner's dashboard open on a different computer, the server forces their screen to update in real-time.
- Network Response: The server sends back a success confirmation (HTTP status 200) containing the unique, database-generated ID for that new task, letting the browser know the data is permanently safe.

## 6. Why authentication, database access, and security are not purely client-side

Treating authentication, database access, and security as purely client-side concerns is one of the most critical mistakes an application can make. The fundamental rule of web development is: Never trust the client.
Because client-side code runs entirely on the user's physical machine, it is completely outside of your control. Here is why core security logic must live on a remote, server-side environment.

## 7. Alternative backend technologies

Two prominent alternative technologies that could provide this backend functionality are Supabase and Node.js (with Express & PostgreSQL).

### Option 1: Supabase (The Open-Source BaaS Alternative)

Supabase is widely known as the premier open-source alternative to Firebase. Instead of Firebase's NoSQL document-based structure, Supabase is built entirely on top of PostgreSQL, a highly powerful relational database

#### Architectural Changes

- Database Structure: SkillsTrack would shift from a flexible JSON tree (Firebase Realtime Database) to a structured Relational Database supabase.com. You would define strict tables, rows, and columns for your data (e.g., a users table linked via a "Foreign Key" to a tasks table).
- Realtime Functionality: Supabase listens to the PostgreSQL transaction log to broadcast changes. Your front-end JavaScript would connect to Supabase Realtime channels instead of Firebase WebSockets to update the learner dashboard instantly.
- Security Architecture: Firebase uses its own proprietary "Security Rules" syntax. Supabase replaces this completely with native PostgreSQL Row Level Security (RLS) supabase.com. You write pure SQL policies directly in the database to dictate that a user can only SELECT or UPDATE rows where user_id = auth.uid().

### Option 2: Node.js with Express & PostgreSQL (The Traditional Custom Backend)

Instead of using a managed platform like Firebase or Supabase, you could build a fully custom server from scratch using Node.js (the runtime environment) and Express.js (a minimal web framework), paired with a standalone database like PostgreSQL.

#### Architectural Changes

- The Introduction of an Intermediary Server: In the Firebase architecture, your front-end JavaScript talks directly to Google’s cloud database. With a traditional setup, direct database access from the browser is completely cut off. Your browser JavaScript now communicates strictly with your custom Node.js server.
- API Management (RESTful Endpoints): You must manually program the server to listen for network requests. Instead of Firebase SDK methods, your front-end JavaScript will use native browser commands (like fetch()) to send requests to custom endpoints you create on your server (e.g., POST /api/tasks or GET /api/users/profile).
- Authentication Flow: Firebase handles user sign-ups, password hashing, and session tokens automatically behind the scenes. In a custom Node.js architecture, your server-side code takes full responsibility for this layout:
  - You must write code using libraries like bcrypt to manually hash and salt passwords before storing them.
  - Upon a successful login, your Node.js code must manually generate a JSON Web Token (JWT) and pass it back to the browser.
  - For every subsequent request, your server must intercept, decode, and verify that JWT before querying the database

## 8. Security risks if sensitive info is left in client-side JS

Here are three major security risks that occur when security responsibilities are incorrectly shifted to the client side:

1. Hardcoded API Keys and Credential Exposure

   When developers treat the client side as a secure environment, they often mistakenly hardcode sensitive keys directly into their JavaScript files to connect to third-party services (like payment gateways, email delivery systems, or external AI models).
   - The Exploit: Anyone can open the browser's Developer Tools, look at the compiled network bundles, or read the source code to extract these keys.
   - The Consequence: Attackers can steal your credentials to deplete your paid API quotas, access your external business accounts, or compromise vendor dashboards.

2. Client-Side Authorization Bypass

   This occurs when an application relies on browser JavaScript to decide what a user is allowed to see or do (e.g., hiding a "Delete User" button or an admin panel using an if (user.role === 'admin') statement). [1]
   - The Exploit: Because JavaScript executes locally, an attacker can pause script execution using a breakpoint, alter the user object variables directly in the browser console, or completely strip out the conditional restriction code. The Consequence: An ordinary learner or user can instantly elevate their privileges to an administrator state, granting them unauthorized access to private corporate settings or hidden endpoints.

3. Missing or Bypassed Input Validation (Data Tampering)

   Relying strictly on browser-based validation—such as HTML attributes (required, maxlength) or JavaScript form checks—to clean data before it enters a database leaves the system vulnerable to manipulation.
   - The Exploit: Attackers can intercept the outbound network request using proxy tools (like OWASP ZAP or Burp Suite) or use tools like curl to send data directly to your backend APIs, bypassing the browser interface completely.
   - The Consequence: Malicious actors can submit corrupted structures, execute SQL Injection or Cross-Site Scripting (XSS) attacks, or change crucial payment and transactional values (e.g., changing a course price from R1500 to R0 before hitting submit).

## REFFERENCES

[https://anvil.works/articles/client-vs-server]
[https://www.indeed.com/career-advice/career-development/client-side-vs-server-side]
[https://firebase.google.com/docs/database/rest/auth]
[https://firebase.google.com/docs/database]
[https://www.youtube.com/watch?v=9uVCp8nfRyA&t=571]
[https://medium.com/@aishakhan0925/][firebase-authentication-with-html-css-javascript-step-by-step-guide-edaa5b0bf04f]
[https://www.reddit.com/r/node/comments/1gmfb3w/does_firebase_replace_nodeexpress_or_do_they_work/]
[https://www.ionos.co.uk/digitalguide/server/know-how/firebase/]
[https://isaaccomputerscience.org/concepts/net_internet_client_server_model]
[https://www.toptal.com/developers/front-end/client-side-vs-server-side-pre-rendering]
[https://infosecwriteups.com][sql-nosql-injection-in-apis-the-vulnerability-that-still-puts-your-data-at-risk-98ed14eebd23]
[https://pdfs.semanticscholar.org/09fd/5326be429b39d75103ddd6550176c10e0ba3.pdf?][fbclid=IwAR0qkpT_y4n_S3VrY0umBaI0ua1dCT_qJrVie-8mO2r8-_vssIw9HlIjBX8]
[https://edtechbooks.org/studentguide/secure_web_development]
[https://api7.ai/learning-center/api-101/firebase-backend-as-a-service]
[https://www.weblineindia.com/blog/best-backend-frameworks/]
[https://nocodestartup.io/en/supabase-backend-everything-you-need-to-know-2/]
[https://www.monocubed.com/blog/best-backend-frameworks/]
[https://serveravatar.com/client-side-security-threats-and-prevention/]
[https://wpengine.com/blog/javascript-security/]
[https://www.synack.com/exploits-explained/][client-side-authentication-bypass-3-real-world-pentesting-case-studies/]
[https://deepstrike.io/blog/client-site-vulnerabilities]

## PART 4: Trace One Complete Project Feature

🔹 Task Management Flow
User → Client → Request → Firebase → Response → Client → User

1.  User action → Learner clicks “Create Task” and enters details (title, deadline, notes).
2.  JavaScript in browser → Captures input, validates required fields (e.g., no empty title).
3.  Validation → Client-side checks (format, completeness).
4.  Information leaving browser → Validated task data sent via Firebase SDK/REST API.
5.  Firebase service receiving request → Firebase Realtime Database.
6.  Firebase action → Stores new task under learner’s unique ID.
7.  Response/data returned → Confirmation or error message.
8.  JavaScript processes result → Updates local state with new task.
9.  Interface updated → DOM refreshes dashboard to show the new task.
10. If request fails → Error message displayed, retry option offered.

        OR

🔹 Progress Tracking Flow
User → Client → Request → Firebase → Response → Client → User

1. User action → Learner opens “Progress Dashboard.”
2. JavaScript in browser → Sends request to fetch all tasks.
3. Validation → Ensures learner is authenticated before requesting data.
4. Information leaving browser → Request for learner’s tasks sent to Firebase.
5. Firebase service receiving request → Firebase Authentication verifies identity, Firebase Realtime Database retrieves tasks.
6. Firebase action → Returns task list with completion status.
7. Response/data returned → JSON data containing tasks and progress metrics.
8. JavaScript processes result → Calculates percentage complete, progress bars, or milestones.
9. Interface updated → DOM displays updated dashboard with progress visualization.
10. If request fails → Error message shown, possibly fallback to cached data.
