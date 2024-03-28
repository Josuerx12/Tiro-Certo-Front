/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useWeaponCategory } from "../../../../hooks/useWeaponCategory";
import { Modal } from "../../Modal";
import { ICategories } from "../../../../interfaces/ICategories";
import Select from "react-select";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useWeapons } from "../../../../hooks/useWeapons";
import toast from "react-hot-toast";
import { IUser } from "../../../../interfaces/IUser";
import { useUsers } from "../../../../hooks/useUsers";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const CreateWeaponModal = ({ isOpen, handleClose }: Props) => {
  const { reset, register, handleSubmit, setValue } = useForm();
  const { getAll } = useUsers();
  const { create } = useWeapons();
  const query = useQueryClient();
  const mutation = useMutation("newWeapon", create, {
    onSuccess: (res) =>
      Promise.all([
        query.invalidateQueries("acervo"),
        reset(),
        handleClose(),
        toast.success(res),
      ]),
    onError: () => {
      toast.error("Erro ao adicionar nova arma, verifique as credenciais!");
    },
  });

  const { Fetch } = useWeaponCategory();

  const { data, isLoading } = useQuery<ICategories[]>("categories", Fetch);
  const users = useQuery<IUser[]>("users", getAll);

  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(data: any) {
    await mutation.mutateAsync(data);
  }

  return (
    <Modal
      show={isOpen}
      hidden={() => {
        handleClose();
        reset();
      }}
      title="Adicionar novo armamento: "
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
        className="w-full flex flex-col gap-3"
      >
        <div className="flex flex-col gap-2 flex-grow">
          <label className="text-nowrap">Dono do armamento:</label>
          <Select
            options={users.data?.map((u) => ({
              value: u._id,
              label: u.name,
              image: u.photoURL ? u.photoURL : "/noImage.jpg",
            }))}
            required
            isDisabled={isLoading}
            placeholder="Selecione um usuário!"
            formatOptionLabel={({ label, image }) => (
              <div className="flex items-center gap-3">
                {image && (
                  <img src={image} alt={label} className="w-14 h-14 rounded" />
                )}
                {label}
              </div>
            )}
            onChange={(e) => setValue("ownerId", e?.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Marca: </label>
          <input
            {...register("brand")}
            type="text"
            required
            placeholder="Ex. Taurus"
            className="rounded border-2 border-gray-100 outline-orange-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Modelo da Arma: </label>
          <input
            required
            {...register("model")}
            placeholder="Ex. G2C"
            className="rounded border-2 border-gray-100 outline-orange-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Calibre da Arma: </label>
          <input
            {...register("caliber")}
            type="text"
            required
            placeholder="Ex. 9mm"
            className="rounded border-2 border-gray-100 outline-orange-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <label className="text-nowrap">Categoria:</label>
          <Select
            options={data?.map((category) => ({
              value: category._id,
              label: category.name,
              image: category.logoURL ? category.logoURL : "/noImage.jpg",
            }))}
            required
            isDisabled={isLoading}
            placeholder="Selecione uma Opção"
            formatOptionLabel={({ label, image }) => (
              <div className="flex items-center gap-3">
                {image && <img src={image} alt={label} className="w-14 h-14" />}
                {label}
              </div>
            )}
            onChange={(e) => setValue("categoryId", e?.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Registro da Arma: </label>
          <input
            {...register("register")}
            required
            type="text"
            placeholder="Nº Registro da arma"
            className="rounded border-2 border-gray-100 outline-orange-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Validade da Guia de Transito: </label>
          <input
            {...register("GTValidation")}
            type="date"
            required
            className="rounded border-2 border-gray-100 outline-orange-600 flex-1 p-1"
          />
        </div>
      </form>

      <div className="flex justify-between gap-2">
        <button
          onClick={() => {
            reset();
            handleClose();
          }}
          className="w-full bg-red-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-red-600 ease-linear duration-100"
        >
          Cancelar
        </button>
        <button
          onClick={() => formRef.current?.requestSubmit()}
          className="flex gap-2 items-center justify-center w-full bg-blue-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-blue-600 ease-linear duration-100"
        >
          {mutation.isLoading ? (
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

export { CreateWeaponModal };
