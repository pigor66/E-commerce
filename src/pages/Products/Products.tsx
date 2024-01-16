// Products.tsx
import React, { useContext } from 'react';
import { Row, Col, Card, Space, Typography, Carousel, Spin, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useGetProducts';
import Cart from '../../components/Cart/cart';
import formatPriceBRL from '../../utils/DashboardUtils';
import { CartContext } from '../../context/cartContext';

const { Title, Paragraph } = Typography;

function Products() {
  const navigate = useNavigate()
  const { data: products, error, isLoading } = useProducts();
  const contextValue = useContext(CartContext);

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
                  <Row gutter={[24, 24]} justify={'center'}>
                    <Col span={11}>
                      <Button type='primary' block onClick={() => contextValue?.addItemToCart(item)}>
                        Comprar
                      </Button>
                    </Col>
                    <Col span={11}>
                      <Button block onClick={() => navigate(`/produto/detalhes/${item.id}`)}>
                        Ver detalhes
                      </Button>
                    </Col>
                  </Row>
                ]}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Title level={4} style={{ margin: '0' }}>
                    {item?.name}
                  </Title>
                  <Title level={5} style={{ margin: '0' }}>
                    {formatPriceBRL(item.price)}
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
