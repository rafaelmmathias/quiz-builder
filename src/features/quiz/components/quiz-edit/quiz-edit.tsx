import { PageHeader } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuizStore } from "../../stores/quiz.store";
import { QuizForm } from "../quiz-form";

export const QuizEdit = () => {
  const { update } = useQuizStore();
  const navigate = useNavigate();
  const { state } = useLocation() as any;
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <>
      <PageHeader onBack={goBack} title={"Create a quiz"} />
      <QuizForm
        onSubmit={(quiz) => update(quiz)}
        initialValues={state.quiz || null}
      />
    </>
  );
};
