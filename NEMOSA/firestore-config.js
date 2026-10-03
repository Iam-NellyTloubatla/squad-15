import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCW3kfUNrp08PFl0Xp83-z2ScvTJnq2X-k",
  authDomain: "task-management-5d376.firebaseapp.com",
  databaseURL: "https://task-management-5d376-default-rtdb.firebaseio.com",
  projectId: "task-management-5d376",
  storageBucket: "task-management-5d376.firebasestorage.app",
  messagingSenderId: "816084350603",
  appId: "1:816084350603:web:87e9f6e671ae14a0b4068e",
  measurementId: "G-4LBZBEYTJC",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function saveStaff(staff) {
  const fullName = String(staff?.fullName || "").trim();
  const staffId = String(
    staff?.staffId || staff?.learnerId || staff?.studentId || "",
  ).trim();

  if (!fullName || !staffId) {
    throw new Error("Staff full name and ID are required.");
  }

  const payload = {
    ...staff,
    fullName,
    staffId,
    learnerId: staffId,
    studentId: staffId,
    role: staff?.role || "assessor",
    active: staff?.active !== false,
    createdAt: staff?.createdAt || new Date().toISOString(),
  };

  try {
    const stored = JSON.parse(localStorage.getItem("portalStaff") || "[]");
    const existingIndex = stored.findIndex(
      (item) =>
        String(item.staffId || item.learnerId || item.studentId || "")
          .trim()
          .toLowerCase() === staffId.toLowerCase(),
    );
    if (existingIndex >= 0) {
      stored[existingIndex] = payload;
    } else {
      stored.push(payload);
    }
    localStorage.setItem("portalStaff", JSON.stringify(stored));
  } catch (error) {
    console.warn("Local staff cache save failed:", error);
  }

  const staffRef = doc(db, "staff", staffId.toLowerCase());
  await setDoc(staffRef, payload);
  return payload;
}

export const saveStaffMember = saveStaff;

export async function deleteStaffRecord(staffId) {
  const id = String(staffId || "").trim();
  if (!id) return;

  try {
    const stored = JSON.parse(localStorage.getItem("portalStaff") || "[]");
    const filtered = stored.filter(
      (item) =>
        String(item.staffId || item.learnerId || item.studentId || "")
          .trim()
          .toLowerCase() !== id.toLowerCase(),
    );
    localStorage.setItem("portalStaff", JSON.stringify(filtered));
  } catch (error) {
    console.warn("Local staff cache removal failed:", error);
  }

  await deleteDoc(doc(db, "staff", id.toLowerCase()));
}

export const deleteStaffMemberRecord = deleteStaffRecord;

export async function saveLearner(learner) {
  const fullName = String(learner?.fullName || "").trim();
  const learnerId = String(
    learner?.learnerId || learner?.studentId || "",
  ).trim();

  if (!fullName || !learnerId) {
    throw new Error("Learner full name and ID are required.");
  }

  const payload = {
    ...learner,
    fullName,
    learnerId,
    studentId: learnerId,
    role: learner?.role || "learner",
    active: learner?.active !== false,
    createdAt: learner?.createdAt || new Date().toISOString(),
  };

  try {
    const stored = JSON.parse(localStorage.getItem("portalLearners") || "[]");
    const existingIndex = stored.findIndex(
      (item) =>
        String(item.learnerId || item.studentId || "")
          .trim()
          .toLowerCase() === learnerId.toLowerCase(),
    );
    if (existingIndex >= 0) {
      stored[existingIndex] = payload;
    } else {
      stored.push(payload);
    }
    localStorage.setItem("portalLearners", JSON.stringify(stored));
  } catch (error) {
    console.warn("Local learner cache save failed:", error);
  }

  const learnerRef = doc(db, "learners", learnerId.toLowerCase());
  await setDoc(learnerRef, payload);
  return payload;
}

export const saveStudent = saveLearner;

export async function deleteLearnerRecord(learnerId) {
  const id = String(learnerId || "").trim();
  if (!id) return;

  try {
    const stored = JSON.parse(localStorage.getItem("portalLearners") || "[]");
    const filtered = stored.filter(
      (item) =>
        String(item.learnerId || item.studentId || "")
          .trim()
          .toLowerCase() !== id.toLowerCase(),
    );
    localStorage.setItem("portalLearners", JSON.stringify(filtered));
  } catch (error) {
    console.warn("Local learner cache removal failed:", error);
  }

  await deleteDoc(doc(db, "learners", id.toLowerCase()));
}

export const deleteStudentRecord = deleteLearnerRecord;

export async function getLearners() {
  const snapshot = await getDocs(collection(db, "learners"));
  return snapshot.docs.map((learnerDoc) => ({
    id: learnerDoc.id,
    ...learnerDoc.data(),
  }));
}

export const getStudents = getLearners;

export async function getStaff() {
  const snapshot = await getDocs(collection(db, "staff"));
  return snapshot.docs.map((staffDoc) => ({
    id: staffDoc.id,
    ...staffDoc.data(),
  }));
}

export const getStaffMembers = getStaff;

export async function isLearnerAllowed(fullName, learnerId) {
  const normalizedName = String(fullName || "")
    .trim()
    .toLowerCase();
  const normalizedId = String(learnerId || "")
    .trim()
    .toLowerCase();

  if (!normalizedName || !normalizedId) {
    return false;
  }

  try {
    const snapshot = await getDocs(collection(db, "learners"));

    return snapshot.docs.some((doc) => {
      const data = doc.data();
      const storedName = String(data.fullName || "")
        .trim()
        .toLowerCase();
      const storedId = String(data.learnerId || data.studentId || "")
        .trim()
        .toLowerCase();
      const isActive = data.active !== false;

      return (
        isActive && storedName === normalizedName && storedId === normalizedId
      );
    });
  } catch (error) {
    console.error("Learner access check failed:", error);
    return false;
  }
}

export const isStudentAllowed = isLearnerAllowed;
