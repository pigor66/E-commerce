// Dashboard.tsx
import React, { useState } from 'react';
import { Col, List, Row, Space, Typography, Button, Card, Carousel, Popconfirm, message, Spin } from 'antd';
import VirtualList from 'rc-virtual-list';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from 'react-query';
import formatPriceBRL from '../../utils/DashboardUtils';
import { Product } from '../../hooks/types';
import { getProducts, deleteProduct } from '../../hooks/useProductsServices';
import { useProducts } from '../../hooks/useGetProducts';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

function Dashboard() {
  const navigate = useNavigate()

  const queryClient = useQueryClient();

  const { data: products, error, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div style={{ marginTop: '10rem' }}>
        <Spin tip="Carregando..." size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  if (error) {
    return <p>Ocorreu um erro ao obter os dados</p>;
  }



  const handleDelete = async (id: number | undefined) => {
    try {
      if (id !== undefined) {
        await deleteProduct(id);
        message.success('Produto excluído com sucesso!');
        queryClient.invalidateQueries('products');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error(`Falha ao excluir produto`);
    }
  };


  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space>
          <Button type="primary" onClick={() => navigate('/produto/novo')} shape="round" icon={<PlusOutlined />} style={{ padding: '0 0.5rem ' }} />
        </Space>
      </Col>
      <Col span={24}>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          products ? (
            <List>
              <VirtualList
                data={products}
                height={800}
                itemHeight={47}
                itemKey={(item) => (item?.id ? item.id.toString() : '')}
              >
                {(item: Product) => (
                  <List.Item key={item.id} style={{ width: '100%' }}>
                    <Card style={{ width: '100%' }}>
                      <Row gutter={[24, 24]} style={{ width: '100%' }}>
                        <Col lg={4} md={12} span={24}>
                          <Carousel>
                            {item.picture.map((pictures: string) => (
                              <div key={pictures}>
                                <div style={{ backgroundImage: `url('${pictures}')`, width: '100%', height: '15rem', backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: 'no-repeat' }} />
                              </div>
                            ))}
                          </Carousel>
                        </Col>
                        <Col lg={18} md={24} span={24} style={{ display: 'flex', alignItems: "center" }}>
                          <Space direction='vertical' size='small' style={{ width: '100%' }}>
                            <Title level={4} style={{ margin: 0 }}>{item.name}</Title>
                            <Title level={5} style={{ margin: 0 }}>Valor: {formatPriceBRL(item.price)}</Title>
                            <Paragraph style={{ margin: 0, maxWidth: '80rem' }}>{item.description}</Paragraph>
                            <Space style={{ width: '100%' }}>
                              <Button block type='primary' onClick={() => navigate(`/produto/${item.id}`)}>Editar</Button>
                              <Popconfirm
                                title={`Tem certeza que deseja excluir "${item.name}" da lista de produtos?`}
                                onConfirm={() => handleDelete(item.id)}
                                okText="Confirmar"
                                cancelText="Cancelar"
                              >
                                <Button block danger icon={<DeleteOutlined />} >
                                  Excluir
                                </Button>
                              </Popconfirm>
                            </Space>
                          </Space>
                        </Col>
                      </Row>
                    </Card>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          ) : (
            // Caso products seja undefined, você pode renderizar uma mensagem ou outro componente aqui
            <Typography.Text>Lista de produtos vazia.</Typography.Text>
          )
        )}
      </Col>
    </Row>
  );
}

export default Dashboard;
