import { RequestHandler } from "express";
import { pick } from "lodash";
import { Quiz } from "../models/quiz";
import { adminApp } from "../server";
import { getQuizzesByEmail } from "../services/quiz.service";

const converter: FirebaseFirestore.FirestoreDataConverter<Quiz> = {
  toFirestore: (data) => {
    return data;
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return data.quiz.map((question: any) => ({
      ...question,
      choices: question.choices.map((choice: any) => pick(choice, ["title"])),
    }));
  },
};

export const get: RequestHandler = async (req, res, next) => {
  try {
    const response = await adminApp
      .auth()
      .verifyIdToken(req.headers.authorization);

    res.json(await getQuizzesByEmail(response.email, converter));
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
};
