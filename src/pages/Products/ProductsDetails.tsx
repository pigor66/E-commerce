import { Row, Col, Space, notification, Typography, Carousel, Spin, Image, Statistic, Button, Table, } from 'antd';

import formatPriceBRL from '../../utils/DashboardUtils';
import Car from '../../components/Cart/cart';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Specification } from '../../hooks/types';
import { useProduct } from '../../hooks/useGetProducts';
import { CartContext } from '../../context/cartContext';
const { Title, Paragraph } = Typography;



type RouteParams = {
  id: string;
};
function ProductsDetails() {
  const [api, contextHolder] = notification.useNotification();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: selectedProduct, isLoading, error } = useProduct(id ? id : '');
  const contextValue = useContext(CartContext);


  const columns = [
    {
      title: 'Caractetisticas',
      dataIndex: 'attribute',
      key: 'attribute',
    },
    {
      title: 'Descrições',
      dataIndex: 'value',
      key: 'v',
    },

  ]

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
    <Row gutter={[24, 24]} justify={'center'} style={{ marginTop: '2rem' }}>
      {contextHolder}
      <Col span={24} lg={20} style={{ paddingBottom: '2rem' }}>
        <Row gutter={[24, 24]} justify={'center'} style={{ marginTop: '2rem' }}>
          <Col lg={12} span={24}>
            <Carousel>
              {selectedProduct?.picture?.map((pictures: string) => (
                <div key={pictures}>
                  <div
                    style={{
                      backgroundImage: `url('${pictures}')`,
                      width: '100%',
                      height: '50vh',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </Col>
          <Col lg={12} span={24}>
            <Space direction='vertical' style={{ marginTop: '2rem' }}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Title level={2} style={{ margin: '0' }}>
                  {selectedProduct?.name}
                </Title>
                <Title level={4} style={{ margin: '0' }}>

                  {contextValue?.cart.includes(selectedProduct) ?
                    <Button danger onClick={() => contextValue?.removeItemToCart(selectedProduct)} >Remover do carrinho {formatPriceBRL(selectedProduct?.price)}</Button>
                    :
                    <Button type='primary' onClick={() => contextValue?.addItemToCart(selectedProduct)} >
                      Adicionar ao carrinho {formatPriceBRL(selectedProduct?.price)}
                    </Button>
                  }

                </Title>
              </Space>
              <Title level={3} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>
                {selectedProduct?.description}
              </Title>
              <Car />

            </Space>
          </Col>
          <Col span={24}>
            <Table columns={columns} dataSource={selectedProduct?.specifications} />
            {/* <Row gutter={[24, 0]}>
              {selectedProduct?.specifications.map((specification: Specification) => (
                <Col span={24} lg={12} key={specification?.attribute}>
                  <Space direction='vertical'>
                    <Title level={4} style={{ marginBottom: '0rem' }}>
                      {specification?.attribute}
                    </Title>
                    <Title level={5} style={{ color: 'greey', margin: '0' }}>
                      {specification?.value}
                    </Title>
                  </Space>
                </Col>
              ))}
            </Row> */}
          </Col>
        </Row>


      </Col>

    </Row>
  );
}

export default ProductsDetails;
