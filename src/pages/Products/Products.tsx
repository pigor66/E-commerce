import { Row, Col, Space, Button, Card, notification, Typography } from 'antd';
import items from './../../Data/data.json';
import ItemDetails from '../../components/ItemDetails/ItemDetails';
import Meta from 'antd/es/card/Meta';
import { formatPriceBRL } from '../Home/Dashboard';
import Car from '../../components/Car/car';
const { Title, Paragraph } = Typography;

function Products() {
  const [api, contextHolder] = notification.useNotification();

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
          {items.products.map((item: any) => (
            <Col span={24} md={12} lg={8} key={item.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                cover={
                  <div style={{ backgroundImage: `url('${item.picture}')`, width: '100%', height: '15rem', backgroundSize: "cover", backgroundPosition: "center" }} >
                  </div>
                }
                actions={
                  [
                    <ItemDetails data={item} addToCar={addToCar} openNotification={openNotification} />
                  ]

                }

              >
                <Space direction='vertical' style={{ width: '100%' }}>
                  <Space direction='vertical'>
                    <Title level={4} style={{ margin: "0" }}>
                      {item?.name}
                    </Title>
                  </Space>
                  <Button key="buy" onClick={() => {
                    addToCar(item)
                  }}>{formatPriceBRL(item.price)}</Button>
                </Space>
                <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>
                  {item.description && item.description.length > 100
                    ? `${item.description.slice(0, 100)}...`
                    : item.description}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
      <Car />
    </Row>
  );
}

export default Products;
