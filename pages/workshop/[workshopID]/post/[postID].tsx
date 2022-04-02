/* eslint-disable react/no-danger */
import React, { useEffect, useState, createRef } from "react";
import Head from "next/head";
import getConfig from "next/config";
import styled from "styled-components";
import { Card, Col, Row, Space, Typography, Button } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import Content from "../../../../components/Content";
import AudioPlayer from "../../../../components/AudioPlayer";
import { IPost } from "../../../../models/post.model";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import useRemark from "../../../../hooks/useRemark";

const PdfViewer = dynamic(() => import("../../../../components/PDFViewer"), {
  ssr: false,
});

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

const StyledContent = styled(Content)`
  overflow-y: auto;
  background: hsla(247, 79%, 22%, 1);
`;

const StyledCard = styled(Card)`
  flex: 1;
  .ant-card-body {
    height: 100%;
  }
`;

const StyledLinkCard = styled(Card)`
  .ant-card-body {
    padding: 0.5rem;
  }
`;

const StyledSpace = styled(Space)`
  width: 100%;
  height: 100%;

  & > .ant-space-item:last-child {
    flex: 1;
  }
`;

const StyledRemarkWrapper = styled.div`
  height: 100%;
  position: relative;

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

const { publicRuntimeConfig } = getConfig();

const Post = ({ initialPost }: { initialPost: IPost }): JSX.Element => {
  const router = useRouter();
  const { workshopID } = router.query;

  const routes = [
    {
      path: "/",
      name: "Inicio",
    },
    {
      path: "/workshops",
      name: "Workshops",
    },
    {
      path: `/workshop/${workshopID}`,
      name: initialPost.workshop?.title,
    },
  ];

  const [PDFHeight, setPDFHeight] = useState(0);
  const PDFRef = createRef<HTMLDivElement>();

  useEffect(() => {
    let height = PDFRef.current.offsetHeight;
    if (height < 450) height = window.innerHeight * 0.9;
    setPDFHeight(height);
  }, [PDFRef]);

  const { remarkRef } = useRemark();

  return (
    <>
      <Head>
        <title>WICC 2022 | {initialPost?.title || "Publicación"}</title>
        <link rel="icon" href="/favicon.ico" />
        {initialPost?.workshop?.enable_comments && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.remark_config = {
                  host: "${publicRuntimeConfig.REMARK_HOST}",
                  site_id: "${publicRuntimeConfig.REMARK_SITE_ID}",
                  components: ["embed"], 
                  locale: "${publicRuntimeConfig.REMARK_LOCALE}",
                  show_email_subscription: false,
                };

                (function (c, d) {
                  for (var i = 0; i < c.length; i++) {
                    var s = d.createElement('script');
                    var e = 'noModule' in s ? '.mjs' : '.js';
                    var r = d.head || d.body;
                    
                    s.async = true;
                    s.defer = true;
                    s.src = remark_config.host + '/web/' + c[i] + e;

                    r.appendChild(s);
                  }
                })(['embed'], document);
            
            `,
            }}
          />
        )}
      </Head>
      {/* <Image src={logo} width="24rem" preview={false} /> */}
      <StyledContent>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col
            lg={20}
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Breadcrumbs
              routes={routes}
              style={{ padding: "1rem 0", textAlign: "left" }}
            />
            <StyledCard>
              <Row gutter={[64, 32]} style={{ height: "100%" }}>
                <Col lg={12}>
                  <StyledSpace size="large" direction="vertical">
                    <Space
                      size="middle"
                      direction="vertical"
                      style={{ width: "100%" }}
                    >
                      <div>
                        <Typography.Title level={2}>
                          {initialPost.title}
                        </Typography.Title>
                        <Typography.Title
                          level={5}
                          style={{ margin: 0 }}
                          type="secondary"
                        >
                          {initialPost.author.name}
                        </Typography.Title>
                      </div>
                    </Space>
                    {initialPost?.description && (
                      <Typography.Text type="secondary">
                        {initialPost?.description}
                      </Typography.Text>
                    )}
                    <StyledLinkCard>
                      <Button
                        type="link"
                        href={initialPost.pdf?.fileLocation}
                        target="_blank"
                        icon={<FilePdfOutlined />}
                      >
                        <Space style={{ marginLeft: "0.5rem" }}>
                          Descargar PDF
                          <Typography.Text type="secondary">
                            {` - ${initialPost.pdf?.fileName}`}
                          </Typography.Text>
                        </Space>
                      </Button>
                    </StyledLinkCard>
                    <AudioPlayer
                      src={initialPost.audio?.fileLocation}
                      downloadFileName={initialPost.audio?.fileName}
                    />
                    {initialPost?.workshop?.enable_discord &&
                      initialPost?.workshop?.discord_link && (
                        <Button
                          type="link"
                          href={initialPost?.workshop?.discord_link}
                          target="_blank"
                          style={{ color: "#d82068", padding: 0 }}
                          icon={DiscordIcon}
                        >
                          {initialPost?.workshop?.discord_title}
                        </Button>
                      )}
                    <StyledRemarkWrapper>
                      <div id="remark42" ref={remarkRef} />
                    </StyledRemarkWrapper>
                  </StyledSpace>
                </Col>
                <Col lg={12} style={{ width: "100%" }}>
                  <div ref={PDFRef} style={{ height: "100%" }}>
                    <PdfViewer
                      url={String(initialPost.pdf?.fileLocation)}
                      height={PDFHeight}
                    />
                  </div>
                </Col>
              </Row>
            </StyledCard>
          </Col>
        </Row>
      </StyledContent>
    </>
  );
};

Post.getInitialProps = async ({
  res,
  query,
}: NextPageContext): Promise<{ initialPost: IPost } | unknown> => {
  const { postID } = query;

  await fetch(`${process.env.URL || ""}/api/post/count?id=${postID}`, {
    method: "POST",
  });

  const response = await fetch(`${process.env.URL || ""}/api/post/${postID}`);

  if (response.ok) {
    const responseJSON: {
      post: IPost;
    } = await response.json();
    const { post } = responseJSON;
    return {
      initialPost: post,
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

export default Post;
