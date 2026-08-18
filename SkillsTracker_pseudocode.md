# 1. Setup

## Start the program
Connect to Firebase (for login and data storage)
Set currentUser = nobody logged in yet
Set userRole = none (will be "Learner" or "Assessor")
Load saved preferences (like theme) from browser

# 2. Authentication (Login & Registration)

## Function registerUser(email, password, name, role):
    Check if email and password are valid
    If valid:
        Create new account in Firebase
        Save user info (name, email, role, date created)
        Show "Registration successful"
    Else:
        Show "Invalid email or password"
    ENDIF
END FUCTION

## Function loginUser(email, password):
    Ask Firebase to log in with email + password
    If login works:
        Save currentUser info
        Get userRole from database
        Go to dashboard page
    Else:
        Show "Login failed"
    ENDIF
END FUNCTION

## Function logoutUser():
    Ask "Are you sure you want to log out?"
    If yes:
        Log out from Firebase
        Clear currentUser
        Go back to login page
    ENDIF
END FUCTION

# 3. Dashboard

## Function loadDashboard():
    If userRole is "Learner":
        Get all tasks for this user from Firebase
        Count how many are completed
        Count how many are pending
        Calculate progress = (completed / total) * 100
        Show dashboard with totals and progress
    If userRole is "Assessor":
        Get all support bookings from Firebase
        Show bookings and learner activity
    ENDIF
END FUNCTION

# 4. Task Manager (CRUD)

## Function createTask(title, description, dueDate):
    Make new task with status "pending"
    Save task to Firebase
    Show "Task created" and go back to dashboard
END FUCTION

## Function readTasks():
    Get all tasks for currentUser from Firebase
    Show tasks in a list
END FUCTION

## Function updateTask(taskId, updatedData):
    Ask "Do you want to update this task?"
    If yes:
        Update task in Firebase
        Refresh task list
    ENDIF
END FUCTION

## Function deleteTask(taskId):
    Ask "Do you want to delete this task? This cannot be undone."
    If yes:
        Delete task from Firebase
        Refresh task list
    ENDIF
END FUNCTION

# 5. Support Booking

## Function bookSupportSession(date, time, topic, notes):
    Check if form is filled correctly
    If valid:
        Save booking to Firebase
        Show "Booking submitted"
    Else:
        Show errors
    ENDIF
END FUNCTION

## Function viewBookings():
    If userRole is "Learner":
        Show only this learner’s bookings
    If userRole is "Assessor":
        Show all bookings
    ENDIF
END FUNCTION

## Function updateBookingStatus(bookingId, newStatus):
    If userRole is "Assessor":
        Update booking status in Firebase
    ENDIF
END FUNCTION

# 6. Search, Filter, Sort

## Function calculateProgress():
    Get all tasks for currentUser
    Count completed tasks
    Count total tasks
    progress = (completed / total) * 100
    Return progress
END FUNCTION

## Function printProgressSummary():
    progress = calculateProgress()
    Make a printable page with learner name, progress %, and task breakdown
    Print the page
END FUNTION

# 7. Progress

## Function calculateProgress():
    Get all tasks for currentUser
    Count completed tasks
    Count total tasks
    progress = (completed / total) * 100
    Return progress
END FUNCTION

## Function printProgressSummary():
    progress = calculateProgress()
    Make a printable page with learner name, progress %, and task breakdown
    Print the page
END FUNCTION

# 8. Mini-Game

## Function startMiniGame():
    Set score = 0
    Set timer = 60 seconds
    While timer > 0:
        Show a question with 4 answers
        Wait for user choice
        If answer is correct:
            Add 10 points
            Play success sound
        Else:
            Play error sound
        Load next question
    When timer ends:
        Save score to Firebase
        Show final score
END FUNCTION

# 9. Preferences & UI

## Function applyTheme():
    Get saved theme from browser
    If theme = "dark":
        Switch page to dark mode
    ENDIF
END FUNCTION

## Function savePreference(key, value):
    Save setting in browser
END FUNCTION

## Function showAnimation(element):
    Animate element (like fade or slide)
END FUNCTION

# 10. Main Program Flow

## When page loads:
    Apply saved theme
    Check if user is logged in
    If logged in:
        Load dashboard
    Else:
        Show login/register page
    ENDIF
END PROGRAM 







