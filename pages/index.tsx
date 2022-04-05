import React from "react";
import Head from "next/head";
import { Col, Row, Space, Typography, Button } from "antd";
import NextLink from "next/link";
import { BarsOutlined, SnippetsOutlined } from "@ant-design/icons";
import { signIn, useSession } from "next-auth/client";
import type { GetServerSidePropsResult } from "next";
import Footer from "../components/Footer";
import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledFooterLink,
  StyledTitle1,
  StyledTitle2,
  StyledTitle3,
  StyledLogo,
} from "../components/Styled";
import { IWorkshop } from "../models/workshop.model";
import { IPost } from "../models/post.model";

const logo = "/WICC-logo.png";

interface IHomeProps {
  workshopsCount: number;
  postsCount: number;
  firstPosts: IPost[];
  firstWorkshops: IWorkshop[];
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<IHomeProps>
> {
  try {
    console.log(process.env)
    const props = await fetch(`${process.env.URL}/api/index_page`).then((res) =>
      res.json()
    );
    if (!props) {
      return {
        notFound: true,
      };
    }
    return {
      props, // will be passed to the page component as props
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

const Home = ({
  postsCount,
  workshopsCount,
  firstPosts,
  firstWorkshops,
}: IHomeProps): JSX.Element => {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>
          WICC 2022 | Workshop de Investigadores en Ciencias de la Computación
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledWrapper>
        <StyledHeader>
          <StyledLogo src={logo} preview={false} />
        </StyledHeader>
        <Space size={64} direction="vertical" style={{ width: "100%" }}>
          <StyledContent color="purple" fullRounded>
            <Row align="middle" gutter={[32, 32]} justify="center">
              <Col>
                <StyledTitle2 level={2}>XXIV</StyledTitle2>
              </Col>
              <Col>
                <StyledTitle1 level={1} className="ant-typography">
                  <span style={{ textTransform: "uppercase" }}>
                    Workshop de Investigadores{" "}
                  </span>
                  <br />
                  <span style={{ fontWeight: 300 }}>
                    en Ciencias de la Computación
                  </span>
                </StyledTitle1>
              </Col>
            </Row>
          </StyledContent>
          <Row gutter={[0, 32]}>
            <Col lg={12} style={{ width: "100%" }}>
              <NextLink href="workshops">
                <StyledContent link color="red" fullRounded>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <StyledTitle3
                        level={1}
                        style={{
                          margin: "0",
                          color: "white",
                          fontWeight: 300,
                        }}
                      >
                        Workshops
                      </StyledTitle3>
                      <Typography.Title
                        level={2}
                        style={{
                          margin: "0",
                          color: "white",
                          fontSize: "4rem",
                        }}
                      >
                        {workshopsCount}
                      </Typography.Title>
                    </Col>
                    <Col xs={0} sm={5} style={{ textAlign: "right" }}>
                      <BarsOutlined
                        style={{ fontSize: "6rem", color: "white" }}
                      />
                    </Col>
                  </Row>
                </StyledContent>
              </NextLink>
            </Col>
            <Col lg={12} style={{ width: "100%" }}>
              <NextLink href="posts">
                <StyledContent link fullRounded>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <StyledTitle3
                        level={1}
                        style={{
                          margin: "0",
                          color: "white",
                          fontWeight: 300,
                        }}
                      >
                        Publicaciones
                      </StyledTitle3>
                      <Typography.Title
                        level={2}
                        style={{
                          margin: "0",
                          color: "white",
                          fontSize: "4rem",
                        }}
                      >
                        {postsCount}
                      </Typography.Title>
                    </Col>
                    <Col xs={0} sm={5} style={{ textAlign: "right" }}>
                      <SnippetsOutlined
                        style={{ fontSize: "6rem", color: "white" }}
                      />
                    </Col>
                  </Row>
                </StyledContent>
              </NextLink>
            </Col>
          </Row>
          <StyledContent fullRounded>
            <Space size="large" direction="vertical" style={{ width: "100%" }}>
              <StyledTitle3
                level={3}
                style={{ color: "white", textAlign: "center" }}
              >
                <span style={{ fontWeight: 300 }}>Publicaciones</span> buscadas
              </StyledTitle3>
              <Row gutter={[32, 32]}>
                {firstPosts.map((post, i) => (
                  <Col lg={8} key={i} style={{ width: "100%" }}>
                    <StyledLinkCard>
                      <NextLink
                        href={`workshop/${post.workshop}/post/${post._id}`}
                      >
                        <Typography.Title
                          type="secondary"
                          level={4}
                          style={{ margin: "0" }}
                        >
                          {post.title}
                        </Typography.Title>
                      </NextLink>
                    </StyledLinkCard>
                  </Col>
                ))}
              </Row>
            </Space>
          </StyledContent>
          <StyledContent color="red" fullRounded>
            <Space size="large" direction="vertical" style={{ width: "100%" }}>
              <StyledTitle3
                level={3}
                style={{ color: "white", textAlign: "center" }}
              >
                <span style={{ fontWeight: 300 }}>Workshops</span> buscados
              </StyledTitle3>
              <Row gutter={[32, 32]}>
                {firstWorkshops.map((workshop, i) => (
                  <Col lg={8} key={i} style={{ width: "100%" }}>
                    <StyledLinkCard>
                      <NextLink href={`workshop/${workshop._id}`}>
                        <Typography.Title
                          type="secondary"
                          level={4}
                          style={{ margin: "0" }}
                        >
                          {workshop.title}
                        </Typography.Title>
                      </NextLink>
                    </StyledLinkCard>
                  </Col>
                ))}
              </Row>
            </Space>
          </StyledContent>
          <Footer />
          <StyledFooterLink justify="center">
            <Col lg={8}>
              <Button
                type="link"
                href="https://wicc2022.uch.edu.ar/"
                target="_blank"
              >
                wicc2022.uch.edu.ar
              </Button>
            </Col>
            <Col lg={8}>
              {session ? (
                <NextLink href="/admin">
                  <Button type="link">Admin</Button>
                </NextLink>
              ) : (
                <Button type="link" onClick={() => signIn("auth0")}>
                  Admin
                </Button>
              )}
            </Col>
          </StyledFooterLink>
        </Space>
      </StyledWrapper>
    </>
  );
};

export default Home;
