import { IWeapon } from "../../../interfaces/IWeapon";
import { useQuery } from "react-query";
import { useWeaponCategory } from "../../../hooks/useWeaponCategory";
import { ICategories } from "../../../interfaces/ICategories";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const WeaponTable = ({ weapon }: { weapon: IWeapon }) => {
  const { Fetch } = useWeaponCategory();
  const categories = useQuery<ICategories[]>("categories", Fetch);

  const weaponCategory = categories.data?.find(
    (category) => category._id === weapon.categoryId
  );

  return (
    <tr>
      <td className="border border-gray-300 py-1 px-2 text-center">
        <img
          className="w-14 h-14 mx-auto rounded"
          src={
            weaponCategory?.logoURL ? weaponCategory.logoURL : "/noImage.jpg"
          }
          alt={weaponCategory?.name}
        />
      </td>
      <td className="border border-gray-300 py-1 px-2 text-center">
        <span>{weaponCategory?.name}</span>
      </td>
      <td className="border border-gray-300 py-1 px-2 text-center">
        <span>{weapon.name}</span>
      </td>
      <td className="border border-gray-300 py-1 px-2 text-center">
        <span>{weapon.registro}</span>
      </td>
      <td className="border border-gray-300 py-1 px-2 text-center">
        <span>
          {format(new Date(weapon.validade + "T00:00:00-03:00"), "dd/MM/yyyy", {
            locale: ptBR,
          })}
        </span>
      </td>
      <td className="border border-gray-300 py-1 px-2 text-center">
        <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded ease-linear duration-100">
          Detalhes
        </button>
      </td>
    </tr>
  );
};

export default WeaponTable;
