import { useAuthStore } from "../features/auth/stores/auth";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../features/auth/routes";
import { QuizRoutes } from "../features/quiz/routes";
import { SessionLoader } from "../components";

export const AppRouter = () => {
  const { onValidateSession, isFetchingUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onValidateSession();
    return () => {
      unsubscribe();
    };
  }, [onValidateSession]);

  return isFetchingUser ? (
    <SessionLoader />
  ) : (
    <Routes>
      <Route index element={<Navigate to={"/quiz"} />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/quiz/*" element={<QuizRoutes />} />
    </Routes>
  );
};
