import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { Button, Image } from "antd";

const image = "/404.svg";

const StyledContainer = styled.div`
  background: white;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home = (): JSX.Element => {
  const router = useRouter();
  const isAdminRoute = router.asPath.split("/").includes("admin");

  return (
    <>
      <Head>
        <title>WICC 2021 | 404</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledContainer>
        <Image src={image} preview={false} width="100%" />
        <Link href={isAdminRoute ? "/admin" : "/"}>
          <Button type="primary">
            {isAdminRoute ? "Ir al backoffice" : "Ir al inicio"}
          </Button>
        </Link>
      </StyledContainer>
    </>
  );
};

export default Home;
