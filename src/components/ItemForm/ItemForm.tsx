import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, UploadFile } from 'antd';
import Upload, { RcFile, UploadChangeParam } from 'antd/es/upload';
import TextArea from 'antd/es/input/TextArea';
import NotificationComponent from '../Notification/notification';

type FieldType = {
  name: string;
  description?: string;
  price: number;
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
  const [price, setPrice] = useState<number | string>(1); // Inicializado com 1 para evitar problemas de formatação inicial



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

    localStorage.setItem('temporaryImageBlobUrls', JSON.stringify(blobUrls));

    values.picture = blobUrls;
    console.log('Success:', values);

    // Limpar lista de arquivos após o envio bem-sucedido
    setFileList([]);

    // Lógica de validação
    switch (true) {
      case (!values.name):
        NotificationComponent('Falha ao cadastrar item - Nome', ' Por favor coloque um nome ao item!', 'error');
        break;
      case (!values.price):
        NotificationComponent('Falha ao cadastrar item - Preço', ' Por favor coloque um valor ao item!', 'error');
        break;
      case (!values.picture.length):
        NotificationComponent('Falha ao cadastrar item - Imagem', ' Por favor coloque uma imagem ao item!', 'error');
        break;
      default:
        NotificationComponent(`Item cadastrado com sucesso!`, `${values.name} foi cadastrado!`, 'success');
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
        price: props?.editItem?.price || 1,
        picture: props?.editItem?.picture || [],
      }}
      autoComplete="off"
    >
      <Form.Item<FieldType> label="Nome do item" name="name">
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Item>
      <Form.Item<FieldType> label="Descrição" name="description">
        <TextArea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Item>
      <Form.Item<FieldType> label="Preço" name="price">
        <InputNumber
          min={1}
          style={{ width: '8rem' }}
          formatter={(value) => `R$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          value={price}
          onChange={(value) => setPrice(value || 1)}
        />
      </Form.Item>
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
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
