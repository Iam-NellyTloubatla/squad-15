// This function initializes the skill tracker by setting up the Firebase app and any necessary configurations.
function initializeSkillTracker() {
    const firebaseApp = initializeFirebaseApp();

// Registries
let userRegistry = [];
let submissionRegistry = [];

//Current session state
let currentUser = null;
let userRole = null;

//Return the initialized skill tracker object
return {
    firebaseApp,
    userRegistry,
    submissionRegistry,
    currentUser,
    userRole
};
}