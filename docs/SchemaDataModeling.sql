-- Database Schema for learner, Assessor, and Admin Management System

CREATE DATABASE IF NOT EXISTS SkillsTaskManagement;
USE SkillsTaskManagement;

-- 1. Admin Table
CREATE TABLE Admins (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    RoleLevel VARCHAR(30) DEFAULT 'Manager',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Course Table (Added for structural depth)
CREATE TABLE Courses (
    CourseID INT AUTO_INCREMENT PRIMARY KEY,
    CourseCode VARCHAR(10) UNIQUE NOT NULL,
    CourseName VARCHAR(100) NOT NULL,
    Description TEXT,
    AdminID INT,
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID) ON DELETE SET NULL
);

-- 3. Learner Table
CREATE TABLE Learners (
    LearnerID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    EnrollmentDate DATE NOT NULL,
    AdminID INT,
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID) ON DELETE SET NULL
);

-- 4. Assessor Table
CREATE TABLE Assessors (
    AssessorID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Specialisation VARCHAR(100),
    AdminID INT,
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID) ON DELETE SET NULL
);

-- 5. Student_Course Table (Many-to-Many Enrollment)
CREATE TABLE StudentEnrollments (
    EnrollmentID INT AUTO_INCREMENT PRIMARY KEY,
    LearnerID INT NOT NULL,
    CourseID INT NOT NULL,
    EnrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (LearnerID) REFERENCES Learners(LearnerID) ON DELETE CASCADE,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (LearnerID, CourseID)
);

-- 6. Assignment Table
CREATE TABLE Assignments (
    AssignmentID INT AUTO_INCREMENT PRIMARY KEY,
    CourseID INT NOT NULL,
    Title VARCHAR(150) NOT NULL,
    Description TEXT,
    DueDate DATETIME NOT NULL,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE
);

-- 7. Submission Table (Tracks multiple student attempts/re-assessments)
CREATE TABLE Submissions (
    SubmissionID INT AUTO_INCREMENT PRIMARY KEY,
    LearnerID INT NOT NULL,
    AssignmentID INT NOT NULL,
    AssessorID INT DEFAULT NULL,
    SubmissionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    AttemptNumber INT DEFAULT 1,
    Grade DECIMAL(5,2) DEFAULT NULL,
    Feedback TEXT DEFAULT NULL,
    GradedAt DATETIME DEFAULT NULL,
    FOREIGN KEY (LearnerID) REFERENCES Learners(LearnerID) ON DELETE CASCADE,
    FOREIGN KEY (AssignmentID) REFERENCES Assignments(AssignmentID) ON DELETE CASCADE,
    FOREIGN KEY (AssessorID) REFERENCES Assessors(AssessorID) ON DELETE SET NULL
);
-- Database Schema for learner, Assessor, and Admin Management System

CREATE DATABASE IF NOT EXISTS SkillsTaskManagement;
USE SkillsTaskManagement;

-- 1. Admin Table
CREATE TABLE Admins (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    RoleLevel VARCHAR(30) DEFAULT 'Manager',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Course Table (Added for structural depth)
CREATE TABLE Courses (
    CourseID INT AUTO_INCREMENT PRIMARY KEY,
    CourseCode VARCHAR(10) UNIQUE NOT NULL,
    CourseName VARCHAR(100) NOT NULL,
    Description TEXT,
    AdminID INT,
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID) ON DELETE SET NULL
);

-- 3. Learner Table
CREATE TABLE Learners (
    LearnerID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    EnrollmentDate DATE NOT NULL,
    AdminID INT,
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID) ON DELETE SET NULL
);

-- 4. Assessor Table
CREATE TABLE Assessors (
    AssessorID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Specialisation VARCHAR(100),
    AdminID INT,
    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID) ON DELETE SET NULL
);

-- 5. Student_Course Table (Many-to-Many Enrollment)
CREATE TABLE StudentEnrollments (
    EnrollmentID INT AUTO_INCREMENT PRIMARY KEY,
    LearnerID INT NOT NULL,
    CourseID INT NOT NULL,
    EnrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (LearnerID) REFERENCES Learners(LearnerID) ON DELETE CASCADE,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (LearnerID, CourseID)
);

-- 6. Assignment Table
CREATE TABLE Assignments (
    AssignmentID INT AUTO_INCREMENT PRIMARY KEY,
    CourseID INT NOT NULL,
    Title VARCHAR(150) NOT NULL,
    Description TEXT,
    DueDate DATETIME NOT NULL,
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE
);

-- 7. Submission Table (Tracks multiple student attempts/re-assessments)
CREATE TABLE Submissions (
    SubmissionID INT AUTO_INCREMENT PRIMARY KEY,
    LearnerID INT NOT NULL,
    AssignmentID INT NOT NULL,
    AssessorID INT DEFAULT NULL,
    SubmissionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    AttemptNumber INT DEFAULT 1,
    Grade DECIMAL(5,2) DEFAULT NULL,
    Feedback TEXT DEFAULT NULL,
    GradedAt DATETIME DEFAULT NULL,
    FOREIGN KEY (LearnerID) REFERENCES Learners(LearnerID) ON DELETE CASCADE,
    FOREIGN KEY (AssignmentID) REFERENCES Assignments(AssignmentID) ON DELETE CASCADE,
    FOREIGN KEY (AssessorID) REFERENCES Assessors(AssessorID) ON DELETE SET NULL
);
