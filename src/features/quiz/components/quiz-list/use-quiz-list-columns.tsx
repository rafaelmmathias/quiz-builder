import { Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { format } from "date-fns";
import { useMemo } from "react";
import { Quiz } from "../../types";
import { QuizTableActions } from ".";

export const useQuizListColumns = () => {
  return useMemo(
    () =>
      [
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "Questions",
          dataIndex: "questions",
          key: "questions",
          render: (questions) => <div>{questions.length}</div>,
        },
        {
          title: "Created at",
          dataIndex: "createdAt",
          key: "createdAt",
          render: (createdAt) => (
            <div>{format(new Date(createdAt), "mm/dd/yyyy HH:MM")}</div>
          ),
        },
        {
          title: "Status",
          dataIndex: "published",
          key: "published",
          render: (published) => (
            <div>
              {
                <Tag color={published ? "green" : "volcano"}>
                  {published ? "published" : "not published"}
                </Tag>
              }
            </div>
          ),
        },
        {
          title: "Actions",
          dataIndex: "",
          key: "",
          width:200,
          render: (value, quiz) => <QuizTableActions quiz={quiz} />,
        },
      ] as ColumnsType<Quiz>,
    []
  );
};
