import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

// Fetch all quizzes
export const findAllQuizzes = async () => {
  const { data } = await axios.get(`${REMOTE_SERVER}/api/quizzes`);
  return data;
};

// Fetch quizzes by course
export const findQuizzesByCourse = async (courseId: string) => {
  const { data } = await axios.get(`${REMOTE_SERVER}/api/courses/${courseId}/quizzes`);
  return data;
};

// Fetch a quiz by ID
export const findQuizById = async (quizId: string) => {
  const { data } = await axios.get(`${REMOTE_SERVER}/api/quizzes/${quizId}`);
  return data;
};

// Fetch questions for a quiz
export const findQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axios.get(`${REMOTE_SERVER}/api/quizzes/${quizId}/questions`);
  return data;
};
