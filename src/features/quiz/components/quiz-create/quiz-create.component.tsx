import {
  PageHeader,
} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../../stores/quiz.store";
import { QuizForm } from "../quiz-form";


export const QuizCreate = () => {
  const { create } = useQuizStore();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <PageHeader onBack={goBack} title={"Create a quiz"} />
      <QuizForm onSubmit={(quiz) => create(quiz)} />
    </div>
  );
};
