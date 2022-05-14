import {
  Button,
  Layout,
  Card,
} from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useAuthStore } from "../stores/auth";
import { Content, Footer, Header } from "antd/lib/layout/layout";

export const Login = () => {
  const { login } = useAuthStore();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header></Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card title="Authentication" bordered>
          
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={login}
          >
            <GoogleOutlined />
            Log in with Google
          </Button>
        </Card>
      </Content>
      <Footer>Quiz Builder 2022</Footer>
    </Layout>
  );
};
