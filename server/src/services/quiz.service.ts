import { Quiz } from "../models/quiz";
import { firestoreAdmin } from "../server";

type GetQuizzesByEmail<T> = (
  email: string,
  converter: FirebaseFirestore.FirestoreDataConverter<T>
) => Promise<T>;

export const getQuizzesByEmail: GetQuizzesByEmail<Quiz> = async (
  email,
  converter
) => {
  const colref = firestoreAdmin.collection("quiz").withConverter(converter);
  const document = colref.doc(email);
  return await (await document.get()).data();
};
