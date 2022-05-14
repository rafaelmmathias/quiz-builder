import { createQuiz, deleteQuiz, getQuizzes, updateQuiz } from "./../api/quiz";
import create from "zustand";
import { QuizStore } from "../types";
import { message, Button } from "antd";

export const useQuizStore = create<QuizStore>((set, get) => ({
  isFetchingList: false,
  actionLoading: false,
  actionError: "",
  quizzes: [],
  fetch: async () => {
    set({
      isFetchingList: true,
    });
    const response = await getQuizzes();

    set({ quizzes: response, isFetchingList: false });
  },
  delete: async (quiz) => {
    try {
      set({
        actionLoading: true,
      });
      const updatedList = await deleteQuiz(quiz);
      message.success("Quiz deleted");

      set({
        quizzes: updatedList,
      });
    } catch (exception: any) {
      message.error(exception.message);
    } finally {
      set({
        actionLoading: false,
      });
    }
  },
  create: async (quiz) => {
    const response = await createQuiz(quiz);
    set({
      quizzes: response,
    });
    message.success("Quiz successfully created.");
  },
  update: async (quiz) => {
    await updateQuiz(quiz);
    message.success("Quiz successfully updated.");
  },
}));
