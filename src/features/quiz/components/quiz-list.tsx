import React, { useEffect } from "react";
import { useQuizStore } from "../stores/quiz.store";

export const QuizList = () => {
  const { fetch, quizzes } = useQuizStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div>
      {quizzes.map((quiz) => (
        <div>
          {quiz.title}
          <u>
            {quiz.choices.map(({ title }) => (
              <li>{title}</li>
            ))}
          </u>
        </div>
      ))}
    </div>
  );
};
