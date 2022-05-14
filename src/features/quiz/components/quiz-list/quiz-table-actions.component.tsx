import { DeleteRowOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Row, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../../stores/quiz.store";
import { Quiz } from "../../types";

interface QuizListActionsProps {
  quiz: Quiz;
}
export const QuizTableActions: React.FC<QuizListActionsProps> = ({ quiz }) => {
  const { delete: deleteQuiz, actionLoading } = useQuizStore();
  const navigate = useNavigate();
  const onEditHandler = () => {
    navigate("edit", {
      state: {
        quiz: quiz,
      },
    });
  };

  return (
    <Row justify="space-around">
      <Space>
        <Button
          type="primary"
          disabled={quiz.published}
          onClick={onEditHandler}
        >
          <EditOutlined />
          Edit
        </Button>

        <Popconfirm
          title="Are you sure delete this quiz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteQuiz(quiz)}
          okButtonProps={{
            loading: actionLoading,
          }}
        >
          <Button type="primary" danger>
            <DeleteRowOutlined /> Delete
          </Button>
        </Popconfirm>
      </Space>
    </Row>
  );
};
