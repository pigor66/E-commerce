import { Row, Col, Space, Button, Card, notification } from 'antd';
import { useState } from 'react';
import ItemModal from '../../components/Modal/ItemModal';
import items from './../../items/items.json';
import { EditOutlined } from '@ant-design/icons';
import ItemDetails from '../../components/ItemDetails/ItemDetails';
import Meta from 'antd/es/card/Meta';
import { formatPriceBRL } from '../Home/Dashboard';

function Products() {
  const [open, setOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const showModal = () => {
    setOpen(true);
  };
  function handleEditItem() {
    setOpen(true);
  }

  function openNotification(title: string, description: string, type: 'success' | 'error') {
    api[type]({
      message: title,
      description: description,
    });
  };
  return (
    <Row gutter={[24, 24]} style={{ width: '100%' }} >
      {contextHolder}
      <Col span={24}>
        <Space>
          <ItemModal setOpen={setOpen} open={open} />
          <Button type="primary" onClick={showModal}>
            Novo item
          </Button>
        </Space>
      </Col>
      {items.data.map((item: any) => (
        <Col span={24} md={12} lg={6} key={item.id} >
          <Card
            style={{ width: '100%', padding: '0' }}
            cover={
              <img
                alt="picture item"
                src={item.picture}
                height={230}
                width={'100%'}
              />
            }
            actions={[
              <Button key="edit" onClick={() => {
                openNotification('Adicionado ao seu carrinho', `O item ${item.name} foi adicionado ao carrinho`, 'success')
              }}> Comprar por: {formatPriceBRL(item.price)}</Button>,
              <ItemDetails data={item} />,
            ]}
          >
            <Meta
              title={item?.name}
              description={formatPriceBRL(item.price)}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Products;
