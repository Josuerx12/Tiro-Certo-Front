import { BsExclamationCircle } from "react-icons/bs";
import { Modal } from "../../modal";
import { useMutation, useQueryClient } from "react-query";
import { IClub } from "../../../../interfaces/IClub";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useClub } from "../../../../hooks/useClub";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  club: IClub;
};

const DeleteClubModal = ({ isOpen, handleClose, club }: Props) => {
  const { deleteOne } = useClub();

  const query = useQueryClient();

  const { isLoading, mutateAsync } = useMutation("deleteClub", deleteOne, {
    onSuccess: () =>
      Promise.all([handleClose(), query.invalidateQueries("clubs")]),
  });

  return (
    <Modal show={isOpen} hidden={handleClose} title={`Deletar Clube:`}>
      <div className="flex flex-col justify-center items-center gap-6">
        <BsExclamationCircle className="text-[20rem] text-yellow-400" />
        <p className="text-red-700 font-bold text-2xl text-center">
          Tem certeza que deseja excluir o usuário -{" "}
          <span className="text-black">{club.name}</span>?
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
          onClick={async () => await mutateAsync(club._id)}
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

export default DeleteClubModal;
