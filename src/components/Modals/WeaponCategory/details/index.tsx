/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { ICategories } from "../../../../interfaces/ICategories";
import { Modal } from "../../Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useWeaponCategory } from "../../../../hooks/useWeaponCategory";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  category: ICategories;
};

const WeaponCategoryDetailModal = ({
  isOpen,
  handleClose,
  category,
}: Props) => {
  const credentials = new FormData();
  const query = useQueryClient();
  const { EditFC } = useWeaponCategory();

  const { mutateAsync, isLoading } = useMutation("editCategory", EditFC, {
    onSuccess: () =>
      Promise.all([
        reset(),
        handleClose(),
        query.invalidateQueries("categories"),
      ]),
  });

  const { handleSubmit, reset, register } = useForm();

  async function onSubmit(data: any) {
    if (data["category-logo"]) {
      credentials.append("category-logo", data["category-logo"][0]);
    }
    if (data.name) {
      credentials.append("name", data.name);
    }
    await mutateAsync({ id: category._id, credentials });
  }

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Modal
      show={isOpen}
      hidden={handleClose}
      title="Detalhes da categoria de armas"
    >
      <div>
        <img
          src={`https://docs.google.com/uc?id=${category.logo}`}
          alt={category.logo}
        />
      </div>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Nome da categoria: </label>
          <input
            {...register("name")}
            defaultValue={category.name}
            type="text"
            className="bg-slate-200 rounded outline-violet-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Logo da categoria: </label>
          <input
            {...register("category-logo")}
            type="file"
            accept="image/*"
            placeholder="Ex. Pistola"
            className="bg-slate-200 rounded outline-violet-600 flex-1 p-1"
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

export { WeaponCategoryDetailModal };
