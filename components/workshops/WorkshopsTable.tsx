/* eslint-disable react/display-name */
import React from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { IWorkshop } from "../../models/workshop.model";

interface IWorkshopsTableProps {
  data?: IWorkshop[];
  onUpdate: (_id: string) => void;
  onDelete: (_id: string) => void;
}

const WorkshopsTable = ({
  data = [],
  onUpdate,
  onDelete,
}: IWorkshopsTableProps): JSX.Element => {
  const updateWorkshop = (_id) => onUpdate(_id);
  const deleteWorkshop = (_id) => onDelete(_id);

  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: "25%",
    },
    {
      title: "Publicaciones",
      key: "posts",
      render: (record): number => record.posts?.length || 0,
      width: "15%",
    },
    {
      title: "Acciones",
      key: "_id",
      render: (record): JSX.Element => (
        <Space size="middle">
          <Button
            onClick={() => updateWorkshop(record._id)}
            type="link"
            role="button"
          >
            Actualizar
          </Button>
          <Popconfirm
            title="¿Quieres borrar el workshop?"
            onConfirm={() => deleteWorkshop(record._id)}
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

export default WorkshopsTable;
