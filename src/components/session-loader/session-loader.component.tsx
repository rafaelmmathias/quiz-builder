import { Layout, Card, Spin } from "antd";
import { Content, Header } from "antd/lib/layout/layout";

export const SessionLoader = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header></Header>
      <Spin>
        <Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card title="Loading your session"></Card>
        </Content>
      </Spin>
    </Layout>
  );
};
