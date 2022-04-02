import React from "react";
import Head from "next/head";
import { Col, Row, Image, Space, Typography } from "antd";
import Link from "next/link";
import { NextPageContext } from "next";
import { SearchOutlined } from "@ant-design/icons";
import useFilter from "../../hooks/useFilter";
import Breadcrumbs from "../../components/Breadcrumbs";
import { IWorkshop } from "../../models/workshop.model";
import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledTitle,
  StyledSearchInput,
} from "../../components/Styled";

const logo = "/WICC-logo.png";

const routes = [
  {
    path: "/",
    name: "Inicio",
  },
];

const Workshops = ({
  initialWorkshops,
}: {
  initialWorkshops: IWorkshop[];
}): JSX.Element => {
  const [filteredWorkshops, filterWorkshops] = useFilter<IWorkshop>(
    initialWorkshops,
    ["title"]
  );

  const onSearch = (e) => {
    filterWorkshops(e?.target?.value);
  };

  return (
    <>
      <Head>
        <title>WICC 2022 | Lista de workshops</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledWrapper>
        <StyledHeader>
          <Image
            src={logo}
            height="14rem"
            style={{ width: "auto" }}
            preview={false}
          />
        </StyledHeader>
        <StyledContent color="red">
          <Breadcrumbs routes={routes} />
          <Space size="large" direction="vertical" style={{ width: "100%" }}>
            <StyledTitle noMargin>Workshops</StyledTitle>
            <Row justify="center" style={{ marginBottom: "1rem" }}>
              <Col lg={8}>
                <StyledSearchInput
                  placeholder="Buscar"
                  onChange={onSearch}
                  suffix={<SearchOutlined />}
                />
              </Col>
            </Row>
            <Row gutter={[32, 32]}>
              {filteredWorkshops?.map((post, i) => (
                <Col lg={8} key={i} style={{ width: "100%" }}>
                  <StyledLinkCard>
                    <Link href={`workshop/${post._id}`}>
                      <Typography.Title
                        type="secondary"
                        level={4}
                        style={{ margin: "0" }}
                      >
                        {post.title}
                      </Typography.Title>
                    </Link>
                  </StyledLinkCard>
                </Col>
              ))}
            </Row>
          </Space>
        </StyledContent>
      </StyledWrapper>
    </>
  );
};

Workshops.getInitialProps = async ({
  res,
}: NextPageContext): Promise<{ initialWorkshops: IWorkshop[] } | unknown> => {
  const response = await fetch(`${process.env.URL || ""}/api/workshop`);

  if (response.ok) {
    const responseJSON: {
      workshops: IWorkshop[];
    } = await response.json();
    const { workshops } = responseJSON;
    return {
      initialWorkshops: workshops.filter(
        (workshop) => workshop.posts.length > 0
      ),
    };
  }
  if (res) {
    // On the server, we'll use an HTTP response to
    // redirect with the status code of our choice.
    // 307 is for temporary redirects.
    res.writeHead(307, { Location: "/" });
    res.end();
  }
  return {};
};

export default Workshops;
