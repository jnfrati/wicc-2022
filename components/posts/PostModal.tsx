/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Form, Input, Modal, ModalProps, Select, Upload } from "antd";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/lib/upload/interface";
import firebase from "../../utils/firebase_connection";
import { IPost } from "../../models/post.model";
import useWorkshops from "../../hooks/useWorkshops";

interface IPostModalProps extends ModalProps {
  initialData: IPost;
  loading: boolean;
  onCreate: (values?: unknown) => void;
  // onFinishFailed?: (values?: unknown) => void;
  onUpdate: (values?: unknown) => void;
  onCancel: () => void;
}

const PostModal = ({
  loading,
  initialData,
  visible,
  onCreate,
  onUpdate,
  onCancel,
  ...rest
}: IPostModalProps): JSX.Element => {
  const [form] = Form.useForm();
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(undefined);
  const [pdfFile, setPdfFile] = useState(undefined);
  const [audioFile, setAudioFile] = useState(undefined);
  const { workshops, getWorkshops } = useWorkshops();
  const [isPDFButtonDisabled, setPDFButtonDisabled] = useState(false);
  const [isAudioButtonDisabled, setAudioButtonDisabled] = useState(false);

  const onOk = async () => {
    await form.validateFields();
    const title = form.getFieldValue("title");
    const description = form.getFieldValue("description");
    const author_name = form.getFieldValue("author_name");
    const article_id = form.getFieldValue("article_id");
    if (!initialData) {
      onCreate({
        title,
        description,
        pdf: pdfFile,
        audio: audioFile,
        workshop_id: selectedWorkshopId,
        article_id,
        author: {
          name: author_name,
        },
      });
      return;
    }
    onUpdate({
      _id: initialData._id,
      title,
      description,
      pdf: pdfFile,
      audio: audioFile,
      workshop_id: selectedWorkshopId,
      article_id,
      author: {
        name: author_name,
      },
    });
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({ title: initialData.title });
      form.setFieldsValue({ description: initialData.description });
      form.setFieldsValue({ workshop: initialData.workshop });
      setPDFButtonDisabled(Boolean(initialData.pdf));
      setAudioButtonDisabled(Boolean(initialData.audio));
      form.setFieldsValue({ article_id: initialData.article_id });
      form.setFieldsValue({ author_name: initialData.author.name });
    }
  }, [form, initialData]);

  useEffect(() => {
    if (!visible) {
      setPdfFile(undefined);
      setAudioFile(undefined);
      setPDFButtonDisabled(false);
      setAudioButtonDisabled(false);
      form.resetFields();
    }
  }, [form, visible]);

  useEffect(() => {
    if (!workshops.length) {
      getWorkshops();
    }
  }, [workshops, getWorkshops]);

  return (
    visible && (
      <Modal
        title={!initialData ? "Crear publicacion" : "Actualizar publicacion"}
        visible={visible}
        okText={!initialData ? "Crear" : "Actualizar"}
        onOk={onOk}
        onCancel={() => !loading && onCancel()}
        okButtonProps={{ loading }}
        cancelButtonProps={{ disabled: loading }}
        {...rest}
      >
        <Form form={form} name="post-form" layout="vertical">
          <Form.Item
            label="Titulo"
            name="title"
            rules={[
              {
                required: true,
                message: "Ingresá un título",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ID del Artículo"
            name="article_id"
            rules={[
              {
                required: true,
                message: "Ingresá el ID del artículo",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Autor"
            name="author_name"
            rules={[
              {
                required: true,
                message: "Ingresá el nombre del autor",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Descripción" name="description">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            name="workshop"
            label="Workshop"
            rules={[
              {
                required: true,
                message: "Seleccioná un workshop",
              },
            ]}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Selecciona una workshop"
              optionFilterProp="children"
              onChange={(val) => setSelectedWorkshopId(val)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {workshops?.length &&
                workshops.map((cat) => (
                  <Select.Option key={cat._id} value={cat._id}>
                    {cat.title}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="pdf" label="PDF">
            <Upload
              name="pdf"
              multiple={false}
              onChange={(e) => {
                if (!e?.fileList[0]?.originFileObj) {
                  setPdfFile(undefined);
                }
                setPDFButtonDisabled(Boolean(e?.fileList[0]?.originFileObj));
              }}
              defaultFileList={
                initialData?.pdf && [
                  {
                    name: initialData?.pdf?.fileName,
                    url: initialData?.pdf.fileLocation,
                  } as UploadFile,
                ]
              }
              accept=".pdf"
              customRequest={({ file, onError, onProgress, onSuccess }) => {
                // @ts-ignore
                const ref = firebase.storage().ref().child(file.name);

                const task = ref.put(file as Blob);
                task.on(
                  firebase.storage.TaskEvent.STATE_CHANGED,
                  (snapshot) => {
                    const progress = Math.round(
                      (100 * snapshot.bytesTransferred) / snapshot.totalBytes
                    );
                    onProgress({
                      percent: progress,
                    } as never);
                  },
                  onError,
                  () => {
                    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                      onSuccess(downloadURL, file as never);
                      setPdfFile({
                        // @ts-ignore
                        fileName: file.name,
                        fileLocation: downloadURL,
                      });
                    });
                  }
                );
              }}
            >
              <Button
                disabled={Boolean(pdfFile) || isPDFButtonDisabled}
                icon={<UploadOutlined />}
              >
                Subir PDF
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item name="audio" label="Audio">
            <Upload
              name="audio"
              onChange={(e) => {
                if (!e?.fileList[0]?.originFileObj) {
                  setAudioFile(undefined);
                }
                setAudioButtonDisabled(Boolean(e?.fileList[0]?.originFileObj));
              }}
              defaultFileList={
                initialData?.audio && [
                  {
                    name: initialData?.audio?.fileName,
                    url: initialData?.audio.fileLocation,
                  } as UploadFile,
                ]
              }
              accept=".mp3"
              customRequest={({ file, onError, onProgress, onSuccess }) => {
                // @ts-ignore
                const ref = firebase.storage().ref().child(file.name);

                const task = ref.put(file as Blob);
                task.on(
                  firebase.storage.TaskEvent.STATE_CHANGED,
                  (snapshot) => {
                    const progress = Math.round(
                      (100 * snapshot.bytesTransferred) / snapshot.totalBytes
                    );
                    onProgress({
                      percent: progress,
                    } as never);
                  },
                  onError,
                  () => {
                    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                      onSuccess(downloadURL, file as never);
                      setAudioFile({
                        // @ts-ignore
                        fileName: file.name,
                        fileLocation: downloadURL,
                      });
                    });
                  }
                );
              }}
            >
              <Button
                disabled={Boolean(audioFile) || isAudioButtonDisabled}
                icon={<UploadOutlined />}
              >
                Subir audio
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    )
  );
};

export default PostModal;
