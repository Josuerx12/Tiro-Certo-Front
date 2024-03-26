import { FaGun } from "react-icons/fa6";
import { ICategories } from "../../../interfaces/ICategories";
import { IWeapon } from "../../../interfaces/IWeapon";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "react-query";
import { useWeaponCategory } from "../../../hooks/useWeaponCategory";

const WeaponsCard = ({ weapon }: { weapon: IWeapon }) => {
  const { Fetch } = useWeaponCategory();

  const category = useQuery<ICategories[]>("categories", Fetch);

  const weaponCategory = category.data?.find(
    (category) => category._id === weapon.categoryId
  );

  return (
    <div className="relative group flex gap-2 bg-slate-50 flex-1 p-2 rounded-lg sm:justify-between flex-wrap items-center justify-center border-b-4 border-b-violet-900 before:opacity-0 before:content-['Vizualizar_Detalhes'] before:absolute before:bottom-0 before:right-0 before:text-violet-900 before:font-bold before:w-full before:h-6 before:flex before:justify-center hover:before:opacity-100 before:ease-in-out before:duration-300 cursor-pointer">
      <img
        className="w-36 h-36"
        src={weaponCategory?.logoURL ? weaponCategory.logoURL : "/noImage.jpg"}
        alt={weaponCategory?.name}
      />

      <div className="flex flex-col basis-96">
        <h4 className="flex items-center gap-1 text-lg">
          Dados do armamento <FaGun />
        </h4>

        <p>
          <span className="font-bold"> Nome: </span>
          {weapon.name}
        </p>
        <p>
          <span className="font-bold">Modelo: </span> {weapon.modelo}
        </p>
        <p>
          <span className="font-bold">Categoria: </span> {weaponCategory?.name}
        </p>
        <p>
          <span className="font-bold">Validade:</span>
          {format(new Date(weapon.validade + "T00:00:00-03:00"), "dd/MM/yyyy", {
            locale: ptBR,
          })}
        </p>
      </div>
    </div>
  );
};

export default WeaponsCard;
