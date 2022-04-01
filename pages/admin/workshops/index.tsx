import React, { useState } from "react";
import { NextPageContext } from "next";
import Head from "next/head";
import { Button, Card, Col, message, Row } from "antd";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/client";
import useWorkshops from "../../../hooks/useWorkshops";
import Content from "../../../components/Content";
import Header from "../../../components/Header";
import WorkshopModal from "../../../components/workshops/WorkshopModal";
import { IWorkshop } from "../../../models/workshop.model";
import WorkshopsTable from "../../../components/workshops/WorkshopsTable";

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Workshops = ({
  initialWorkshops,
}: {
  initialWorkshops: IWorkshop[];
}): JSX.Element => {
  const [isWorkshopFormOpen, setIsWorkshopFormOpen] = useState(false);
  const openWorkshopForm = () => setIsWorkshopFormOpen(true);
  const {
    workshops,
    loading,
    createWorkshop,
    updateWorkshopTitle,
    deleteWorkshop,
  } = useWorkshops(initialWorkshops);

  const [workshopForUpdate, setWorkshopForUpdate] = useState(undefined);

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

  const onSubmit = async (params) => {
    await createWorkshop(params);
    message.success(`Workshop creado ${params.title}`);
    setIsWorkshopFormOpen(false);
  };

  const onCancel = () => {
    setIsWorkshopFormOpen(false);
    setWorkshopForUpdate(undefined);
  };

  const openUpdateForm = (_id: string) => {
    setWorkshopForUpdate(workshops.find((cat) => cat._id === _id));
    setIsWorkshopFormOpen(true);
    // open the modal
  };

  const onUpdate = async (updatedWorkshop: IWorkshop) => {
    await updateWorkshopTitle(updatedWorkshop);
    setIsWorkshopFormOpen(false);
    setWorkshopForUpdate(undefined);
    message.success("Workshop actualizado");
  };

  const onDelete = async (_id: string) => {
    const { success } = await deleteWorkshop(_id);
    if (success) {
      message.success("Workshop eliminado");
    }
  };

  return (
    <>
      <Head>
        <title>Workshops - WICC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Workshops" />
      <Content>
        <Row justify="center">
          <Col lg={20}>
            <Card
              title="Listado de Workshops"
              bordered
              extra={
                <Button
                  type="primary"
                  shape="round"
                  size="middle"
                  onClick={openWorkshopForm}
                >
                  Nuevo Workshop
                </Button>
              }
            >
              <WorkshopsTable
                data={workshops}
                onUpdate={openUpdateForm}
                onDelete={onDelete}
              />
            </Card>
          </Col>
        </Row>
        <WorkshopModal
          initialData={workshopForUpdate}
          loading={loading}
          visible={isWorkshopFormOpen}
          onCreate={onSubmit}
          onUpdate={onUpdate}
          onCancel={onCancel}
        />
      </Content>
    </>
  );
};

Workshops.getInitialProps = async ({
  res,
  req,
}: NextPageContext): Promise<{ initialWorkshops: IWorkshop[] } | unknown> => {
  const session = await getSession({ req });

  if (!session) {
    if (res) {
      res.writeHead(307, { Location: "/" }).end();
    }
  }

  const response = await fetch(
    `${process.env.URL || ""}/api/workshop?all=true`
  );

  if (response.ok) {
    const responseJSON: {
      workshops: IWorkshop[];
    } = await response.json();
    const { workshops } = responseJSON;
    return {
      initialWorkshops: workshops,
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
