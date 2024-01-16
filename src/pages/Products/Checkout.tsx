import { Form, Row, Col, Input, Button, Space, notification, Typography, Card, Carousel, List, Divider } from "antd";
import VirtualList from 'rc-virtual-list';
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartContext";
import formatPriceBRL from "../../utils/DashboardUtils";

const { Title, Paragraph } = Typography;

const useSearchAddress = (postalCode: string) => {
  return useQuery(['address', postalCode], async () => {
    const response = await fetch(`https://viacep.com.br/ws/${postalCode}/json/`);
    const data = await response.json();
    return data;
  });
};

const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification();
  const [postalCode, setPostalCode] = useState<string>('');
  const contextValue = useContext(CartContext);

  const { data: addressData, isLoading, isError } = useSearchAddress(postalCode);

  useEffect(() => {
    if (addressData) {
      console.log('Endereço:', addressData);
    }

    if (isError) {
      console.error('Erro ao buscar o endereço:', isError);
    }
  }, [addressData, isError]);

  const handleSearchAddress = () => {
    // Não é necessário chamar useSearchAddress aqui, pois ele já está sendo chamado automaticamente pelo hook
    // Basta setar o código postal, e o hook será acionado automaticamente
    setPostalCode(postalCode);
  };

  const openNotification = (title: string, description: string, type: 'success' | 'error') => {
    api[type]({
      message: title,
      description,
    });
  };

  const onFinish = async (values: any) => {

    contextValue?.clearCart()
    openNotification('Pedido Feito com sucesso', 'O seu pedido esta sendo processado', "success")
    setTimeout(() => {
      navigate('/')
    }, 2000);
  };

  return (
    <Row justify={'center'} gutter={[24, 24]} style={{ marginTop: '3rem' }}>
      <Col lg={20} span={24}>
        <Form name="basic" onFinish={onFinish} layout="vertical">
          <Title level={4} >
            Endereço:
          </Title>
          {contextHolder}
          <Row gutter={[24, 0]}>

            <Col lg={24}>
              <Form.Item label="Digite seu CEP" name="name" initialValue={postalCode} rules={[{ required: true, message: 'Por favor, insira o CEP!' }]}>
                <Space>
                  <Input type="number" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} style={{ width: '10rem' }} />
                  <Button onClick={handleSearchAddress}>
                    Pesquisar
                  </Button>
                </Space>
              </Form.Item>
            </Col>
            {addressData ?
              <>
                <Col lg={8}>
                  <Form.Item label="Rua" name="street" initialValue={addressData.logradouro} >
                    <Input defaultValue={addressData.logradouro} />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item label="Bairro" name="neighborhood" initialValue={addressData.bairro} >
                    <Input defaultValue={addressData.bairro} />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item label="Cidade" name="city" initialValue={addressData.localidade} >
                    <Input defaultValue={addressData.localidade} />
                  </Form.Item>
                </Col>
                <Col lg={6}>
                  <Form.Item label="UF" name="uf" initialValue={addressData.uf} >
                    <Input defaultValue={addressData.uf} />
                  </Form.Item>
                </Col>
                <Col lg={12}>
                  <Form.Item label="Complemento" name="complemet" >
                    <Input />
                  </Form.Item>
                </Col>
              </> :
              null
            }
          </Row>
          <Form.Item>
            <Space>
              <Button onClick={() => navigate(-1)} >
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" disabled={addressData ? false : true}>
                Finalizar pedido
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
      <Divider />
      {contextValue?.cart ?
        <Col lg={20} span={24}>
          <List>
            <VirtualList
              data={contextValue?.cart}
              height={800}
              itemHeight={47}
              itemKey="id" // <-- Alterado para uma propriedade única do seu item, como 'id'
            >
              {(item: any) => (
                <List.Item key={item.id} style={{ width: '100%' }}>
                  <Card style={{ width: '100%' }}>
                    <Row gutter={[24, 24]} style={{ width: '100%' }}>
                      <Col span={12} >
                        <Carousel>
                          {item.picture.map((pictures: string) => (
                            <div key={pictures}>
                              <div style={{ backgroundImage: `url('${pictures}')`, width: '100%', height: '15rem', backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: 'no-repeat' }} />
                            </div>
                          ))}
                        </Carousel>
                      </Col>
                      <Col span={12} style={{ display: 'flex', alignItems: "center" }}>
                        <Space direction='vertical' size='small' style={{ width: '100%' }}>
                          <Title level={4} style={{ margin: 0 }}>
                            {item.name}
                          </Title>
                          <Title level={5} style={{ margin: 0 }}>
                            Valor: {formatPriceBRL(item.price)}
                          </Title>
                          <Paragraph style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>
                            {item.description && item.description.length > 100
                              ? `${item.description.slice(0, 100)}...`
                              : item.description}
                          </Paragraph>
                          <Space style={{ width: '100%' }}>
                            <Button block danger type='primary' onClick={() => contextValue.removeItemToCart(item)}>Remover</Button>
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
        :
        null
      }

    </Row>
  );
}

export default Checkout;
