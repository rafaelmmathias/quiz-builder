import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
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
        Quiz Builder - Created by Rafael Mathias
      </Footer>
    </Layout>
  );
};
