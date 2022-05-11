import { getQuizzes } from "./../api/quiz";
import create from "zustand";
import { QuizStore } from "../types";


export const useQuizStore = create<QuizStore>((set, get) => ({
  quizzes: [],
  fetch: async () => {
    const response = await getQuizzes();

    set({ quizzes: response });
  },
}));
