import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Space, Image } from 'antd';
import { formatPriceBRL } from '../../pages/Home/Dashboard';

interface IProps {
  data: any;
  openNotification: (title: string, description: string, type: 'success' | 'error') => void
  addToCar: (value: any) => void
  setOpen: (value: boolean) => void
  open: boolean
}
const ItemDetails: React.FC<IProps> = (props: IProps) => {
  const [loading, setLoading] = useState(false);

  const handleOk = () => {

    props.setOpen(false);

  };

  const handleCancel = () => {
    props.setOpen(false);
  };



  return (
    <Modal
      visible={props.open}
      title={props?.data?.name}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      <Card style={{ width: '100%' }}>
        <Image
          alt="picture item"
          src={props?.data?.picture ? props?.data?.picture[0] : null}
          width={'100%'}
          height={'100%'} />
        <Space direction='vertical'>
          <p>{props?.data?.description}</p>
          <Button type='primary'
            onClick={() => {
              props.addToCar(props.data);
              props.setOpen(false)
            }}
          > Comprar por: {formatPriceBRL(props?.data?.price)}
          </Button>
        </Space>
      </Card>
    </Modal>

  );
};

export default ItemDetails;
