import { notification, Modal, Form, Row, Col, Input, Upload, Button, UploadFile } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState, useEffect } from "react";
import { Product } from "../../hooks/types";
import { addProduct, updateProduct } from "../../hooks/useProductsServices";
import { useProduct, useProducts } from "../../hooks/useGetProducts";
import service from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";



const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: selectedProduct } = useProduct(id ? id : '');

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [name, setName] = useState(selectedProduct ? selectedProduct.name : '');
  const [description, setDescription] = useState(selectedProduct ? selectedProduct.description : '');
  const [price, setPrice] = useState<number | null>(selectedProduct ? selectedProduct.price : null);
  const [formattedPrice, setFormattedPrice] = useState<string>(selectedProduct ? selectedProduct.price : '');
  const [api, contextHolder] = notification.useNotification();
  const { data: products, } = useProducts();

  useEffect(() => {
    setName(selectedProduct ? selectedProduct.name : '');
    setDescription(selectedProduct ? selectedProduct.description : '');
    setFormattedPrice(selectedProduct ? formatCurrency(selectedProduct.price) : '');
    setPrice(selectedProduct ? selectedProduct.price : null);

    setFileList(selectedProduct && selectedProduct.picture
      ? selectedProduct.picture.map((url: string, index: number) => ({
        uid: `${index}`,
        status: 'done',
        url,
      }))
      : []
    );



  }, [selectedProduct]);

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      openNotification('Erro', 'Você só pode fazer upload de imagens!', 'error');
    }
    return isImage;
  };

  const openNotification = (title: string, description: string, type: 'success' | 'error') => {
    api[type]({
      message: title,
      description,
    });
  };

  const onPreview = async (file: any) => {
    window.open(file.url, '_blank');
  };

  const handleBlur = () => {
    if (formattedPrice !== '') {
      const numericValue = parseFloat(formattedPrice.replace(/[^\d.,]/g, '').replace(',', '.'));
      const formattedCurrency = formatCurrency(numericValue);
      setFormattedPrice(formattedCurrency);
      setPrice(isNaN(numericValue) ? null : numericValue);
    } else {
      setPrice(null);
      setFormattedPrice('');
    }
  };
  const formatCurrency = (value: number | null) => {
    if (value !== null) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    }
    return '';
  };

  const onFinish = async (values: Product) => {
    try {
      const updatedFileList = await Promise.all(fileList.map(async (file) => {
        if (!file.url && file.originFileObj instanceof Blob) {
          const blobUrl = URL.createObjectURL(file.originFileObj);
          return { ...file, url: blobUrl };
        }
        return file;
      }));

      await Promise.all(updatedFileList.map(async (file) => {
        if (!file.url && file.originFileObj instanceof Blob) {
          const formData = new FormData();
          formData.append('image', file.originFileObj);

          const response = await service.post(`/products/${id}/images`, formData);
          const imageUrl = response.data.url;
          file.url = imageUrl;
        }
      }));

      const itemId = selectedProduct.id ? selectedProduct.id : products.length + 1;

      const newItem: Product = {
        id: itemId,
        name,
        description,
        price: price !== null ? price : 0,
        date: new Date().toLocaleDateString(),
        picture: updatedFileList.map((file) => file.url || ''),
        specifications: [],
      };

      if (id) {
        const updatedProduct = await updateProduct(itemId, newItem);
        openNotification('Produto atualizado com sucesso!', `${updatedProduct.name} foi atualizado!`, 'success');
        setTimeout(() => {
          navigate(-1)
        }, 1000);
      } else {
        const addedProduct = await addProduct(newItem);
        openNotification('Produto adicionado com sucesso!', `${addedProduct.name} foi cadastrado!`, 'success');
        setTimeout(() => {
          navigate(-1)
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      openNotification('Falha ao realizar a operação', 'Ocorreu um erro ao processar a operação.', 'error');
    }
  };



  return (

    <Row justify={'center'} style={{ marginTop: '3rem' }}>
      <Col lg={20} span={24}>
        <Form name="basic" onFinish={onFinish} layout="vertical">
          {contextHolder}
          <Row gutter={[24, 0]}>
            <Col lg={16}>
              <Form.Item label="Nome do item" name="name" initialValue={name} rules={[{ required: true, message: 'Por favor, insira o nome do item!' }]}>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item label="Preço" name="price" initialValue={price} rules={[{ min: 0, message: 'Por favor, insira um preço válido!' }]}>
                <Input
                  onBlur={handleBlur}
                  value={formattedPrice}
                  onChange={(e) => setFormattedPrice(e.target.value)}
                  style={{ width: '100%' }}
                  addonBefore="R$"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Descrição" name="description" initialValue={description}>
                <TextArea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Item>
            </Col>
            <Col lg={24} style={{ display: 'flex', justifyContent: 'center' }}>
              <Form.Item label="Imagens" name="picture" initialValue={fileList} rules={[{ required: true, message: 'Por favor, insira ao menos uma imagem!' }]}>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                  onPreview={onPreview}
                >
                  + Adicionar
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {selectedProduct ? 'Atualizar produto' : 'Salvar novo item'}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ProductForm;
