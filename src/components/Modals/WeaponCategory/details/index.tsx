/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { ICategories } from "../../../../interfaces/ICategories";
import { Modal } from "../../Modal";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useWeaponCategory } from "../../../../hooks/useWeaponCategory";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPen, FaTrash } from "react-icons/fa";
import { DeleteWeaponCategoryModal } from "../delete";
import toast from "react-hot-toast";

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
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const credentials = new FormData();
  const query = useQueryClient();
  const { EditFC } = useWeaponCategory();

  const { mutateAsync, isLoading } = useMutation("editCategory", EditFC, {
    onSuccess: (res) =>
      Promise.all([
        reset(),
        handleClose(),
        query.invalidateQueries("categories"),
        toast.success(res),
      ]),
    onError: () => {
      toast.error("Erro ao editar categoria!");
    },
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
      <DeleteWeaponCategoryModal
        isOpen={isDeleting}
        handleClose={() => {
          setIsDeleting((prev) => !prev);
        }}
        category={category}
      />
      {!isEditing && (
        <div className="w-full flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="flex gap-1 items-center bg-violet-800 hover:bg-violet-500 duration-200 px-2 py-1 rounded text-white"
          >
            <FaPen /> Editar
          </button>
          <button
            onClick={() => setIsDeleting((prev) => !prev)}
            className="flex gap-1 items-center bg-red-700 hover:bg-red-500 duration-200 px-2 py-1 rounded text-white"
          >
            <FaTrash /> Deletar
          </button>
        </div>
      )}

      <div className="flex flex-col gap-1 items-center">
        <h4 className="font-bold">Logo Cadastrada:</h4>
        <img
          className="w-56 h-56 rounded shadow"
          src={`${category.logoURL}`}
          alt={category.name}
        />
      </div>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Nome da categoria: </label>
          <input
            {...register("name")}
            defaultValue={category.name}
            disabled={!isEditing}
            type="text"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>
        {isEditing && (
          <div className="flex flex-col gap-1">
            <label className="text-nowrap">Logo da categoria: </label>
            <input
              {...register("category-logo")}
              type="file"
              accept="image/*"
              placeholder="Ex. Pistola"
              className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
            />
          </div>
        )}
      </form>
      {isEditing && (
        <div className="flex justify-between gap-2">
          <button
            onClick={() => {
              reset();
              setIsEditing(false);
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
      )}
    </Modal>
  );
};

export { WeaponCategoryDetailModal };
