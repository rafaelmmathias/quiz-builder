import { PageHeader } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuizStore } from "../../stores/quiz.store";
import { Quiz } from "../../types";
import { QuizForm } from "../quiz-form";

export const QuizEdit = () => {
  const { update, actionLoading } = useQuizStore();
  const navigate = useNavigate();
  const { state } = useLocation() as any;
  const goBack = () => {
    navigate("/quiz");
  };

  useEffect(() => {
    if (!state?.quiz) {
      navigate("/quiz");
    }
  }, [navigate, state]);

  const editHandler = async (quiz: Quiz) => {
    await update(quiz);
    navigate("/quiz");
  };

  return (
    <>
      <PageHeader onBack={goBack} title={"Update quiz"} />
      <QuizForm
        onSubmit={(quiz) => editHandler(quiz)}
        initialValues={state?.quiz || null}
        isLoading={actionLoading}
      />
    </>
  );
};
