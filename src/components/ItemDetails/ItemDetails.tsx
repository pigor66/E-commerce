import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Space, Image } from 'antd';
import { formatPriceBRL } from '../../pages/Home/Dashboard';

interface IProps {
  data: any;
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

  useEffect(() => {
    console.log(props.data);
  }, [open]);

  return (
    <>
      <Button type='link' onClick={() => setOpen(true)}>
        Ver produto
      </Button>

      <Modal
        visible={open}
        title={props?.data?.name}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Card style={{ width: '100%' }}>
          <Image
            alt="picture item"
            src={props?.data?.picture[0]}
            width={'100%'} />
          <Space direction='vertical'>
            <p>{props?.data?.description}</p>
          </Space>
          <Space direction='vertical'>
            <Button> Comprar por: {formatPriceBRL(props?.data?.price)}</Button>
          </Space>
        </Card>
      </Modal>
    </>
  );
};

export default ItemDetails;
