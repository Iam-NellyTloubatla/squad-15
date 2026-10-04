// User Management Module
let userRegistry = [];
let currentUser = null;
let userRole = null;
// Register a new user
function registerUser(userId, name, email, password, role) {
    const newUser = {
        Id: userId,
        name: name,
        email: email,
        password: password,
        role: role
};
// add the new user to the database (this is a placeholder for actual database logic)
userRegistry.push(newUser);

console.log("User registered successfully:", newUser);
}

//login a user
function loginUser(email, password) {
    // find the user in the registry
    const user = userRegistry.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        userRole = user.role;
        console.log("Login successful:", currentUser);
    }else {
        console.log("Login failed: Invalid email or password.");
    }
}
//logout a user
function logoutUser() {
    if (currentUser) {
        const confirmLogout = confirm("Are you sure you want to log out?");
        if (confirmLogout === true) {
            console.log("User logged out:", currentUser);
            currentUser = null;
            userRole = null;
        }
    } else {
        console.log("No user is currently logged in.");
    }
}

