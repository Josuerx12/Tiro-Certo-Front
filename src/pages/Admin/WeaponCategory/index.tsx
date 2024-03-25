import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useWeaponCategory } from "../../../hooks/useWeaponCategory";
import { ICategories } from "../../../interfaces/ICategories";
import NewWeaponCategoryModal from "../../../components/Modals/WeaponCategory/create";
import { RefreshButton } from "../../../components/Buttons/RefreshButton";
import { Loading } from "../../../components/Loading";
import { WeaponCategoriesTable } from "../../../components/Tables/WeaponCategoriesTable";

const WeaponCategory = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { Fetch } = useWeaponCategory();

  const { isLoading, data } = useQuery<ICategories[]>("categories", Fetch);

  const query = useQueryClient();

  return (
    <main className="flex-1 flex flex-col items-center mt-2">
      <NewWeaponCategoryModal
        isOpen={modalIsOpen}
        handleClose={() => setModalIsOpen((prev) => !prev)}
      />
      <h3 className="text-2xl font-semibold mb-4">
        Gerenciador de Categorias de Armas
      </h3>

      <div className="w-4/5 flex justify-end my-2 gap-2">
        <RefreshButton command={() => query.resetQueries("categories")} />
        <button
          onClick={() => setModalIsOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-violet-700 text-white p-2 rounded-md hover:bg-violet-600 ease-linear duration-100"
        >
          <FaPlus /> Nova categoria
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <table className="w-4/5 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-1 px-2">Foto</th>
              <th className="border border-gray-300 py-1 px-2">Nome</th>
              <th className="border border-gray-300 py-1 px-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((category) => (
              <WeaponCategoriesTable category={category} key={category._id} />
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export { WeaponCategory };
