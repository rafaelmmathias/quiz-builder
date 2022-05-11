import { Router } from "express";
import { pick } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { adminApp } from "./server";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const response = await adminApp
      .auth()
      .verifyIdToken(req.headers.authorization);

    const getRandomId = () => uuidv4().replace(/-/g, "").slice(0, 6);

    

    const converter: FirebaseFirestore.FirestoreDataConverter<{}> = {
      toFirestore: (data) => {
        return data;
      },
      fromFirestore: (snapshot) => {
        const data = snapshot.data();
        return data.quiz.map((question: any) => ({
          ...question,
          choices: question.choices.map((choice: any) =>
            pick(choice, ["title"])
          ),
        }));
      },
    };

    // const colref = firestoreAdmin.collection("quiz").withConverter(converter);
    // const document = colref.doc(response.email);

    // await document.set({
    //   quiz: [
    //     {
    //       title: "Quiz 3",
    //       type: "single",
    //       choices: [
    //         { title: "Answer 1-1", isCorrect: true },
    //         { title: "Answer 1-2", isCorrect: false },
    //         { title: "Answer 1-3", isCorrect: false },
    //       ],
    //     },
    //     {
    //       title: "Quiz 2",
    //       type: "multiple",
    //       choices: [
    //         { title: "Answer 2-1", isCorrect: false },
    //         { title: "Answer 2-2", isCorrect: true },
    //         { title: "Answer 2-3", isCorrect: true },
    //         { title: "Answer 2-4", isCorrect: false },
    //       ],
    //     },
    //   ],
    // });

    // const result = await (await document.get()).data();

    return res.json({ response });
  } catch (ex) {
    console.log(ex);
    res.status(500).json(ex);
  }
});

export default routes;
