import React from "react";
import Head from "next/head";
import { Button, Col, Row, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { SearchOutlined } from "@ant-design/icons";
import useFilter from "../../hooks/useFilter";
import { IPost } from "../../models/post.model";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  StyledWrapper,
  StyledHeader,
  StyledContent,
  StyledLinkCard,
  StyledTitle,
  StyledLogo,
  StyledSearchInput,
} from "../../components/Styled";
import { IWorkshop } from "../../models/workshop.model";

const logo = "/WICC-logo.png";

const DiscordIcon = (
  <svg
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      marginRight: "0.5rem",
      fill: "#d82068",
      verticalAlign: "middle",
    }}
  >
    <g>
      <path d="M3.58 21.196h14.259l-.681-2.205C17.259 19.079 23 24 23 24V2.475C22.932 1.137 21.78 0 20.352 0L3.585.003C2.158.003 1 1.142 1 2.48v16.24c0 1.411 1.156 2.476 2.58 2.476zM14.128 5.683l-.033.012.012-.012zM6.497 6.952c1.833-1.334 3.532-1.27 3.532-1.27l.137.135c-2.243.535-3.26 1.537-3.26 1.537.104-.022 4.633-2.635 10.121.066 0 0-1.019-.937-3.124-1.537l.186-.183c.291.001 1.831.055 3.479 1.26 0 0 1.844 3.15 1.844 7.02-.061-.074-1.144 1.666-3.931 1.726 0 0-.472-.534-.808-1 1.63-.468 2.24-1.404 2.24-1.404-3.173 1.998-5.954 1.686-9.281.336-.031 0-.045-.014-.061-.03v-.006c-.016-.015-.03-.03-.061-.03h-.06c-.204-.134-.34-.2-.34-.2s.609.936 2.174 1.404a22.262 22.262 0 00-.818 1.002c-2.786-.066-3.802-1.806-3.802-1.806 0-3.876 1.833-7.02 1.833-7.02z" />
      <path d="M14.308 12.771c.711 0 1.29-.6 1.29-1.34 0-.735-.576-1.335-1.29-1.335v.003c-.708 0-1.288.598-1.29 1.338 0 .734.579 1.334 1.29 1.334zM9.69 12.771c.711 0 1.29-.6 1.29-1.34 0-.735-.575-1.335-1.286-1.335l-.004.003c-.711 0-1.29.598-1.29 1.338 0 .734.579 1.334 1.29 1.334z" />
    </g>
  </svg>
);

const routes = [
  {
    path: "/",
    name: "Inicio",
  },
  {
    path: "/workshops",
    name: "Workshops",
  },
];

const Workshop = ({
  initialWorkshop,
}: {
  initialWorkshop: IWorkshop;
}): JSX.Element => {
  const router = useRouter();
  const { workshopID } = router.query;

  const [filteredPosts, filterPost] = useFilter<IPost>(initialWorkshop.posts, [
    "title",
    "article_id",
    "author.name",
  ]);

  const onSearch = (e) => {
    filterPost(e?.target?.value);
  };
  return (
    <>
      <Head>
        <title>WICC 2021 | {initialWorkshop?.title || "Workshop"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledWrapper>
        <StyledHeader>
          <StyledLogo src={logo} preview={false} />
        </StyledHeader>
        <StyledContent>
          <Breadcrumbs routes={routes} />
          <Space size="large" direction="vertical" style={{ width: "100%" }}>
            <div style={{ marginBottom: "1rem" }}>
              <StyledTitle noMargin>{initialWorkshop.title}</StyledTitle>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <Space
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  {initialWorkshop?.enable_discord &&
                    initialWorkshop?.discord_link && (
                      <Button
                        type="link"
                        href={initialWorkshop?.discord_link}
                        target="_blank"
                        style={{ color: "#d82068" }}
                        icon={DiscordIcon}
                      >
                        {initialWorkshop?.discord_title}
                      </Button>
                    )}
                </Space>
                <Row justify="center">
                  <Col lg={8}>
                    <StyledSearchInput
                      placeholder="Buscar"
                      onChange={onSearch}
                      suffix={<SearchOutlined />}
                    />
                  </Col>
                </Row>
              </Space>
            </div>
            <Row gutter={[32, 32]}>
              {filteredPosts.map((post, i) => (
                <Col lg={8} key={i} style={{ width: "100%" }}>
                  <StyledLinkCard>
                    <Link href={`${workshopID}/post/${post._id}`}>
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

Workshop.getInitialProps = async ({
  res,
  query,
}: NextPageContext): Promise<{ initialWorkshop: IWorkshop } | unknown> => {
  const { workshopID } = query;

  await fetch(`${process.env.URL || ""}/api/workshop/count?id=${workshopID}`, {
    method: "POST",
  });

  const response = await fetch(
    `${process.env.URL || ""}/api/workshop/${workshopID}`
  );

  if (response.ok) {
    const responseJSON: {
      workshop: IWorkshop;
    } = await response.json();
    const { workshop } = responseJSON;
    return {
      initialWorkshop: workshop,
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

export default Workshop;
