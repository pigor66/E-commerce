import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Input, InputNumber, Row, UploadFile, notification, Modal } from 'antd';
import Upload, { UploadChangeParam } from 'antd/es/upload';
import TextArea from 'antd/es/input/TextArea';
import data from './../../Data/data.json'

interface IProps {
  setOpen: (value: boolean) => void
  open: boolean
  selectedItem?: any
}

type FieldType = {
  name: string;
  description?: string;
  price: number;
  date: string;
  picture: string[];
};


// Função para formatar valor como moeda brasileira
const formatCurrency = (value: number | null) => {
  if (value === null || isNaN(value)) {
    return '';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};


const ItemModal: React.FC<IProps> = (props: IProps) => {
  const modalRef = useRef<any>(null); // Referência para a modal

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [picture, setPicture] = useState<string>('');

  const [formattedPrice, setFormattedPrice] = useState<string>('');
  const [api, contextHolder] = notification.useNotification();




  const handleOk = () => {
    props.setOpen(false);
  };

  const handleCancel = () => {

    props.setOpen(false);
    if (modalRef.current) {
      modalRef.current.destroy();
    }
  };

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
      setPicture(src)
    }
  };



  const handleBlur = () => {
    if (formattedPrice !== '') {
      const numericValue = parseFloat(formattedPrice.replace(/[^\d.,]/g, '').replace(',', '.'));
      setPrice(isNaN(numericValue) ? null : numericValue);
      setFormattedPrice(formatCurrency(numericValue));
    } else {
      setPrice(null);
      setFormattedPrice('');
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

    setFileList([]);

    // Lógica de validação
    switch (true) {
      case (!values.name):
        openNotification('Falha ao cadastrar item - Nome', ' Por favor coloque um nome ao item!', 'error');
        break;
      case (values.price < 0):
        openNotification('Falha ao cadastrar item - Preço', ' Por favor coloque um valor ao item!', 'error');
        break;
      case (!values.picture.length):
        openNotification('Falha ao cadastrar item - Imagem', ' Por favor coloque uma imagem ao item!', 'error');
        break;
      default:


        const newItem = {
          id: data.products.length > 0 ? data.products[data.products.length - 1].id + 1 : 1, name: name,
          description: description,
          price: price !== null ? price : 0, // Defina o valor padrão como desejado
          date: new Date().toLocaleDateString(),
          picture: blobUrls,
          specifications: []
        }
        data.products.push(newItem)
        console.log(newItem);
        console.log(values);


        openNotification(`Item cadastrado com sucesso!`, `${values.name} foi cadastrado!`, 'success');
        break;
    }

  };


  return (
    <>
      <Modal
        open={props.open}
        title="Cadastrar novo produto"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          layout="vertical"
          initialValues={props.selectedItem}
        >
          {contextHolder}
          <Row gutter={[24, 0]}>
            <Col lg={16}>
              <Form.Item<FieldType> label="Nome do item" name="name">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>

            </Col>
            <Col lg={8}>
              <Form.Item<FieldType> label="Preço" name="price">
                {/* Input de texto para mostrar e permitir edição do valor formatado como moeda brasileira */}
                <Input
                  onBlur={handleBlur}
                  value={formattedPrice}
                  onChange={(e) => setFormattedPrice(e.target.value)}
                  style={{ width: '100%' }}
                />

                {/* InputNumber para manter o valor numérico para processamento adicional, se necessário */}
                <InputNumber
                  min={1}
                  onChange={(value) => setPrice(value as number | null)}
                  value={price}
                  style={{ display: 'none' }}  // Esconde o InputNumber, pois não será exibido na interface
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
                  onPreview={props.selectedItem ? props.selectedItem.picture[0] : onPreview}
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
      </Modal>
    </>
  );
};

export default ItemModal;