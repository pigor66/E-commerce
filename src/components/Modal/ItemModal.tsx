import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import ItemForm from '../ItemForm/ItemForm';

interface IProps {
  setOpen: (value: boolean) => void
  open: boolean
  editItem?: any
}
const ItemModal: React.FC<IProps> = (props: IProps) => {
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<any>(null); // Referência para a modal

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
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
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[

        ]}
      >
        <ItemForm editItem={props.editItem} onClose={handleCancel} handleOk={handleOk} />
      </Modal>
    </>
  );
};

export default ItemModal;