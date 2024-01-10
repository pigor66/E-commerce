// AppLayout.js
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Space } from 'antd';
import { ControlOutlined, HomeOutlined } from '@ant-design/icons/lib/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Sider, Header, Content, Footer } = Layout;

const menuItems = [
  {
    key: 'dashboard',
    icon: React.createElement(ControlOutlined),
    label: 'Dashboard',
    to: '/',
  },
  {
    key: 'store',
    icon: React.createElement(HomeOutlined),
    label: 'Loja',
    to: '/produtos',
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
    <Layout style={{ height: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0" >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} style={{ padding: '1rem', paddingTop: '4rem' }} >
          {menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout style={{ overflowY: 'auto' }}>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Space style={{ fontSize: '1.5rem', justifyContent: 'center', display: 'flex' }}>  {title === 'produtos' ? "Marketplace" : 'Dashboard'}</Space>
        </Header>
        <Content style={{ margin: '24px 16px 0', backgroundColor: "#fff", padding: '1rem', }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
