import { Quiz } from "../models/quiz";
import { firestoreAdmin } from "../server";
import { CreateQuiz, GetQuizzesByEmail } from "./quiz.service.types";

export const getQuizzesByEmail: GetQuizzesByEmail = async (
  email,
  converter
) => {
  const collection = firestoreAdmin.collection(email).orderBy('createdAt', 'desc').withConverter(converter);
  const quizzes = await collection.get();

  const response: Quiz[] = [];
  quizzes.forEach((doc) => {
    response.push(doc.data() as Quiz);
  });
  
  return response;
};

export const createQuiz: CreateQuiz = async (email, quiz, converter) => {
  await firestoreAdmin.collection(email).withConverter(converter).add(quiz);

  return await getQuizzesByEmail(email);
};
