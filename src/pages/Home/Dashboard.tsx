import { Image, Col, List, Row, Space, Typography, Button, Divider, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import ItemModal from '../../components/Modal/ItemModal';
import items from './../../Data/data.json';
import VirtualList from 'rc-virtual-list';
const { Title, Paragraph } = Typography;

export function formatPriceBRL(valor: number) {
  // Verifica se o valor é um número
  if (isNaN(valor)) {
    return 'Valor inválido';
  }

  // Formata o valor como moeda
  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);

  return valorFormatado;
}

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [editItem, setEditItem] = useState(null); // Adicionei null como valor inicial

  const showModal = () => {
    setOpenNew(true);
  };

  return (

    <Row gutter={[24, 24]}>

      <Col span={24}>
        <Space>
          <ItemModal setOpen={setOpenNew} open={openNew} />
          <Button type="primary" onClick={showModal}>
            Novo item
          </Button>
        </Space>
      </Col>
      <Col span={24}>
        <List>
          <VirtualList
            data={items.products}
            height={800}
            itemHeight={47}
            itemKey="email"
          >
            {(item: any) => (
              <List.Item key={item.id} style={{ width: '100%' }}>
                <Card style={{ width: '100%' }}>
                  <Row gutter={[24, 24]} style={{ width: '100%' }}>
                    <Col lg={4} md={12} span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Image width={'100%'} height={'auto'} src={item.picture[0]} />
                    </Col>

                    <Col lg={18} md={24} span={24}>
                      <Space direction='vertical' size='small' style={{ width: '100%' }}>
                        <Title level={4} style={{ margin: 0 }}>
                          {item.name}
                        </Title>
                        <Title level={5} style={{ margin: 0 }}>
                          Valor: {formatPriceBRL(item.price)}
                        </Title>
                        <Paragraph style={{ margin: 0, maxWidth: '80rem' }}>
                          {item.description}
                        </Paragraph>
                        <Space style={{ width: '100%' }}>
                          <Button block type='primary'>Editar</Button>
                          <Button type='primary' danger>Excluir</Button>
                        </Space>
                      </Space>
                    </Col>

                  </Row>
                </Card>
              </List.Item>

            )}
          </VirtualList>
        </List>

      </Col>
      <ItemModal setOpen={setOpen} open={open} editItem={editItem} />
    </Row>

  );
}

export default Dashboard;
