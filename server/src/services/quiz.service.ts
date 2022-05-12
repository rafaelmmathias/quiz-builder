import {
  ForbiddenException,
  QuizAlreadyPublishedException,
  QuizNotFoundException,
} from "../models/errors";

import { firestoreAdmin } from "../server";
import {
  CheckAnswer,
  CreateQuiz,
  GetQuizByPermalinkId,
  GetQuizzesByEmail,
  QuizResult,
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

export const checkAnswers: CheckAnswer = async (quizAnswer) => {
  const quiz = await getQuizByPermalinkId(quizAnswer.permalinkId);
  if (!quiz) throw QuizNotFoundException;
  if (!quiz.published) throw ForbiddenException;

  const result = quizAnswer.answers.reduce(
    (acc, curr) => {
      const question = quiz.questions.find(
        (question) => question.id === curr.id
      );
      if (question) {
        const isValidAnswer = question.choices
          .filter((choice) => choice.isCorrect)
          .every((choice) => curr.choices.includes(choice.title));

        acc.correct = isValidAnswer ? acc.correct + 1 : acc.correct;
        acc.wrong = !isValidAnswer ? acc.wrong + 1 : acc.wrong;
        return acc;
      }

      return acc;
    },
    {
      correct: 0,
      wrong: 0,
    } as QuizResult
  );

  return result;
};
