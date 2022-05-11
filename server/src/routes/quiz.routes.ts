import express from 'express';
import { get } from '../controllers/quiz.controller';

export const quizRouter = express.Router();

quizRouter.get('/quiz', get)