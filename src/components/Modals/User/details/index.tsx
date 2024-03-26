import { IUser } from "../../../../interfaces/IUser";
import { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useAuth } from "../../../../store/useAuth";
import { useForm } from "react-hook-form";
import { useUsers } from "../../../../hooks/useUsers";
import { useMutation, useQueryClient } from "react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import DeleteUserModal from "../delete";
import { Modal } from "../../Modal";
type Props = {
  isOpen: boolean;
  handleCloseModal: () => void;
  user: IUser;
};

type EditCredentials = {
  ["profile-pic"]: FileList;
  name: string;
  email: string;
  cpf: string;
  cr: string;
  password: string;
  confirmPassword: string;
};

const UserDetail = ({ isOpen, handleCloseModal, user }: Props) => {
  const { user: userLogged } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const { editOne } = useUsers();

  const query = useQueryClient();

  const { handleSubmit, register, reset } = useForm<EditCredentials>();
  const credentials = new FormData();

  const { isLoading, mutateAsync } = useMutation("editUser", editOne, {
    onSuccess: () =>
      Promise.all([
        reset(),
        handleCloseModal(),
        query.invalidateQueries("users"),
        setIsEditing(false),
        setIsChangingPassword(false),
      ]),
  });

  async function onSubmit(data: EditCredentials) {
    if (data["profile-pic"])
      credentials.append("profile-pic", data["profile-pic"][0]);
    if (data.name && data.name !== user.name)
      credentials.append("name", data.name);
    if (data.email && data.email !== user.email)
      credentials.append("email", data.email);
    if (data.cpf && data.cpf !== user.cpf) credentials.append("cpf", data.cpf);
    if (data.cr && data.cr !== user.cr) credentials.append("cr", data.cr);
    if (data.password) credentials.append("password", data.password);
    if (data.confirmPassword) {
      credentials.append("confirmPassword", data.confirmPassword);
    }
    mutateAsync({ id: user._id, credentials });
  }

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

            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" w-full flex flex-col gap-4"
            >
              {isEditing && (
                <div className="flex flex-wrap items-center gap-3">
                  <label className="font-bold text-violet-950 text-nowrap w-24">
                    Nova foto:
                  </label>
                  <input
                    {...register("profile-pic")}
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
                  {...register("name")}
                  disabled={!isEditing}
                  defaultValue={user.name}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-24">Email:</label>
                <input
                  {...register("email")}
                  type="text"
                  disabled={!isEditing}
                  defaultValue={user.email}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-24">CPF:</label>
                <input
                  {...register("cpf")}
                  type="text"
                  disabled={!isEditing}
                  defaultValue={user.cpf}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-24">CR:</label>
                <input
                  {...register("cr")}
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
                      type="password"
                      placeholder="********"
                      {...register("password")}
                      disabled={!isEditing}
                      className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 w-full">
                    <label className="font-bold text-violet-950 text-nowrap">
                      Confirmar senha:
                    </label>
                    <input
                      {...register("confirmPassword")}
                      type="password"
                      disabled={!isEditing}
                      placeholder="********"
                      className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full"
                    />
                  </div>
                </div>
              )}
              {isEditing && (
                <div className="flex justify-between gap-2">
                  <button
                    disabled={isLoading}
                    onClick={() => {
                      setIsEditing((prev) => !prev);
                      setIsChangingPassword(false);
                    }}
                    className="w-full bg-red-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-red-600 ease-linear duration-100"
                  >
                    Cancelar
                  </button>
                  <button
                    disabled={isLoading}
                    className="flex justify-center items-center gap-1 w-full bg-blue-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-blue-600 ease-linear duration-100"
                  >
                    {isLoading ? (
                      <>
                        Salvando
                        <AiOutlineLoading3Quarters className="animate-spin duration-1000000 " />
                      </>
                    ) : (
                      <>Salvar</>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { UserDetail };
