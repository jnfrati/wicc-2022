import { Card, Col, Row, Button } from "antd";
import Head from "next/head";
import React, { useState } from "react";
import { NextPageContext } from "next";
import styled from "styled-components";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import { IPost } from "../../../models/post.model";
import Content from "../../../components/Content";
import Header from "../../../components/Header";
import PostsTable from "../../../components/posts/PostsTable";
import PostModal from "../../../components/posts/PostModal";
import usePosts from "../../../hooks/usePosts";

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Posts = ({ initialPosts }: { initialPosts: IPost[] }): JSX.Element => {
  const [showForm, setShowForm] = useState(false);
  const [postForUpdate, setPostForUpdate] = useState(undefined);
  const { posts, loading, createPost, updatePost, deletePost } = usePosts(
    initialPosts
  );

  const [session, loadingSession] = useSession();
  const router = useRouter();

  if (typeof window !== "undefined" && loadingSession) return null;

  if (loadingSession) {
    return (
      <StyledLoading>
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      </StyledLoading>
    );
  }

  if (!session) {
    router.push("/");
  }

  const openUpdateForm = (_id) => {
    setPostForUpdate(posts.find((post) => post._id === _id));
    setShowForm(true);
  };

  const onCreate = async (props) => {
    await createPost(props);
    setShowForm(false);
  };

  const onUpdate = async (props) => {
    await updatePost(props);
    setPostForUpdate(undefined);
    setShowForm(false);
  };

  const onDelete = (props) => {
    deletePost(props);
  };

  return (
    <>
      <Head>
        <title>Publicaciones - WICC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Publicaciones" />
      <Content>
        <Row justify="center">
          <Col lg={20}>
            <Card
              title="Listado de publicaciones"
              bordered
              extra={
                <Button
                  type="primary"
                  shape="round"
                  size="middle"
                  onClick={() => setShowForm((prevValue) => !prevValue)}
                >
                  Nuevo post
                </Button>
              }
            >
              <PostsTable
                data={posts}
                onUpdate={openUpdateForm}
                onDelete={onDelete}
              />
            </Card>
          </Col>
        </Row>
        <PostModal
          loading={loading}
          initialData={postForUpdate}
          visible={showForm}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onCancel={() => {
            setShowForm(false);
            setPostForUpdate(undefined);
          }}
        />
      </Content>
    </>
  );
};

Posts.getInitialProps = async ({
  res,
  req,
}: NextPageContext): Promise<{ initialPosts: IPost[] } | unknown> => {
  const session = await getSession({ req });

  if (!session) {
    if (res) {
      res.writeHead(307, { Location: "/" }).end();
    }
  }

  const response = await fetch(`${process.env.URL || ""}/api/post`);

  if (response.ok) {
    const responseJSON: {
      posts: IPost[];
    } = await response.json();
    const { posts } = responseJSON;
    return {
      initialPosts: posts,
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

export default Posts;
