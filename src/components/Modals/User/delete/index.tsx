import { BsExclamationCircle } from "react-icons/bs";
import { IUser } from "../../../../interfaces/IUser";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { useUsers } from "../../../../hooks/useUsers";
import { Modal } from "../../Modal";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  user: IUser;
};

const DeleteUserModal = ({ isOpen, handleClose, user }: Props) => {
  const { deleteOne } = useUsers();
  const query = useQueryClient();
  const { isLoading, mutateAsync } = useMutation("deleteUser", deleteOne, {
    onSuccess: () =>
      Promise.all([handleClose(), query.invalidateQueries("users")]),
  });
  return (
    <Modal show={isOpen} hidden={handleClose} title={`Deletar Usuário:`}>
      <div className="flex flex-col justify-center items-center gap-6">
        <BsExclamationCircle className="text-[20rem] text-yellow-400" />
        <p className="text-red-700 font-bold text-2xl text-center">
          Tem certeza que deseja excluir o usuário -{" "}
          <span className="text-black">{user.name}</span>?
        </p>
      </div>

      <div className="flex justify-between gap-2">
        <button
          onClick={handleClose}
          className="w-full bg-gray-500 p-2 rounded font-semibold tracking-wider text-white hover:bg-gray-400 ease-linear duration-100"
        >
          Cancelar
        </button>
        <button
          onClick={async () => await mutateAsync(user._id)}
          disabled={isLoading}
          className="flex gap-2 items-center justify-center w-full bg-red-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-red-600 ease-linear duration-100"
        >
          {isLoading ? (
            <>
              Deletando
              <AiOutlineLoading3Quarters className="animate-spin duration-1000000 " />
            </>
          ) : (
            <>Deletar</>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
