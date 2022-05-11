import { testing } from "../../../config/firebase-config";
import React, { useEffect } from "react";
import { createQuiz } from "../api/quiz";

export const QuizCreate = () => {
  const createQuizAsync = async () => {
    // const data = await createQuiz();
    // console.log("aaaa", data);
    // const aaa = await testing();
    // console.log("result: ", data);
  };
  useEffect(() => {
    createQuizAsync();
  }, []);
  
  return <div>QuizCreate</div>;
};
