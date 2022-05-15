import React, { useEffect } from "react";
import { Button, Row, Space, Spin, Table, Typography } from "antd";

import { useQuizStore } from "../../stores/quiz.store";
import { useQuizListColumns } from "./use-quiz-list-columns";
import { SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

export const QuizList = () => {
  const { isFetchingList, fetch, quizzes } = useQuizStore();

  useEffect(() => {
    fetch();
  }, [fetch]);
  const columns = useQuizListColumns();
  const navigate = useNavigate();

  return (
    <div>
      <Row justify="space-between">
        <Title>Quiz list</Title>
        <Row justify="end">
          <Space>
            <Button
              type="primary"
              onClick={() => {
                navigate("create");
              }}
            >
              Create
            </Button>
            <Button type="primary" onClick={fetch}>
              <SyncOutlined spin={isFetchingList} disabled={isFetchingList} />
              Refresh
            </Button>
          </Space>
        </Row>
      </Row>
      <Spin spinning={isFetchingList}>
        <Table
          dataSource={quizzes}
          columns={columns}
          rowKey={(question) => question.permalinkId}
        />
      </Spin>
    </div>
  );
};
