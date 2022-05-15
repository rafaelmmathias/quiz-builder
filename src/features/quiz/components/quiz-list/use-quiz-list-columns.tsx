import { Badge, Row, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { format } from "date-fns";
import { Quiz } from "../../types";
import { QuizTableActions } from ".";

export const useQuizListColumns = () => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (createdAt) => (
        <div>{format(new Date(createdAt), "MM/dd/yyyy HH:mm")}</div>
      ),
    },
    {
      title: "Questions",
      dataIndex: "questions",
      key: "questions",
      width: 100,
      render: (questions) => (
        <Row justify="center">
          <Badge
            count={questions.length}
            style={{ backgroundColor: "#108ee9" }}
          />
        </Row>
      ),
    },

    {
      title: "Status",
      dataIndex: "published",
      key: "published",
      width: 100,
      render: (published, quiz) => (
        <Row justify="center">
          {
            <Tag color={published ? "green" : "volcano"}>
              {published ? "published" : "not published"}
            </Tag>
          }
        </Row>
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "",
      width: 200,
      render: (value, quiz) => <QuizTableActions quiz={quiz} />,
    },
  ] as ColumnsType<Quiz>;
};
