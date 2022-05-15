import { Col, Row, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuizAnswerStore } from "../../stores/quiz-answer.store";

type ParamsProps = {
  id: string;
};

interface QuizAnswerLoaderProps {
  children: React.ReactNode;
}

export const QuizAnswerLoader: React.FC<QuizAnswerLoaderProps> = ({
  children,
}) => {
  const { isLoading, getQuiz } = useQuizAnswerStore();
  const location = useParams() as unknown as ParamsProps;
  useEffect(() => {
    getQuiz(location.id);
  }, [location, getQuiz]);

  return isLoading ? (
    <Col span={24} style={{ height: 200 }}>
      <Row style={{ minHeight: "100%" }} align="middle" justify="center">
        <Spin></Spin>
      </Row>
    </Col>
  ) : (
    <>{children}</>
  );
};
