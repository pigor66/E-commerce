import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Image, Card, Collapse, Space } from 'antd';
import ItemDetails from '../ItemDetails/ItemDetails';
import items from './../../items/items.json'

const { Meta } = Card;

interface IProps {
  setOpen: (value: boolean) => void
  setEditItem: (value: any) => void
  item: any
}

export default function ItemCard(props: IProps) {

  function editItem() {
    props.setEditItem(props.item);
    props.setOpen(true);
  }
  return (
    <Card
      style={{ width: '100%', padding: '0' }}
      cover={
        <img
          alt="picture item"
          src={props.item.picture}
          height={250}
          width={'100%'}
        />
      }
      actions={[
        <EditOutlined key="edit" onClick={() => editItem()} />,
        <ItemDetails data={props} />,
      ]}
    >
      <Meta
        title={props.item.title}
      />
    </Card>
  );
}



