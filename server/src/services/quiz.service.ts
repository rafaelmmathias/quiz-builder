import { Quiz } from "../models/quiz";
import { firestoreAdmin } from "../server";
import {
  CreateQuiz,
  GetQuizByPermalinkId,
  GetQuizzesByEmail,
} from "./quiz.service.types";

export const getQuizzesByEmail: GetQuizzesByEmail = async (
  email,
  converter
) => {
  const collection = firestoreAdmin
    .collection(email)
    .orderBy("createdAt", "desc")
    .withConverter(converter);

  const quizzes = await collection.get();

  return quizzes.docs.map((doc) => doc.data());
};

export const getQuizByPermalinkId: GetQuizByPermalinkId = async (
  permalinkId,
  converter
) => {
  const collection = firestoreAdmin;
  const collections = await collection.listCollections();

  const response = await Promise.all(
    collections.map(async (collection) => {
      const filtered = await collection
        .withConverter(converter)
        .where("permalinkId", "==", permalinkId)
        .get();
      return filtered.docs.map((doc) => {
        return doc.data();
      });
    })
  );

  return response[0][0] as Quiz;
};

export const createQuiz: CreateQuiz = async (email, quiz, converter) => {
  await firestoreAdmin.collection(email).withConverter(converter).add(quiz);

  return await getQuizzesByEmail(email);
};
