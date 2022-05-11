import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";
import admin from "firebase-admin";
import { quizRouter } from "./routes/index";

dotenv.config();

export const app: Express = express();

const port = process.env.PORT;
var serviceAccount = {
  credential: admin.credential.cert(require("./settings.json")),
};

export const adminApp = admin.initializeApp(serviceAccount);
export const firestoreAdmin = adminApp.firestore();
app.use(cors());
app.use(quizRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
