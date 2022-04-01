import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import "antd/dist/antd.less";
import { ThemeProvider } from "styled-components";
import { Layout, Spin } from "antd";
import { useRouter } from "next/router";
import { theme } from "../constants/theme";
import Sider from "../components/Sider";
import Footer from "../components/Footer";
import useLoadingPage from "../hooks/useLoadingPage";
import "isomorphic-unfetch";

const MyApp = ({ Component, pageProps }: AppProps): React.ReactNode => {
  const currentRoute = useRouter().pathname;
  const [loadingPage] = useLoadingPage();
  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={{ ...theme }}>
        <Spin spinning={loadingPage} style={{ maxHeight: "100vh" }}>
          {!currentRoute.includes("/admin") ? (
            <Layout style={{ height: "100vh", overflow: "hidden" }}>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Layout style={{ height: "100vh" }}>
              <Sider />
              <Layout>
                <Component {...pageProps} />
                <Footer />
              </Layout>
            </Layout>
          )}
        </Spin>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
