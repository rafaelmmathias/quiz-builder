import { axios } from "../../../lib/axios";
import { Quiz } from "../types";
import { DeleteQuizHandler } from "./quiz.types";
type CreateQuizHandler = (quiz: Quiz) => Promise<Quiz[]>;
type UpdateQuizHandler = (quiz: Quiz) => Promise<Quiz[]>;

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
