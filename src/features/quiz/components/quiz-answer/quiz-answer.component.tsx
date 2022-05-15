import { Card, Checkbox, Radio, Row, Space, Spin, Button } from "antd";

import { useQuizAnswerStore } from "../../stores/quiz-answer.store";
import { Question } from "../../types";
import { QuizAnswerLoader } from "./quiz-answer-loader";
import { QuizResult } from "./quiz-result";

export const QuizAnswer = () => {
  const { quiz, setAnswers, quizResult, getQuizResult, isLoadingResults } =
    useQuizAnswerStore();

  const onAnswerHandler = (question: Question, answer: string[]) => {
    setAnswers({
      id: question.id || "",
      choices: answer,
    });
  };

  return (
    <QuizAnswerLoader>
      <Row justify="center">
        {isLoadingResults && <Spin />}
        {!quizResult && !isLoadingResults && (
          <Card title={quiz?.title}>
            <Space direction="vertical">
              {quiz?.questions.map((question) => {
                return (
                  <Card type="inner" title={question.title} key={`question-answer-${question.id}`}>
                    {question.type === "single" ? (
                      <Radio.Group
                        onChange={(value) => {
                          onAnswerHandler(question, [value.target.value]);
                        }}
                      >
                        <Space direction="vertical">
                          {question.choices.map((choice, index) => {
                            return (
                              <Card type="inner" size="small" key={`choice-${index}`}>
                                <Radio value={choice.title}>
                                  {choice.title}
                                </Radio>
                              </Card>
                            );
                          })}
                        </Space>
                      </Radio.Group>
                    ) : (
                      <Checkbox.Group
                        options={question.choices.map(({ title }) => title)}
                        onChange={(selectedItems) => {
                          onAnswerHandler(question, selectedItems as string[]);
                        }}
                      ></Checkbox.Group>
                    )}
                  </Card>
                );
              })}
              <Row justify="end">
                <Button onClick={getQuizResult} type="primary">
                  Submit
                </Button>
              </Row>
            </Space>
          </Card>
        )}
      </Row>
      {quizResult && quiz && (
        <QuizResult
          correctAnswers={quizResult.correct}
          questionsAnswered={quiz.questions.length}
        />
      )}
    </QuizAnswerLoader>
  );
};
