import { Row, Col, Space, Button } from 'antd';
import ItemCard from '../../components/itemCard/itemCard';
import { useEffect, useState } from 'react';
import ItemModal from '../../components/Modal/ItemModal';
import items from './../../items/items.json';

function Products() {
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null); // Adicionei null como valor inicial

  const showModal = () => {
    setOpen(true);
  };

  return (
    <Row gutter={[24, 24]} style={{ width: '100%' }}>
      <Col span={24}>
        <Space>
          <ItemModal setOpen={setOpen} open={open} />
          <Button type="primary" onClick={showModal}>
            Novo item
          </Button>
        </Space>
      </Col>
      {items.data.map((item: any) => (
        <Col span={24} md={12} lg={8} xl={8} key={item.id} style={{ display: 'flex', justifyContent: 'center' }}>
          <ItemCard
            setOpen={setOpen}
            item={item}
            setEditItem={setEditItem}
          />
        </Col>
      ))}
    </Row>
  );
}

export default Products;
