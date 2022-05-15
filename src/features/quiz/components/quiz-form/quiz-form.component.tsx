import { Button, Card, Col, Form, Input, Row, Spin, Switch } from "antd";
import { Quiz } from "../../types";
import { QuestionForm } from "../question-form";

interface QuizFormProps {
  initialValues?: any;
  isLoading?: boolean;
  onSubmit: (quiz: Quiz) => void;
}

export const QuizForm: React.FC<QuizFormProps> = ({
  initialValues,
  isLoading,
  onSubmit,
}) => {
  return (
    <Form.Provider>
      <Spin spinning={isLoading}>
        <Row justify="center">
          <Col span={15}>
            <Form
              name="basic"
              layout="vertical"
              initialValues={initialValues}
              onFinish={(data) => {
                onSubmit(data);
              }}
            >
              <Card title="Quiz info">
                <Form.Item name="createdAt" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="createdBy" hidden>
                  <Input />
                </Form.Item>
                <Form.Item name="permalinkId" hidden>
                  <Input />
                </Form.Item>
                <Row>
                  <Col span={20}>
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
                  </Col>
                  <Col span={4}>
                    <Row justify="center">
                      <Form.Item
                        name="published"
                        valuePropName="checked"
                        initialValue={false}
                        label="Published"
                      >
                        <Switch></Switch>
                      </Form.Item>
                    </Row>
                  </Col>
                </Row>

                <QuestionForm />

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
              </Card>
            </Form>
          </Col>
        </Row>
      </Spin>
    </Form.Provider>
  );
};
