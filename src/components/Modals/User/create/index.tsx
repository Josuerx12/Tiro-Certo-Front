import { Modal } from "../../Modal";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const CreateUserModal = ({ isOpen, handleClose }: Props) => {
  return (
    <Modal show={isOpen} hidden={handleClose} title="Criar novo usuário">
      <h3>teste</h3>
    </Modal>
  );
};

export { CreateUserModal };
