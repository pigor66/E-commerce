// Dashboard.tsx
import { useEffect, useState } from 'react';
import { Col, List, Row, Space, Typography, Button, Card, Carousel, Popconfirm, message, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQueryClient } from 'react-query';
import formatPriceBRL from '../../utils/DashboardUtils';
import { Product, ProductSelected } from '../../hooks/types';
import { deleteProduct } from '../../hooks/useProductsServices';
import { useProducts } from '../../hooks/useGetProducts';
import Filters from '../../components/Filters/Filters';
import { useNavigate } from 'react-router-dom';
import VirtualList from 'rc-virtual-list';

const { Title, Paragraph } = Typography;

function Dashboard() {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { data: products, error, isLoading } = useProducts();
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<ProductSelected[]>([]);


  useEffect(() => {
    if (selectedFilter === 'date') {
      const itemsArray = products.filter((item: ProductSelected) => searchValue === item.date)
      setFilteredProducts(itemsArray);
    }
    if (selectedFilter === 'name') {
      const itemsArray = products.filter((item: ProductSelected) => searchValue === item.name)
      setFilteredProducts(itemsArray);
    }
    if (selectedFilter === 'price') {
      const itemsArray = products.filter((item: ProductSelected) => parseFloat(searchValue) === item.price)
      setFilteredProducts(itemsArray);
    }

    console.log(filteredProducts);

  }, [searchValue, selectedFilter]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = async (id: number | undefined) => {
    try {
      if (id !== undefined) {
        await deleteProduct(id);
        message.success('Produto excluído com sucesso!');
        queryClient.invalidateQueries('products');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error(`Falha ao excluir produto`);
    }
  };

  if (isLoading) {
    return (
      <div style={{ marginTop: '10rem' }}>
        <Spin tip="Carregando..." size="large">
          <div className="content" />
        </Spin>
      </div>
    );
  }

  if (error) {
    return <p>Ocorreu um erro ao obter os dados</p>;
  }

  return (
    <Row gutter={[24, 24]}>
      <Col>
        <Button type="primary" onClick={() => navigate('/produto/novo')} icon={<PlusOutlined />} style={{ padding: '0 0.5rem ' }} >Adicionar novo produto</Button>
      </Col>
      <Col span={24}>
        <Space direction='vertical'>
          <Title level={5} style={{ margin: 0, width: '4rem' }}>Filtros:</Title>
          <Filters
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            products={products}
            selectedFilter={selectedFilter}
          />
        </Space>
      </Col>
      <Col span={24}>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          products ? (
            <List>
              <VirtualList
                data={filteredProducts[0] ? filteredProducts : products}
                height={800}
                itemHeight={47}
                itemKey={(item) => (item?.id ? item.id.toString() : '')}
              >
                {(item: Product) => (
                  <List.Item key={item.id} style={{ width: '100%' }}>
                    <Card style={{ width: '100%' }}>
                      <Row gutter={[24, 24]} style={{ width: '100%' }}>
                        <Col lg={4} md={12} span={24}>
                          <Carousel>
                            {item.picture.map((pictures: string) => (
                              <div key={pictures}>
                                <div style={{ backgroundImage: `url('${pictures}')`, width: '100%', height: '15rem', backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: 'no-repeat' }} />
                              </div>
                            ))}
                          </Carousel>
                        </Col>
                        <Col lg={18} md={24} span={24} style={{ display: 'flex', alignItems: "center" }}>
                          <Space direction='vertical' size='small' style={{ width: '100%' }}>
                            <Title level={4} style={{ margin: 0 }}>{item.name}</Title>
                            <Title level={5} style={{ margin: 0 }}>{formatPriceBRL(item.price)}</Title>
                            <Paragraph style={{ margin: 0, maxWidth: '80rem' }}>{item.description}</Paragraph>
                            <Space style={{ width: '100%' }}>
                              <Button block onClick={() => navigate(`/produto/${item.id}`)} icon={<EditOutlined />}>Editar</Button>
                              <Popconfirm
                                title={`Tem certeza que deseja excluir "${item.name}" da lista de produtos?`}
                                onConfirm={() => handleDelete(item.id)}
                                okText="Confirmar"
                                cancelText="Cancelar"
                              >
                                <Button block danger icon={<DeleteOutlined />} >
                                  Excluir
                                </Button>
                              </Popconfirm>
                            </Space>
                          </Space>
                        </Col>
                      </Row>
                    </Card>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          ) : (
            <Typography.Text>Nenhum produto encontrado com os filtros selecionados.</Typography.Text>
          )
        )}
      </Col>
    </Row>
  );
}

export default Dashboard;
