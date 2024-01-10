import React, { useState } from 'react';
import { Button, Drawer, FloatButton } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const Car: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FloatButton type='primary' onClick={showDrawer} icon={<ShoppingCartOutlined />}
        badge={{ count: 10, color: 'red' }}
      />

      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Car;
