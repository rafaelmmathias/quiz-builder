import { axios } from "../../../lib/axios";
import { QuizResult } from "../stores/quiz-answer.store";
import { Quiz } from "../types";
import {
  CreateQuizHandler,
  DeleteQuizHandler,
  GetQuizHandler,
  GetQuizResultHandler,
  UpdateQuizHandler,
} from "./quiz.types";

export const createQuiz: CreateQuizHandler = async (quiz) => {
  const response = await axios.post<Quiz[]>("/quiz", quiz);
  return response.data;
};

export const updateQuiz: UpdateQuizHandler = async (quiz) => {
  const response = await axios.put<Quiz[]>(`/quiz/${quiz.permalinkId}`, quiz);
  return response.data;
};

export const getQuizzes = async () => {
  const response = await axios.get<Quiz[]>("/quiz");
  return response.data;
};

export const deleteQuiz: DeleteQuizHandler = async (quiz) => {
  const response = await axios.delete(`/quiz/${quiz.permalinkId}`);
  return response.data;
};

export const getQuiz: GetQuizHandler = async (id) => {
  const response = await axios.get(`/quiz/${id}`);
  return response.data;
};

export const getQuizResult: GetQuizResultHandler = async (answer) => {
  const response = await axios.post<QuizResult>(`/quiz/getQuizResult`, answer);
  return response.data;
};
