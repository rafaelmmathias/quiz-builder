import { unionBy } from "lodash-es";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { getQuiz, getQuizResult } from "../api/quiz";
import { Quiz } from "../types";

export type Answer = {
  permalinkId: string;
  answers: QuestionAnswer[];
};
export type QuestionAnswer = {
  id: string;
  choices: string[];
};

type QuizAnswerStore = {
  isLoading: boolean;
  isLoadingResults: boolean;
  quiz?: Quiz;
  answers: QuestionAnswer[];
  getQuiz: (id: string) => Promise<void>;
  setAnswers: (answer: QuestionAnswer) => void;
  getQuizResult: () => Promise<void>;
  quizResult?: QuizResult;
};

export type QuizResult = {
  correct: number;
  wrong: number;
};

export const useQuizAnswerStore = create(
  devtools<QuizAnswerStore>((set, get) => ({
    isLoading: false,
    isLoadingResults: false,
    answers: [],
    setAnswers: (answer: QuestionAnswer) => {
      const prev = get().answers;

      set({ answers: unionBy([answer], prev, "id") });
    },
    getQuiz: async (id) => {
      set({ isLoading: true, quizResult: undefined });
      const quiz = await getQuiz(id);
      set({ quiz, isLoading: false });
    },
    getQuizResult: async () => {
      set({ isLoadingResults: true });
      const answers = get().answers;
      const id = get().quiz?.permalinkId || "";
      const quizResult = await getQuizResult({
        permalinkId: id,
        answers,
      });

      set({ quizResult, isLoadingResults: false });
    },
  }))
);
