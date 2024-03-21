import { FaPen, FaTrash } from "react-icons/fa";
import { IClub } from "../../../../interfaces/IClub";
import { Modal } from "../../Modal";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  club: IClub;
};

const ClubDetailModal = ({ isOpen, handleClose, club }: Props) => {
  return (
    <Modal show={isOpen} hidden={handleClose} title={`Detalhes do Clube`}>
      <div className="flex-1">
        <div className="flex gap-3 flex-wrap">
          <img
            className="w-40 h-40 md:w-80 md:h-80 rounded-lg shadow shadow-gray-300"
            src={club.logoURL ? club.logoURL : "noImage.jpg"}
            alt={club.name}
          />

          <div className="flex-1 flex  flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="font-bold text-violet-950 text-2xl">
                Dados do Clube
              </h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-violet-800 hover:bg-violet-600 ease-in-out duration-100 px-2 py-1 rounded text-white">
                  <FaPen /> Editar
                </button>
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 ease-in-out duration-100  px-2 py-1 rounded text-white">
                  <FaTrash /> Excluir
                </button>
              </div>
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-32">Nome:</label>
                <input
                  type="text"
                  disabled
                  defaultValue={club.name}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-32">CNPJ:</label>
                <input
                  type="text"
                  disabled
                  defaultValue={club.cnpj}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-32">CR:</label>
                <input
                  type="text"
                  disabled
                  defaultValue={club.cr}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-32">
                  Cadastrado:
                </label>
                <input
                  type="text"
                  disabled
                  value={new Date(club.createdAt).toLocaleString("pt-BR")}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-32">
                  Atualizado:
                </label>
                <input
                  type="text"
                  disabled
                  value={new Date(club.updatedAt).toLocaleString("pt-BR")}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { ClubDetailModal };
