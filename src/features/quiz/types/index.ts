export type Choice = {
  title: string;
  isCorrect?: boolean;
};

export type Question = {
  id?: string;
  title: string;
  choices: Choice[];
  type: "single" | "multi";
};

export type Quiz = {
  title: string;
  published?: boolean;
  permalinkId: string;
  createdAt: string;
  questions: Question[];
};

export type QuizStore = {
  isFetchingList: boolean;
  actionLoading: boolean;
  actionError: string;
  quizzes: Quiz[];
  fetch: () => void;
  delete: (quiz: Quiz) => Promise<void>;
  create: (quiz: Quiz) => Promise<void>;
  update: (quiz: Quiz) => Promise<void>;
};
