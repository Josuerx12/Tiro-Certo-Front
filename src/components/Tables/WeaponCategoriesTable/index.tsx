import { useState } from "react";
import { ICategories } from "../../../interfaces/ICategories";
import { WeaponCategoryDetailModal } from "../../Modals/WeaponCategory/details";

const WeaponCategoriesTable = ({ category }: { category: ICategories }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <WeaponCategoryDetailModal
        category={category}
        isOpen={isOpen}
        handleClose={() => setIsOpen((prev) => !prev)}
      />
      <tr>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <img
            className="w-14 h-14 mx-auto rounded"
            src={category.logoURL ? category.logoURL : "/noImage.jpg"}
            alt={category.name}
          />
        </td>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <span>{category.name}</span>
        </td>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded ease-linear duration-100"
          >
            Detalhes
          </button>
        </td>
      </tr>
    </>
  );
};

export { WeaponCategoriesTable };
