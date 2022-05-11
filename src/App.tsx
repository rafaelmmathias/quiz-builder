import React, { useEffect, useMemo } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuthStore } from "./features/auth/stores/auth";

function App() {
  const { isAuthorized, logout, isLoading, errorMessage } = useAuthStore();
  return (
    <div>
      {isLoading && "isLoading..."}
      {/* <button onClick={login}>Login with google</button> */}
      {isAuthorized && <button onClick={logout}>Logout</button>}
      {errorMessage && errorMessage}
      {isAuthorized && <div>Is Authenticated</div>}
      <Link to="/quiz/create">Create quiz(private)</Link>
      <Link to="/quiz">Get All Quizzes(private)</Link>
      <Link to="/auth/login">Go to login Page</Link>
      <Link to="/auth/register">Register</Link>
    </div>
  );
}

export default App;
