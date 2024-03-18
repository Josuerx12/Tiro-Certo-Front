/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "react-query";
import { Modal } from "../../Modal";
import { useWeaponCategory } from "../../../../hooks/useWeaponCategory";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRef } from "react";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const NewWeaponCategoryModal = ({ isOpen, handleClose }: Props) => {
  const { register, handleSubmit: onSubmit } = useForm({
    defaultValues: {
      name: undefined,
      ["category-logo"]: undefined,
    },
  });

  const credentials = new FormData();

  const { Create } = useWeaponCategory();

  const query = useQueryClient();

  const { mutateAsync, isLoading } = useMutation("createCategory", Create, {
    onSuccess: () =>
      Promise.all([query.invalidateQueries("categories"), handleClose()]),
  });

  const handleSubmit = async (data: any) => {
    credentials.append("name", data.name);
    credentials.append("category-logo", data["category-pic"][0]);

    await mutateAsync(credentials);
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Modal show={isOpen} hidden={handleClose} title="Nova categoria de arma">
      <form
        ref={formRef}
        onSubmit={onSubmit(handleSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Nome da categoria: </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Ex. Pistola"
            onChange={(e) => credentials.append("name", e.target.value)}
            className="bg-slate-200 rounded outline-violet-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Logo da categoria: </label>
          <input
            type="file"
            accept="image/*"
            placeholder="Ex. Pistola"
            {...register("category-logo")}
            onChange={(e) => {
              if (e.target.files) {
                credentials.append("category-logo", e.target.files[0]);
              }
            }}
            className="bg-slate-200 rounded outline-violet-600 flex-1 p-1"
          />
        </div>
      </form>

      <div className="flex justify-between gap-2">
        <button className="w-full bg-red-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-red-600 ease-linear duration-100">
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

export default NewWeaponCategoryModal;
