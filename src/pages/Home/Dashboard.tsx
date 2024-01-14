import { Col, List, Row, Space, Typography, Button, Card, Spin, Popconfirm, message, Carousel } from 'antd';
import { useState } from 'react';
import ItemModal from '../../components/Modal/ItemModal';
import VirtualList from 'rc-virtual-list';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
const { Title, Paragraph } = Typography;

export function formatPriceBRL(value: number) {
  if (isNaN(value)) {
    return 'Valor inválido';
  }
  const formatValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return formatValue;
}

export function DeleteItem(item: any) {
  const confirm = () => {
    console.log();
    message.success('Click on Yes');
  };

  const cancel = () => {
    console.log();
    message.error('Click on No');
  };

  return (

    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button danger>Delete</Button>
    </Popconfirm>

  )



}


function Dashboard() {
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Adicionei null como valor inicial


  const { data, isLoading, isError } = useQuery('products', () =>
    fetch('https://65a04dee600f49256fafd1ae.mockapi.io/products').then((res) => res.json())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }



  const showModal = () => {
    setOpenNew(true);
  };


  function editItem(item: any) {
    setSelectedItem(item)
    setOpenNew(true)
  }



  return (

    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space >
          <ItemModal setOpen={setOpenNew} open={openNew} />
          <Button type="primary" onClick={showModal} shape='round' icon={<PlusOutlined />} style={{ padding: '0 0.5rem ' }} />

        </Space>
      </Col>
      <Col span={24}>
        {data ?
          <List>
            <VirtualList
              data={data}
              height={800}
              itemHeight={47}
              itemKey="email"
            >
              {(item: any) => (
                <List.Item key={item.id} style={{ width: '100%' }}>
                  <Card style={{ width: '100%' }}>
                    <Row gutter={[24, 24]} style={{ width: '100%' }}>
                      <Col lg={4} md={12} span={24} >
                        <Carousel >
                          {item.picture.map((pictures: string) => {
                            return (
                              <div key={pictures}>
                                <div style={{ backgroundImage: `url('${pictures}')`, width: '100%', height: '15rem', backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: 'no-repeat' }} >
                                </div>
                              </div>
                            )
                          })}
                        </Carousel>
                      </Col>

                      <Col lg={18} md={24} span={24} style={{ display: 'flex', alignItems: "center" }}>
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
                            <Button block type='primary' onClick={() => editItem(item)}>Editar</Button>
                            <DeleteItem item={item} />                          </Space>
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>

              )}
            </VirtualList>
          </List>
          :
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '50vh' }}>
            <Spin size="large" />
          </div>
        }

      </Col>
      <ItemModal setOpen={setOpen} open={open} selectedItem={selectedItem} />
    </Row>
  );
}

export default Dashboard;
