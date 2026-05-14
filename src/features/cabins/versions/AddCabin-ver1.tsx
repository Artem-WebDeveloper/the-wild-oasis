import { useState } from 'react';
import Button from '../../../ui/Button';
import Modal from '../../../ui/Modal-ver1';
import CreateCabinForm from './CreateCabinForm-ver1';

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal(prev => !prev)}>Add New cabin</Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm /* onCloseModal={() => setIsOpenModal(false)} */ />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
