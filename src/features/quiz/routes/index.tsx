import { NotFound, PublicLayout } from "../../../layout";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { QuizCreate, QuizList, QuizEdit } from "../components";
import { QuizAnswer } from "../components/quiz-answer";
import { PrivateRoute } from "../../../routes/private-route";

export const QuizRoutes = () => {
  return (
    <Routes>
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <QuizCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit"
        element={
          <PrivateRoute>
            <QuizEdit />
          </PrivateRoute>
        }
      />
      <Route
        index
        element={
          <PrivateRoute>
            <QuizList />
          </PrivateRoute>
        }
      />
      <Route
        path="/answer/:id"
        element={
          <PublicLayout>
            <QuizAnswer />
          </PublicLayout>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
