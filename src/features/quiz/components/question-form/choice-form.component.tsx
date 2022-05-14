import {
  Button,
  Input,
  Form,
  Col,
  Row,
  Divider,
  Switch,
} from "antd";
import ErrorList from "antd/lib/form/ErrorList";
import React from "react";
import { Question } from "../../types";

interface ChoiceProps {
  index: number;
}

export const Choice: React.FC<ChoiceProps> = ({ index }) => {
  const form = Form.useFormInstance();
  return (
    <>
      <Form.List
        name={[index, "choices"]}
        rules={[
          {
            validator: async (_, value, error) => {
              console.log(value)
              const question = form.getFieldValue([
                "questions",
                index,
              ]) as Question;

              if (!value || (Array.isArray(value) && value.length === 0)) {
                return Promise.reject(
                  new Error("At least 1 choice must be added.")
                );
              }

              if (Array.isArray(value) && value.filter((value)=>value).length > 0) {
                const correctChoices = value.filter(
                  (choice) => choice && choice.isCorrect
                ).length;

                if (question.type === "single" && correctChoices > 1)
                  return Promise.reject(
                    new Error(
                      "Maximum of 1 correct question for single question type"
                    )
                  );

                if (correctChoices < 1)
                  return Promise.reject(
                    new Error("At least 1 correct choice must be selected.")
                  );
              }

              if (value.length > 5) {
                return Promise.reject(new Error("Maximum of 5 choices."));
              }

              return Promise.resolve();
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <>
                <Divider />
                <Col span={22}>
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    label={"Answer"}
                    rules={[
                      {
                        required: true,
                        message: "Please input the answer description!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Row justify="center">
                    <Form.Item
                      label="Correct"
                      valuePropName="checked"
                      name={[name, "isCorrect"]}
                      initialValue={false}
                    >
                      <Switch />
                    </Form.Item>
                  </Row>
                </Col>

                <Row>
                  <Button onClick={() => remove(name)}>Remove</Button>
                </Row>
              </>
            ))}
            <ErrorList errors={errors} />
            <Button onClick={() => add()}>Add Choice</Button>
          </>
        )}
      </Form.List>
    </>
  );
};
