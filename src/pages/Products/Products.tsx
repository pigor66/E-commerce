import { Row, Col, Space, Button, Card, notification, Typography, Carousel, Image } from 'antd';
import ItemDetails from '../../components/ItemDetails/ItemDetails';
import Meta from 'antd/es/card/Meta';
import { formatPriceBRL } from '../Home/Dashboard';
import Car from '../../components/Car/car';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import item from './../../Data/data.json'

const { Title, Paragraph } = Typography;

function Products() {
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>('');
  const navigate = useNavigate()
  const [data, setData] = useState(item.products);



  function openNotification(title: string, description: string, type: 'success' | 'error') {
    api[type]({
      message: title,
      description: description,
    });
  };

  function addToCar(item: any) {
    openNotification('Adicionado ao seu carrinho', `O item ${item.name} foi adicionado ao carrinho`, 'success')
  }

  return (
    <Row gutter={[24, 24]} justify={'center'} style={{ marginTop: '2rem' }}>
      <Col span={24} lg={23} style={{ display: 'flex', justifyContent: 'center' }}>
        <Row gutter={[24, 24]} style={{ width: '100%' }}  >
          {contextHolder}
          {data.map((item: any) => {
            return (
              <Col span={24} md={12} lg={8} key={item.id} style={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  style={{ width: '100%' }}
                  hoverable
                  cover={
                    <Carousel >
                      {item.picture.map((pictures: string) => {
                        return (
                          <div key={pictures}>
                            <div style={{ backgroundImage: `url('${pictures}')`, width: '100%', height: '15rem', backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: 'no-repeat' }} >
                            </div>
                          </div>
                        )
                      })}
                    </Carousel>
                  }

                >
                  <div onClick={() => navigate(`/produto/${item.id}`)}
                    style={{ marginTop: '2rem' }}
                  >
                    <Space direction='vertical' style={{ width: '100%' }}>
                      <Title level={4} style={{ margin: "0" }}>
                        {item?.name}
                      </Title>
                      {formatPriceBRL(item.price)}
                    </Space>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>
                      {item.description && item.description.length > 100
                        ? `${item.description.slice(0, 100)}...`
                        : item.description}
                    </p>

                  </div>
                </Card>
              </Col>
            )
          })}
          <ItemDetails data={selectedItem} addToCar={addToCar} openNotification={openNotification}
            open={open} setOpen={setOpen} />
        </Row>
      </Col>
      <Car />
    </Row>
  );
}

export default Products;
