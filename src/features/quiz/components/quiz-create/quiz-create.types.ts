import { Quiz } from "../../types";

export type QuizCreateStore = {
  isLoading: boolean;
  quiz: Quiz | null;
  create: (quiz: Quiz) => Promise<void>;
};
