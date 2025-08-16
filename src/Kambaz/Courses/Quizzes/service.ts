import axios from "axios";
const API = import.meta.env.VITE_REMOTE_SERVER;

export const getQuizzesByCourse = (cid: string) =>
  axios.get(`${API}/api/courses/${cid}/quizzes`).then(r => r.data);

export const createQuiz = (cid: string, body: any) =>
  axios.post(`${API}/api/courses/${cid}/quizzes`, body).then(r => r.data);

export const getQuiz = (qid: string) =>
  axios.get(`${API}/api/quizzes/${qid}`).then(r => r.data);

export const updateQuiz = (qid: string, body: any) =>
  axios.put(`${API}/api/quizzes/${qid}`, body).then(r => r.data);

export const setPublished = (qid: string, published: boolean) =>
  axios.put(`${API}/api/quizzes/${qid}/${published}`).then(r => r.data);

export const deleteQuiz = (qid: string) =>
  axios.delete(`${API}/api/quizzes/${qid}`).then(r => r.data);

// Questions
export const getQuestions = (qid: string) =>
  axios.get(`${API}/api/quizzes/${qid}/questions`).then(r => r.data);

export const createQuestion = (qid: string, body: any) =>
  axios.post(`${API}/api/quizzes/${qid}/questions`, body).then(r => r.data);

export const updateQuestion = (quid: string, body: any) =>
  axios.put(`${API}/api/questions/${quid}`, body).then(r => r.data);

export const deleteQuestionAPI = (quid: string) =>
  axios.delete(`${API}/api/questions/${quid}`).then(r => r.data);
