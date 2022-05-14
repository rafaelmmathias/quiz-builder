import { NotFound } from "../../../layout/not-found";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../../../routes/private-route";
import { QuizCreate } from "../components";
import { QuizList } from "../components/quiz-list/quiz-list.component";
import { QuizEdit } from "../components/quiz-edit";

export const QuizRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route path="/create" element={<QuizCreate />} />
        <Route path="/edit" element={<QuizEdit />} />
        <Route index element={<QuizList />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </PrivateRoute>
  );
};
