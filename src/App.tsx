// AppLayout.js
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Space } from 'antd';
import { ControlOutlined, HomeOutlined, ShoppingOutlined } from '@ant-design/icons/lib/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from './logo.png';
import CartProvider from './context/cartContext';
const { Sider, Header, Content, Footer } = Layout;

const menuItems = [
  {
    key: 'store',
    icon: React.createElement(ShoppingOutlined),
    label: 'Loja',
    to: '/',
  },
  {
    key: 'dashboard',
    icon: React.createElement(ControlOutlined),
    label: 'Painel de controle',
    to: '/admin',
  },
];

const AppLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  const [title, setTitle] = useState<string>()

  useEffect(() => {
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    setTitle(lastPart);
  }, [path]);

  return (
    <Layout style={{ height: '100vh' }} >
      <Sider breakpoint="lg" collapsedWidth="0" width={300} style={{ backgroundColor: '#fcfcfc' }}>
        <Space direction='vertical' style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Space direction='vertical' >
            <div style={{ padding: '0rem', display: 'flex', justifyContent: "center" }}>
              <img src={logo} alt="Logo" style={{ width: '100%' }} />
            </div>
            <Menu theme='light' mode="inline" defaultSelectedKeys={['store']} style={{ padding: '0rem 1rem', backgroundColor: '#fcfcfc' }}>
              {menuItems.map(item => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.to}>{item.label}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Space>
          <Footer style={{ backgroundColor: '#fcfcfc', color: '#000000', textAlign: 'center' }}>
            ©{new Date().getFullYear()} Created by Higor Ribeiro
          </Footer>
        </Space>
      </Sider>
      <Layout style={{ backgroundColor: '#f0f1f1' }} >
        <Header style={{ padding: 0, background: '#fff', }}>
          <Space style={{ fontSize: '1.5rem', justifyContent: 'center', display: 'flex' }}>  {title === '' ? "Marketplace" : 'Dashboard'}</Space>
        </Header>
        <Content style={{ margin: '24px 16px 10px', backgroundColor: "#fff", padding: '1rem', display: 'flex:', justifyContent: 'center', overflowY: 'auto' }}>
          <CartProvider>
            <Outlet />
          </CartProvider>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
