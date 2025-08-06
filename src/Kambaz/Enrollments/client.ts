// src/Kanbas/Enrollments/client.ts
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

// Fetch all enrollments
export const fetchEnrollments = async () => {
  const response = await axios.get(ENROLLMENTS_API);
  return response.data; // Array of enrollment objects
};

// Enroll user in course
export const enrollUser = async (user: string, course: string) => {
  const response = await axios.post(ENROLLMENTS_API, { user, course });
  return response.data; // New enrollment object
};

// Unenroll user from course (by enrollment ID)
export const unenrollUser = async (id: string) => {
  const response = await axios.delete(`${ENROLLMENTS_API}/${id}`);
  return response.data; // Confirmation or deleted enrollment
};
