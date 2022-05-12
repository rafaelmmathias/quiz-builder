import { RequestHandler } from "express";
import { pick } from "lodash";
import { Quiz } from "../models/quiz";
import {
  createQuiz,
  getQuizByPermalinkId,
  getQuizzesByEmail,
  updateQuiz,
} from "../services/quiz.service";
import { Timestamp } from "firebase-admin/firestore";
import { generatePermalinkId } from "../utils";
import { QuizNotFoundException } from "../models/errors";

const listConverter: FirebaseFirestore.FirestoreDataConverter<Quiz> = {
  toFirestore: (data) => {
    return data;
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data() as Quiz;
    const date = data.createdAt as Timestamp;

    return {
      ...data,
      createdAt: date.toDate(),
      choices: data.choices.map((choice) => pick(choice, ["title"])),
    };
  },
};

export const get: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user;

    res.json(await getQuizzesByEmail(user.email, listConverter));
  } catch (err) {
    next(err);
  }
};

const createConverter: FirebaseFirestore.FirestoreDataConverter<Quiz> = {
  toFirestore: (data) => {
    const id = generatePermalinkId();

    return {
      ...data,
      permalinkId: id,
      createdAt: Timestamp.fromDate(new Date()),
    };
  },
  fromFirestore: (snapshot) => snapshot.data() as Quiz,
};

export const create: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const quiz = req.body as Quiz;

    const response = await createQuiz(user.email, quiz, createConverter);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const getQuiz: RequestHandler = async (req, res, next) => {
  try {
    const response = await getQuizByPermalinkId(
      req.params.permalinkId,
      listConverter
    );
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const updateQuizController: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user;
    const quiz = req.body as Quiz;

    const response = await updateQuiz(user.email, req.params.permalinkId, quiz);

    if (!response) {
      throw QuizNotFoundException;
    }

    res.json(response);
  } catch (err) {
    next(err);
  }
};
