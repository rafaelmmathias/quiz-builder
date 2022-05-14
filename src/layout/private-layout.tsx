import React, { useMemo } from "react";
import { Button, Col, Layout, Menu, Row, Space } from "antd";
import { Avatar } from "antd";
import { useAuthStore } from "../features/auth/stores/auth";
import { LogoutOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const menu = useMemo(
    () => [
      {
        path: "/quiz",
        key: "menu-dashboard",
        label: "Dashboard",
      },
    ],
    []
  );
  const selectedMenuItems = menu
    .filter((item) => item.path === location.pathname)
    .map((item) => item.key);

  const goToDashboard = () => {
    navigate("/quiz");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Row>
          <Col flex="auto">
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={selectedMenuItems}
              items={menu}
              onClick={goToDashboard}
            />
          </Col>
          <Col flex="230px">
            <Row justify="end">
              <Space>
                <Avatar src={user?.photoURL} />
                <Button type="primary" onClick={logout}>
                  Logout
                  <LogoutOutlined style={{ color: "#ffffff" }} />
                </Button>
              </Space>
            </Row>
          </Col>
        </Row>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          backgroundColor: "#fff",
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};
