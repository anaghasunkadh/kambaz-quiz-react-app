// src/Kambaz/Assignments/client.ts
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/courses`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: Omit<any, "_id">
) => {
  const response = await axios.post(`${ASSIGNMENTS_API}/${courseId}/assignments`, assignment);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(`${REMOTE_SERVER}/api/assignments/${assignment.title}`, assignment);
  return data;
};

export const deleteAssignment = async (title: string) => {
  const { data } = await axios.delete(`${REMOTE_SERVER}/api/assignments/${title}`);
  return data;
};
