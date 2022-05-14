import { Button, Form, Input } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Quiz } from "../../types";
import { QuestionForm } from "../question-form";

interface QuizFormProps {
  initialValues?: any;
  onSubmit: (quiz: Quiz) => void;
}

export const QuizForm: React.FC<QuizFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  return (
    <Form.Provider>
      <Form
        name="basic"
        layout="vertical"
        initialValues={initialValues}
        onFinish={(data) => {
          onSubmit(data);
        }}
      >
        <Form.Item name="createdAt" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="createdBy" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="permalinkId" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input the title of the quiz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <QuestionForm />

        <Form.Item name="published" valuePropName="checked" initialValue={false}>
          <Checkbox>Published?</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Form.Provider>
  );
};
