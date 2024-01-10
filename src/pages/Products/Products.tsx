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
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space>
          <ItemModal setOpen={setOpen} open={open} />
          <Button type="primary" onClick={showModal}>
            Novo item
          </Button>
        </Space>
      </Col>
      {items.data.map((item: any) => (
        <Col lg={4} key={item.id}>
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
