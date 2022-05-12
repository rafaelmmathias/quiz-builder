import { ForbiddenException, QuizAlreadyPublishedException, QuizNotFoundException } from "../models/errors";

import { firestoreAdmin } from "../server";
import {
  CreateQuiz,
  GetQuizByPermalinkId,
  GetQuizzesByEmail,
  UpdateQuiz,
} from "./quiz.service.types";

export const getQuizzesByEmail: GetQuizzesByEmail = async (
  email,
  converter
) => {
  const collection = firestoreAdmin
    .collection("quizzes")
    .where("createdBy", "==", email)
    .orderBy("createdAt", "desc")
    .withConverter(converter);

  const quizzes = await collection.get();

  return quizzes.docs.map((doc) => doc.data());
};

export const getQuizByPermalinkId: GetQuizByPermalinkId = async (
  permalinkId,
  converter
) => {
  const response = await firestoreAdmin
    .collection("quizzes")
    .where("permalinkId", "==", permalinkId)
    .withConverter(converter)
    .get();

  if (response.docs.length > 0) {
    const quiz = response.docs[0].data();

    return quiz;
  }

  throw QuizNotFoundException;
};

export const createQuiz: CreateQuiz = async (email, quiz, converter) => {
  quiz.createdBy = email;
  await firestoreAdmin.collection("quizzes").withConverter(converter).add(quiz);

  return await getQuizzesByEmail(email);
};

export const updateQuiz: UpdateQuiz = async (email, permalinkId, quiz) => {
  const collection = await firestoreAdmin
    .collection("quizzes")
    .where("createdBy", "==", email)
    .where("permalinkId", "==", permalinkId)
    .where("published", "==", false)
    .get();

  if (collection.docs.length === 1) {
    const quizToUpdate = collection.docs[0];
    await firestoreAdmin
      .collection("quizzes")
      .doc(quizToUpdate.id)
      .update(quiz);

    return await getQuizByPermalinkId(permalinkId);
  }

  throw QuizAlreadyPublishedException;
};
