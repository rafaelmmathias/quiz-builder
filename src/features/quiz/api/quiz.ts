import { axios } from "../../../lib/axios";

export const createQuiz = async () => {
  const response = await axios.post("/quiz");
  return response.data;
};

export const getQuizzes = async () => {
  const response = await axios.get("/quiz");
  return response.data;
};
