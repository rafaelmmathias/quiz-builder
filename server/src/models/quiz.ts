export type Choice = {
  title: string;
  isCorrect?: boolean;
};

export type Quiz = {
  id: string;
  title: string;
  type: "single" | "multi";
  choices: Choice[];
};
