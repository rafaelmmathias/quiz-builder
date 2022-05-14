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
      <Form.List
        name={"questions"}
        rules={[
          {
            validator: async (rule, value, error) => {
              if (!value || (Array.isArray(value) && value.length === 0)) {
                return Promise.reject(
                  new Error("At least 1 question must be added.")
                );
              }

              if (value.length > 10) {
                return Promise.reject(new Error("Maximum of 10 questions."));
              }
              Promise.resolve();
            },
          },
        ]}
      >
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
                        {/* <Row> */}
                        <Choice index={index} />
                        {/* </Row> */}
                      </Col>
                    </Card>
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
      <Divider />
    </Col>
  );
};
