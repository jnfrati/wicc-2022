import React, { useEffect } from "react";
import { Form, Input, message, Modal, ModalProps, Switch } from "antd";
import { IWorkshop } from "../../models/workshop.model";

interface IWorkshopModal extends ModalProps {
  initialData: IWorkshop;
  loading: boolean;
  onCreate: (values?: unknown) => void;
  onFinishFailed?: (values?: unknown) => void;
  onUpdate: (values?: unknown) => void;
}

const WorkshopModal = ({
  initialData,
  loading,
  visible = false,
  onUpdate,
  onCreate,
  onCancel,
  ...rest
}: IWorkshopModal): JSX.Element => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      await form.validateFields();
      const params = {
        title: form.getFieldValue("title"),
        discord_link: form.getFieldValue("discord_url"),
        discord_title: form.getFieldValue("discord_title"),
        enable_discord: form.getFieldValue("enable_discord"),
        enable_comments: form.getFieldValue("enable_comments"),
      };
      if (initialData?._id) {
        onUpdate({ _id: initialData?._id, ...params });
        return;
      }
      onCreate({ ...params });
    } catch (error) {
      message.error(
        "No se puede crear el workshop, por favor verifique los valores"
      );
    }
  };

  useEffect(() => {
    if (!visible && form?.resetFields) {
      form.resetFields();
    }
  }, [form, visible]);

  useEffect(() => {
    if (initialData?._id && form?.setFieldsValue) {
      form.setFieldsValue({ title: initialData.title });
      form.setFieldsValue({ discord_url: initialData.discord_link });
      form.setFieldsValue({ discord_title: initialData.discord_title });
      form.setFieldsValue({ enable_discord: initialData.enable_discord });
      form.setFieldsValue({ enable_comments: initialData.enable_comments });
    }
  }, [form, initialData]);

  return (
    <Modal
      title={!initialData ? "Crear workshop" : "Actualizar workshop"}
      visible={visible}
      okText={!initialData ? "Crear" : "Actualizar"}
      onOk={onSubmit}
      onCancel={(e) => !loading && onCancel(e)}
      okButtonProps={{ loading }}
      cancelButtonProps={{ disabled: loading }}
      {...rest}
    >
      <Form form={form} name="workshop-form" layout="vertical">
        <Form.Item
          label="Titulo"
          name="title"
          rules={[
            {
              required: true,
              message: "El titulo del workshop es requerido!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Titulo de link de discord" name="discord_title">
          <Input />
        </Form.Item>
        <Form.Item
          label="Discord url"
          name="discord_url"
          rules={[
            {
              // eslint-disable-next-line no-useless-escape
              pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
              message: "Ingresá una url valida",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Habilitar link de discord"
          name="enable_discord"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label="Habilitar comentarios"
          name="enable_comments"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default WorkshopModal;
