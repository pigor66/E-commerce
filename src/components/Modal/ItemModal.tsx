import React, { useRef, useState } from 'react';
import { Modal } from 'antd';
import ItemForm from '../ItemForm/ItemForm';

interface IProps {
  setOpen: (value: boolean) => void
  open: boolean
  editItem?: any
}
const ItemModal: React.FC<IProps> = (props: IProps) => {
  const modalRef = useRef<any>(null); // Referência para a modal

  const handleOk = () => {
    setTimeout(() => {
      props.setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    props.setOpen(false);
    if (modalRef.current) {
      modalRef.current.destroy();
    }
  };

  return (
    <>
      <Modal
        open={props.open}
        title="Cadastrar novo produto"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <ItemForm editItem={props.editItem} onClose={handleCancel} handleOk={handleOk} />
      </Modal>
    </>
  );
};

export default ItemModal;