import express, { Express, RequestHandler } from "express";
import dotenv from "dotenv";
import cors from "cors";
import admin, { ServiceAccount } from "firebase-admin";
import { quizRouter } from "./routes/index";
import { getFirebaseSettings } from "./config";

dotenv.config();

export const app: Express = express();

const port = process.env.PORT;
var serviceAccount = {
  credential: admin.credential.cert(getFirebaseSettings() as ServiceAccount),
};

export const adminApp = admin.initializeApp(serviceAccount);
export const firestoreAdmin = adminApp.firestore();

export const authMiddleware: RequestHandler = async (req, res, next) => {
  if (!req.headers.authorization) return next();

  await adminApp.auth().verifyIdToken(req.headers.authorization);

  next();
};
app.use(authMiddleware);

app.use(cors());
app.use(quizRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
