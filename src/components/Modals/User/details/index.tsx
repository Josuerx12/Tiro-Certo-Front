import { IUser } from "../../../../interfaces/IUser";
import { useState } from "react";
import { Modal } from "../../Modal";
import { FaPen, FaTrash } from "react-icons/fa";
import DeleteUserModal from "../Delete";
import { useAuth } from "../../../../store/useAuth";

type Props = {
  isOpen: boolean;
  handleCloseModal: () => void;
  user: IUser;
};

const UserDetail = ({ isOpen, handleCloseModal, user }: Props) => {
  const { user: userLogged } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  return (
    <Modal
      show={isOpen}
      title="Perfil do Usuário"
      hidden={() => {
        handleCloseModal();
        setIsEditing(false);
        setIsChangingPassword(false);
      }}
    >
      <DeleteUserModal
        isOpen={isDeleting}
        handleClose={() => setIsDeleting((prev) => !prev)}
        user={user}
      />
      <div className="flex-1 bg-white flex flex-col gap-4 rounded-lg px-4 py-3">
        <div className="flex flex-1 gap-6 text-black flex-wrap justify-between">
          <img
            className="w-40 h-40 md:w-80 md:h-80 mx-auto rounded-lg shadow shadow-gray-300"
            src={user.photoURL ? user.photoURL : "/noImage.jpg"}
            alt="foto de perfil"
          />
          <div className="w-full flex flex-col gap-5 basis-96 flex-1">
            <div className="flex justify-between gap-5">
              <h3 className="font-bold text-violet-950 text-2xl">
                Dados do Usuário
              </h3>
              {!isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing((prev) => !prev)}
                    className="flex items-center gap-2 bg-violet-800 hover:bg-violet-600 ease-in-out duration-100 px-2 py-1 rounded text-white"
                  >
                    <FaPen /> Editar
                  </button>
                  {userLogged?.founder && (
                    <button
                      onClick={() => setIsDeleting((prev) => !prev)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-500 ease-in-out duration-100  px-2 py-1 rounded text-white"
                    >
                      <FaTrash /> Excluir
                    </button>
                  )}
                </div>
              )}
            </div>

            <form className=" w-full flex flex-col gap-4">
              {isEditing && (
                <div className="flex flex-wrap items-center gap-3">
                  <label className="font-bold text-violet-950 text-nowrap w-24">
                    Nova foto:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="flex flex-wrap flex-grow"
                  />
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-24">Nome:</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue={user.name}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-24">Email:</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue={user.email}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-24">CPF:</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue={user.cpf}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-24">CR:</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  defaultValue={user.cr}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsChangingPassword((prev) => !prev)}
                  className="bg-blue-950 hover:bg-blue-800 ease-linear duration-100 px-3 py-2 rounded text-white w-fit"
                >
                  {isChangingPassword
                    ? "Cancelar Troca de Senha"
                    : "Trocar Senha"}
                </button>
              )}
              {isChangingPassword && (
                <div className="flex gap-3 flex-wrap">
                  <div className="flex flex-wrap items-center justify-between gap-3 w-full">
                    <label className="font-bold text-violet-950 text-nowrap">
                      Nova senha:
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      defaultValue={user.cr}
                      className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 w-full">
                    <label className="font-bold text-violet-950 text-nowrap">
                      Confirmar senha:
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      defaultValue={user.cr}
                      className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full"
                    />
                  </div>
                </div>
              )}
            </form>
            {isEditing && (
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => {
                    setIsEditing((prev) => !prev);
                    setIsChangingPassword(false);
                  }}
                  className="w-full bg-red-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-red-600 ease-linear duration-100"
                >
                  Cancelar
                </button>
                <button className="w-full bg-blue-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-blue-600 ease-linear duration-100">
                  Salvar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { UserDetail };
