import Head from "next/head";
import { Image } from "antd";
import styled from "styled-components";
import { getSession, useSession } from "next-auth/client";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import type { NextPageContext } from "next";

const logo = "/WICC-logo.png";
const backoffice = "/backoffice.svg";

const StyledContent = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
`;

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = (): JSX.Element => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (typeof window !== "undefined" && loading) return null;

  if (loading) {
    return (
      <StyledLoading>
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      </StyledLoading>
    );
  }

  if (!session) {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Inicio - WICC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledContent>
        <Image src={logo} preview={false} />
        <Image src={backoffice} preview={false} width="80%" />
      </StyledContent>
    </>
  );
};

Home.getInitialProps = async ({
  res,
  req,
}: NextPageContext): Promise<unknown> => {
  const session = await getSession({ req });

  if (!session) {
    if (res) {
      res.writeHead(307, { Location: "/" }).end();
    }
  }

  return {};
};

export default Home;
