# Testing Plan

import java.util.ArrayList;
import java.util.List;

// 1. Define the Roles Enums
enum Role {
    ADMIN, ASSESSOR, LEARNER
}

// 2. Define the User Class
class User {
    private int userId;
    private String name;
    private String email;
    private Role role;

    public User(int userId, String name, String email, Role role) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public int getUserId() { return userId; }
    public String getName() { return name; }
    public Role getRole() { return role; }
}

// 3. Define the Submission Class
class Submission {
    private int submissionId;
    private User learner;     
    private User assessor;    
    private String assignmentTitle;
    private Integer grade;    
    private String status;

    public Submission(int submissionId, User learner, String assignmentTitle) {
        if (learner.getRole() != Role.LEARNER) {
            throw new IllegalArgumentException("Only learners can submit assignments.");
        }
        this.submissionId = submissionId;
        this.learner = learner;
        this.assignmentTitle = assignmentTitle;
        this.status = "Pending Review";
        this.grade = null;
    }

    public void gradeSubmission(User assessor, int grade) {
        if (assessor.getRole() != Role.ASSESSOR) {
            throw new SecurityException("Access Denied: Only Assessors can grade assignments.");
        }
        this.assessor = assessor;
        this.grade = grade;
        this.status = "Graded";
    }

    public User getLearner() { return learner; }
    public User getAssessor() { return assessor; }
    public String getAssignmentTitle() { return assignmentTitle; }
    public Integer getGrade() { return grade; }
    public String getStatus() { return status; }
}

// 4. Tracker System using ArrayLists
class SystemManager {
    private List<User> userRegistry;
    private List<Submission> submissionRegistry;

    public SystemManager() {
        this.userRegistry = new ArrayList<>();
        this.submissionRegistry = new ArrayList<>();
    }

    public void registerUser(User user) {
        userRegistry.add(user);
    }

    public void trackSubmission(Submission submission) {
        submissionRegistry.add(submission);
    }

    // Prints all users filtered by a specific role
    public void printUsersByRole(Role targetRole) {
        System.out.println("\n--- Master List: " + targetRole + "S ---");
        boolean found = false;
        for (User user : userRegistry) {
            if (user.getRole() == targetRole) {
                System.out.println("ID: " + user.getUserId() + " | Name: " + user.getName());
                found = true;
            }
        }
        if (!found) System.out.println("No records found.");
    }

    // Prints a comprehensive overview of all submissions in the system
    public void printSubmissionDashboard() {
        System.out.println("\n================ SUBMISSION DASHBOARD ================");
        for (Submission sub : submissionRegistry) {
            String assessorName = (sub.getAssessor() != null) ? sub.getAssessor().getName() : "Unassigned";
            String marks = (sub.getGrade() != null) ? sub.getGrade() + "%" : "N/A";
            
            System.out.println("Task: " + sub.getAssignmentTitle());
            System.out.println("Submitted By: " + sub.getLearner().getName());
            System.out.println("Reviewer:     " + assessorName);
            System.out.println("Status:       " + sub.getStatus() + " (" + marks + ")");
            System.out.println("------------------------------------------------------");
        }
    }
}

// 5. Main Test Execution Program
public class DataModelTest {
    public static void main(String[] args) {
        SystemManager manager = new SystemManager();

        System.out.println("--- STEP 1: Creating and Registering Global Accounts ---");
        User admin = new User(1, "Admin Account", "admin@system.com", Role.ADMIN);
        User assessor = new User(2, "Assessor Account", "assessor@system.com", Role.ASSESSOR);
        User learner1 = new User(3, "Learner Account A", "learnerA@system.com", Role.LEARNER);
        User learner2 = new User(4, "Learner Account B", "learnerB@system.com", Role.LEARNER);

        manager.registerUser(admin);
        manager.registerUser(assessor);
        manager.registerUser(learner1);
        manager.registerUser(learner2);

        System.out.println("\n--- STEP 2: Running Admin Master List Filtering ---");
        manager.printUsersByRole(Role.LEARNER);
        manager.printUsersByRole(Role.ASSESSOR);

        System.out.println("\n--- STEP 3: Tracking Activity and Grading Loop ---");
        Submission sub1 = new Submission(1001, learner1, "Core Assignment 1");
        Submission sub2 = new Submission(1002, learner2, "Core Assignment 1");

        // Register submissions to tracker
        manager.trackSubmission(sub1);
        manager.trackSubmission(sub2);

        // Assessor reviews the first script only
        sub1.gradeSubmission(assessor, 85);

        System.out.println("\n--- STEP 4: Fetching Real-time System Dashboard ---");
        manager.printSubmissionDashboard();
    }
}
