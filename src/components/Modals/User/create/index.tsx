/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Modal } from "../../Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuth } from "../../../../store/useAuth";
import { useUsers } from "../../../../hooks/useUsers";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const CreateUserModal = ({ isOpen, handleClose }: Props) => {
  const { user } = useAuth();
  const { register: userRegister } = useUsers();
  const formRef = useRef<HTMLFormElement>(null);

  const credentials = new FormData();
  const query = useQueryClient();

  const { mutateAsync, isLoading } = useMutation("newUser", userRegister, {
    onSuccess: (res) =>
      Promise.all([
        toast.success(res),
        query.invalidateQueries("users"),
        handleClose,
        reset(),
      ]),
  });

  const { handleSubmit, register, reset } = useForm();

  async function onSubmit(data: any) {
    credentials.append("name", data.name);
    credentials.append("email", data.email);
    credentials.append("cpf", data.cpf);
    credentials.append("cr", data.cr);
    credentials.append("password", data.password);
    credentials.append("confirmPassword", data.confirmPassword);
    if (user?.admin || user?.founder) credentials.append("admin", data.admin);
    if (user?.founder) credentials.append("founder", data.founder);
    credentials.append("profile-pic", data["profile-pic"][0]);
    await mutateAsync(credentials);
  }

  return (
    <Modal
      show={isOpen}
      hidden={() => {
        handleClose();
        reset();
      }}
      title="Criar novo usuário"
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Nome do Usuário:</label>
          <input
            {...register("name")}
            type="text"
            placeholder="John Doe"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">E-mail do Usuário:</label>
          <input
            {...register("email")}
            type="email"
            placeholder="exemplo@email.com.br"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">CPF do Usuário:</label>
          <input
            {...register("cpf")}
            type="text"
            placeholder="19192350780"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">CR do Usuário:</label>
          <input
            {...register("cr")}
            type="text"
            placeholder="12554477741"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Senha do Usuário:</label>
          <input
            {...register("password")}
            type="password"
            placeholder="*********"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Confirmar Senha:</label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="*********"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2 items-center">
            <label className="text-nowrap">Fundador:</label>
            <input
              {...register("founder")}
              defaultChecked={false}
              disabled={!user?.founder}
              type="checkbox"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-nowrap">Administrador:</label>
            <input
              {...register("admin")}
              defaultChecked={false}
              disabled={!user?.admin && !user?.founder}
              type="checkbox"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Foto de Perfil: </label>
          <input
            {...register("profile-pic")}
            type="file"
            accept="image/*"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>
      </form>
      <div className="flex justify-between gap-2">
        <button
          onClick={() => {
            handleClose();
            reset();
          }}
          className="w-full bg-red-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-red-600 ease-linear duration-100"
        >
          Cancelar
        </button>
        <button
          onClick={() => formRef.current?.requestSubmit()}
          className="flex gap-2 items-center justify-center w-full bg-blue-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-blue-600 ease-linear duration-100"
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
    </Modal>
  );
};

export { CreateUserModal };
