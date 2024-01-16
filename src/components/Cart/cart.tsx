import React, { useContext, useState } from 'react';
import { Button, Card, Carousel, Col, Drawer, FloatButton, List, Row, Space, Spin, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import formatPriceBRL from '../../utils/DashboardUtils';
import { CartContext } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const contextValue = useContext(CartContext);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FloatButton type='primary' onClick={showDrawer} icon={<ShoppingCartOutlined />}
        badge={{ count: contextValue?.cart.length, color: 'red' }}
      />
      <Drawer title="Carrinho" placement="right" onClose={onClose} open={open}>
        <Row gutter={[24, 24]} style={{ paddingBottom: '2rem' }}>
          <Col span={24}>
            {contextValue?.cart.length ?
              <List>
                <VirtualList
                  data={contextValue.cart}
                  height={800}
                  itemHeight={47}
                  itemKey="id" // <-- Alterado para uma propriedade única do seu item, como 'id'
                >
                  {(item: any) => (
                    <List.Item key={item.id} style={{ width: '100%' }}>
                      <Card style={{ width: '100%' }}>
                        <Row gutter={[24, 24]} style={{ width: '100%' }}>
                          <Col span={24} >
                            <Carousel>
                              {item.picture.map((pictures: string) => (
                                <div key={pictures}>
                                  <div style={{ backgroundImage: `url('${pictures}')`, width: '100%', height: '15rem', backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: 'no-repeat' }} />
                                </div>
                              ))}
                            </Carousel>
                          </Col>
                          <Col span={24} style={{ display: 'flex', alignItems: "center" }}>
                            <Space direction='vertical' size='small' style={{ width: '100%' }}>
                              <Title level={4} style={{ margin: 0 }}>
                                {item.name}
                              </Title>
                              <Title level={5} style={{ margin: 0 }}>
                                Valor: {formatPriceBRL(item.price)}
                              </Title>
                              <Paragraph style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>
                                {item.description && item.description.length > 100
                                  ? `${item.description.slice(0, 100)}...`
                                  : item.description}
                              </Paragraph>
                              <Space style={{ width: '100%' }}>
                                <Button block danger type='primary' onClick={() => contextValue.removeItemToCart(item)}>Remover</Button>
                              </Space>
                            </Space>
                          </Col>
                        </Row>
                      </Card>
                    </List.Item>
                  )}
                </VirtualList>
              </List>
              :
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50vh' }}>
                <Title level={4} style={{ margin: 0 }}>
                  Carrinho vazio
                </Title>
              </div>
            }
          </Col>
        </Row>
        <Button block type='primary' onClick={() => navigate('/revisao')} disabled={contextValue?.cart.length ? false : true}>{contextValue?.cart.length ? 'Continuar' : 'Sem itens no carrinho'}</Button>
      </Drawer>
    </>
  );
};

export default Cart;
