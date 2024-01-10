import { useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Row, UploadFile, notification } from 'antd';
import Upload, { UploadChangeParam } from 'antd/es/upload';
import TextArea from 'antd/es/input/TextArea';

type FieldType = {
  name: string;
  description?: string;
  price: number;
  date: string;
  picture: string[];
};

interface IProps {
  editItem: any;
  onClose: () => void;
  handleOk: () => void
}

export default function ItemForm(props: IProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(1); // Inicializado com 1 para evitar problemas de formatação inicial
  const [api, contextHolder] = notification.useNotification();

  function openNotification(title: string, description: string, type: 'success' | 'error') {
    api[type]({
      message: title,
      description: description,
    });
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;

    if (!src && file.originFileObj) {
      const blob = new Blob([file.originFileObj as Blob]);
      src = URL.createObjectURL(blob);
    }
  };

  const onChange = ({ fileList: newFileList }: UploadChangeParam<UploadFile>) => {
    setFileList(newFileList);
  };

  const onFinish = (values: FieldType) => {

    const blobUrls = fileList.map((file) => {
      if (file.url) {
        return file.url;
      } else {
        const blob = new Blob([file.originFileObj as Blob]);
        return URL.createObjectURL(blob);
      }
    });

    values.date = new Date().toLocaleDateString()
    localStorage.setItem('temporaryImageBlobUrls', JSON.stringify(blobUrls));
    values.picture = blobUrls;

    setFileList([]);

    // Lógica de validação
    switch (true) {
      case (!values.name):
        openNotification('Falha ao cadastrar item - Nome', ' Por favor coloque um nome ao item!', 'error');
        break;
      case (!values.price):
        openNotification('Falha ao cadastrar item - Preço', ' Por favor coloque um valor ao item!', 'error');
        break;
      case (!values.picture.length):
        openNotification('Falha ao cadastrar item - Imagem', ' Por favor coloque uma imagem ao item!', 'error');
        break;
      default:
        openNotification(`Item cadastrado com sucesso!`, `${values.name} foi cadastrado!`, 'success');
        break;
    }
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        name: props?.editItem?.name,
        description: props?.editItem?.description,
        picture: props?.editItem?.picture || [],
      }}
      autoComplete="off"
    >
      {contextHolder}
      <Row gutter={[24, 0]}>
        <Col lg={16}>
          <Form.Item<FieldType> label="Nome do item" name="name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

        </Col>
        <Col lg={8}>
          <Form.Item<FieldType> label="Preço" name="price" >
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              formatter={(value) => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              defaultValue={price}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item<FieldType> label="Descrição" name="description">
            <TextArea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>
        </Col>
        <Col lg={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Item<FieldType> label="Imagens" name="picture">
            <Upload
              listType="picture-card"
              maxCount={1}
              fileList={fileList}
              onChange={onChange}
              onPreview={props.editItem ? props.editItem.picture[0] : onPreview}
            >
              + Adicionar
            </Upload>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Salvar novo item
        </Button>
      </Form.Item>
    </Form >
  );
}
