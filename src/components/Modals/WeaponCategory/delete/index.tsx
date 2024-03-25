import { Modal } from "../../Modal";
import { ICategories } from "../../../../interfaces/ICategories";
import { BsExclamationCircle } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { useWeaponCategory } from "../../../../hooks/useWeaponCategory";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  category: ICategories;
};

const DeleteWeaponCategoryModal = ({
  isOpen,
  handleClose,
  category,
}: Props) => {
  const { Delete } = useWeaponCategory();
  const query = useQueryClient();
  const { mutateAsync, isLoading } = useMutation("deleteCategory", Delete, {
    onSuccess: () =>
      Promise.all([handleClose(), query.invalidateQueries("categories")]),
  });

  return (
    <Modal show={isOpen} hidden={handleClose} title={`Deletar categoria:`}>
      <div className="flex flex-col justify-center items-center gap-6">
        <BsExclamationCircle className="text-[20rem] text-yellow-400" />
        <p className="text-red-700 font-bold text-2xl text-center">
          Tem certeza que deseja excluir a categoria -{" "}
          <span className="text-black">{category.name}</span>?
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
          onClick={async () => await mutateAsync(category._id)}
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

export { DeleteWeaponCategoryModal };
