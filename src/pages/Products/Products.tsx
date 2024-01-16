// Products.tsx
import React from 'react';
import { Row, Col, Card, Space, Typography, Carousel, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useGetProducts';
import Cart from '../../components/Cart/cart';
import { useCartDispatch } from '../../context/cartContext';

const { Title, Paragraph } = Typography;

function Products() {
  const { data: products, error, isLoading } = useProducts();
  const dispatch = useCartDispatch();

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

  const addToCart = (productId: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product: { id: productId, name: 'Product Name', price: 10.0 } } });
  };

  return (
    <Row gutter={[24, 24]} justify="center" style={{ marginTop: '2rem' }}>
      <Col span={24} lg={23} style={{ display: 'flex', justifyContent: 'center' }}>
        <Row gutter={[24, 24]} style={{ width: '100%' }}>
          {products.map((item: any) => (
            <Col span={24} md={12} lg={8} key={item.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                style={{ width: '100%' }}
                hoverable
                cover={
                  <Carousel style={{ cursor: 'default' }}>
                    {item.picture.map((pictures: string) => (
                      <div key={pictures}>
                        <div
                          style={{
                            backgroundImage: `url('${pictures}')`,
                            width: '100%',
                            height: '15rem',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                          }}
                        />
                      </div>
                    ))}
                  </Carousel>
                }
                actions={[
                  <Button onClick={() => addToCart(item.id)}>Adicionar ao carrinho</Button>,
                  <Link to={`/produto/detalhes/${item.id}`}>Ver detalhes</Link>
                ]}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Title level={4} style={{ margin: '0' }}>
                    {item?.name}
                  </Title>
                  <Title level={5} style={{ margin: '0' }}>
                    {item.price}
                  </Title>
                </Space>
                <Paragraph style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>
                  {item.description && item.description.length > 100
                    ? `${item.description.slice(0, 100)}...`
                    : item.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Col >
      <Cart />
    </Row >
  );
}

export default Products;
