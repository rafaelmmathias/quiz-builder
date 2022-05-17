import { createQuiz, deleteQuiz, getQuizzes, updateQuiz } from "./../api/quiz";
import create from "zustand";
import { QuizStore } from "../types";
import { message } from "antd";

export const useQuizStore = create<QuizStore>((set, get) => ({
  isFetchingList: false,
  actionLoading: false,
  actionError: "",
  quizzes: [],
  fetch: async () => {
    set({
      isFetchingList: true,
      quizzes: []
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
    set({
      actionLoading: true,
    });
    const response = await createQuiz(quiz);
    set({
      quizzes: response,
      actionLoading: false,
    });
    message.success("Quiz successfully created.");
  },
  update: async (quiz) => {
    set({
      actionLoading: true,
    });
    await updateQuiz(quiz);
    set({
      actionLoading: false,
    });

    message.success("Quiz successfully updated.");
  },
}));
