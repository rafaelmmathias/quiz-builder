export type Choice = {
  title: string;
  isCorrect?: boolean;
};

export type Quiz = {
  id: string;
  title: string;
  type: "single" | "multi";
  isPublished: boolean;
  choices: Choice[];
};

export type QuizStore = {
  quizzes: Quiz[];
  fetch: () => void;
};
