import { Button, Row, Space, Typography } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
interface QuizResultProps {
  correctAnswers: number;
  questionsAnswered: number;
}

export const QuizResult: React.FC<QuizResultProps> = ({
  correctAnswers,
  questionsAnswered,
}) => {
  const navigate = useNavigate();
  const redirectToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Row justify="center">
      <Space style={{ height: "70vh" }}>
        <Space direction="vertical" align="center">
          {/* <Row justify="center"> */}
          <Typography.Title>
            You answered {`${correctAnswers} / ${questionsAnswered}`} questions
            correctly!
          </Typography.Title>
          {/* </Row> */}
          {/* <Row justify="center"> */}
          <Button onClick={redirectToHome} type="primary">
            Create your own quiz
          </Button>
          {/* </Row> */}
        </Space>
      </Space>
    </Row>
  );
};
