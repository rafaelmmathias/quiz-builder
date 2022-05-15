import { APP_URL } from "../../../../config";
import {
  CopyOutlined,
  DeleteRowOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Row, Space, Typography } from "antd";
import React, { useCallback } from "react";
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

  const getPermalink = useCallback((id: string) => {
    return `${APP_URL}/quiz/answer/${id}`;
  }, []);

  return (
    <Row justify="end">
      <Space>
        {quiz.published && (
          <Typography.Paragraph
            style={{ margin: 0 }}
            copyable={{
              text: getPermalink(quiz.permalinkId),
              icon: <Button type="primary" icon={<CopyOutlined />}></Button>,
              tooltips: "Copy link to share the Quiz",
            }}
          ></Typography.Paragraph>
        )}

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
