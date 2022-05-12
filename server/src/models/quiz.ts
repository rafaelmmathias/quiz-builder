import { Timestamp } from "firebase-admin/firestore";

export type Choice = {
  title: string;
  isCorrect?: boolean;
};

export type Quiz = {
  id: string;
  title: string;
  choices: Choice[];
  published: boolean;
  permalinkId: string;
  type: "single" | "multi";
  createdAt: Timestamp | Date;
  createdBy: string;
};
