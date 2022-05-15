import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Input,
  Form,
  Col,
  Row,
  Divider,
  Card,
  Space,
} from "antd";
import ErrorList from "antd/lib/form/ErrorList";
import React from "react";
import { Choice } from "./choice-form.component";

interface QuestionFormProps {}

export const QuestionForm: React.FC<QuestionFormProps> = () => {
  return (
    <Col>
      <Form.Item
        name={"questions"}
        rules={[
          {
            min: 1,
            message: "At least 1 question must be added.",
            type: "array",
            required: true,
          },
          {
            max: 10,
            message: "Maximum of 10 questions.",
            type: "array",
            required: true,
          },
        ]}
      >
        <Form.List name={"questions"}>
          {(fields, { remove, add }, { errors }) => {
            return (
              <>
                <Divider orientation="center" dashed>
                  <Button onClick={() => add(null, 0)} type="dashed">
                    {" "}
                    <PlusOutlined /> Add Question
                  </Button>
                </Divider>

                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  {fields.map((field, index) => (
                    <>
                      <Divider />
                      <Row justify="center">
                        <Col span={22}>
                          <Card
                            size="small"
                            type="inner"
                            title={`Question ${index + 1}`}
                            extra={
                              <Button
                                onClick={() => remove(field.name)}
                                danger
                                type="primary"
                                icon={<DeleteFilled />}
                              ></Button>
                            }
                          >
                            <Col key={field.key}>
                              <Row gutter={8}>
                                <Col span={4}>
                                  <Form.Item
                                    label="Type"
                                    name={[index, "type"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Select the type!",
                                      },
                                    ]}
                                  >
                                    <Select>
                                      <Select.Option value="single">
                                        Single
                                      </Select.Option>
                                      <Select.Option value="multi">
                                        Multiple
                                      </Select.Option>
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={20}>
                                  <Form.Item
                                    name={[index, "title"]}
                                    label={"Question"}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please input the question!",
                                      },
                                    ]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                              </Row>

                              <Choice index={index} />
                            </Col>
                          </Card>
                        </Col>
                      </Row>
                    </>
                  ))}
                </Space>
                {fields.length > 0 && (
                  <Divider orientation="center" dashed>
                    <Button onClick={() => add()} type="dashed">
                      {" "}
                      <PlusOutlined /> Add Question
                    </Button>
                  </Divider>
                )}
                <Form.Item>
                  <ErrorList errors={errors} />
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form.Item>
      <Divider />
    </Col>
  );
};
