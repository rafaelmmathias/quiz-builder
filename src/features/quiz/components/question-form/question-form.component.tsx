import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Input,
  Form,
  Col,
  Row,
  Divider,
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
              {fields.map((field, index) => (
                <Col key={field.key}>
                  <Divider orientation="left">Question {index + 1}</Divider>
                  <Row gutter={8}>
                    <Col span={4}>
                      <Form.Item
                        label="Type"
                        name={[index, "type"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select the question type!",
                          },
                        ]}
                      >
                        <Select>
                          <Select.Option value="single">Single</Select.Option>
                          <Select.Option value="multi">Multiple</Select.Option>
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
                  <Row gutter={8}>
                    <Choice index={index} />
                  </Row>
                  <Button onClick={() => remove(field.name)}>
                    Remove question
                  </Button>
                </Col>
              ))}
              <Form.Item>
                <Button onClick={() => add()}>
                  <PlusOutlined /> Add question
                </Button>
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
