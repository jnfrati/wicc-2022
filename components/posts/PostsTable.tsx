/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React from "react";
import { Space, Button, Popconfirm, Table } from "antd";
import { IPost } from "../../models/post.model";

interface IPostsTableProps {
  data?: IPost[];
  onUpdate: (_id: string) => void;
  onDelete: (_id: string) => void;
}

const PostsTable = ({
  data = [],
  onUpdate,
  onDelete,
}: IPostsTableProps): JSX.Element => {
  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "ID del Artículo",
      dataIndex: "article_id",
      key: "article_id",
      width: "15%",
    },
    {
      title: "Autor",
      dataIndex: "author",
      key: "author",
      width: "15%",
      render: (author) => author.name,
    },
    {
      title: "PDF",
      key: "pdf",
      render: (record) => (
        <a href={record?.pdf?.fileLocation} rel="noreferrer" target="_blank">
          {record?.pdf?.fileName}
        </a>
      ),
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Audio",
      key: "audio",
      render: (record) => (
        <a href={record?.audio?.fileLocation} rel="noreferrer" target="_blank">
          {record?.audio?.fileName}
        </a>
      ),
      width: "15%",
      ellipsis: true,
    },
    {
      title: "Acciones",
      key: "_id",
      render: (record: { _id: string }): JSX.Element => (
        <Space size="middle">
          <Button
            onClick={() => onUpdate(record._id)}
            type="link"
            role="button"
          >
            Actualizar
          </Button>
          <Popconfirm
            title="¿Quieres borrar la publicación?"
            onConfirm={() => onDelete(record._id)}
            okText="Eliminar"
            cancelText="No"
          >
            <Button type="link" role="button">
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: "23%",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ y: 400 }}
    />
  );
};

export default PostsTable;
