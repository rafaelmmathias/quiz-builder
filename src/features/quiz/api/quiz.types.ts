import { Answer, QuizResult } from "../stores/quiz-answer.store";
import { Quiz } from "../types";

export type DeleteQuizHandler = (quiz: Quiz) => Promise<Quiz[]>;
export type CreateQuizHandler = (quiz: Quiz) => Promise<Quiz[]>;
export type UpdateQuizHandler = (quiz: Quiz) => Promise<Quiz[]>;
export type GetQuizHandler = (id: string) => Promise<Quiz>;
export type GetQuizResultHandler = (answer: Answer) => Promise<QuizResult>;
