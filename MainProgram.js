// Main Program Flow

function onPageLoad() {
  console.log("Applying theme from preferences...");

  // Check if user is logged in
  if (currentUser) {
    console.log("User is logged in. Loading dashboard...");
    loadDashboard();
  } else {
    console.log("No user logged in. Showing login/register page...");
    // Placeholder: in real app, you would show login/register HTML
    // e.g., document.getElementById("loginPage").style.display = "block";
  }
}


onPageLoad();
