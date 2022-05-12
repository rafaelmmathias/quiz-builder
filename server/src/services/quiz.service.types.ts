import { Quiz } from "../models/quiz";

export type GetQuizzesByEmail = (
  email: string,
  converter?: FirebaseFirestore.FirestoreDataConverter<Quiz>
) => Promise<Quiz[]>;

export type CreateQuiz = (
  email: string,
  quiz: Quiz,
  converter?: FirebaseFirestore.FirestoreDataConverter<Quiz>
) => Promise<Quiz[]>;

export type GetQuizByPermalinkId = (
  permalinkId: string,
  converter?: FirebaseFirestore.FirestoreDataConverter<Quiz>
) => Promise<Quiz>;
