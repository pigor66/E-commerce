import React, { useState } from 'react';
import { Button, Card, Modal, Space, Image } from 'antd';
import ItemForm from '../ItemForm/ItemForm';
import { EditOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';

interface IProps {
  data: any
}
const ItemDetails: React.FC<IProps> = (props: IProps) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type='link' onClick={() => setOpen(true)}>
        Ver produto
      </Button>
      <Modal
        open={open}
        title={props.data.title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[

        ]}
      >
        <Card
          style={{ width: '100%' }}
          cover={
            <Image
              alt="picture item"
              src={props.data.picture}
              width={'100%'}
            />
          }
        >
          <Space direction='vertical'>
            <p>{props.data.description}</p>

          </Space>
        </Card>
      </Modal>
    </>
  );
};

export default ItemDetails;