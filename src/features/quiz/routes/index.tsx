import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../../../routes/private-route";
import { QuizCreate } from "../components";
import { QuizList } from "../components/quiz-list";

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
        index
        element={
          <PrivateRoute>
            <QuizList />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
