import { Quiz } from "../types";

export type DeleteQuizHandler = (quiz: Quiz) => Promise<Quiz[]>;
