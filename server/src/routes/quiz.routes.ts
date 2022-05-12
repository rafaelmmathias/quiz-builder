import { getQuiz, updateQuizController } from "./../controllers/quiz.controller";
import express from "express";
import { authorize } from "../middlewares/authorize";
import { create, get } from "../controllers/quiz.controller";

export const quizRouter = express.Router();

quizRouter.get("/quiz", authorize, get);
quizRouter.get("/quiz/:permalinkId", getQuiz);
quizRouter.put("/quiz/:permalinkId", authorize, updateQuizController);
quizRouter.post("/quiz", authorize, create);
