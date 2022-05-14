import { PageHeader } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../../stores/quiz.store";
import { Quiz } from "../../types";
import { QuizForm } from "../quiz-form";

export const QuizCreate = () => {
  const { create, actionLoading } = useQuizStore();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const createHandler = async (quiz: Quiz) => {
    await create(quiz);
    navigate("/quiz");
  };

  return (
    <div>
      <PageHeader onBack={goBack} title={"Create a quiz"} />
      <QuizForm
        onSubmit={(quiz) => createHandler(quiz)}
        isLoading={actionLoading}
      />
    </div>
  );
};
