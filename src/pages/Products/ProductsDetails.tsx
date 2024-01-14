import { Row, Col, Space, notification, Typography, Carousel, Spin, Image, Statistic, } from 'antd';

import { formatPriceBRL } from '../Home/Dashboard';
import Car from '../../components/Car/car';
import data from './../../Data/data.json'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { Title, Paragraph } = Typography;

function ProductsDetails() {
  const [api, contextHolder] = notification.useNotification();
  const id = useParams()
  const [selectedItem, setSelectedItem] = useState<any>('');
  const [item, setItem] = useState<any>('');

  function openNotification(title: string, description: string, type: 'success' | 'error') {
    api[type]({
      message: title,
      description: description,
    });
  };

  function addToCar(item: any) {
    openNotification('Adicionado ao seu carrinho', `O item ${item.name} foi adicionado ao carrinho`, 'success')
  }

  useEffect(() => {
    const findItem = data.products.find((item: any) => item.id !== id)
    setSelectedItem(findItem)
  }, [])

  return (
    <Row gutter={[24, 24]} justify={'center'} style={{ marginTop: '2rem' }}>
      {contextHolder}
      {
        selectedItem ?
          <Col span={24} lg={23} >
            <Carousel >
              {selectedItem?.picture?.map((pictures: string) => {
                return (
                  <div key={pictures}>
                    <div style={{ backgroundImage: `url('${pictures}')`, width: '100%', height: '50vh', backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: 'no-repeat' }} >
                    </div>
                  </div>
                )
              })}
            </Carousel>
            <Space direction='vertical' style={{ marginTop: '2rem' }}>
              <Space direction='vertical' style={{ width: '100%' }}>
                <Title level={4} style={{ margin: "0" }}>
                  {selectedItem?.name}
                </Title>
                {formatPriceBRL(selectedItem?.price)}
              </Space>
              <Title level={4} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>
                {selectedItem?.description}
              </Title>
              <Car />
              <Row gutter={[24, 0]}>
                {selectedItem?.specifications.map((specification: any) => {
                  return (
                    <Col span={12}>
                      <Space direction='vertical'>
                        <Title level={4}>{specification?.attribute}</Title>
                        <Title level={5} style={{ color: 'greey', margin: '0' }}>{specification?.value}</Title>
                      </Space>
                    </Col>
                  )
                })}
              </Row>
            </Space>
          </Col>
          :
          <Spin size='large' />

      }
    </Row >
  );
}

export default ProductsDetails;
