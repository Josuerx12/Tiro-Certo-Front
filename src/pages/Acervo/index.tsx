import { FaGun, FaPersonRifle } from "react-icons/fa6";
import { useAcervo } from "../../hooks/useAcervo";
import { useQuery, useQueryClient } from "react-query";
import { IWeapon } from "../../interfaces/IWeapon";
import { useState } from "react";
import { CreateWeaponModal } from "../../components/Modals/Weapon/create";
import { RefreshButton } from "../../components/Buttons/RefreshButton";
import { Loading } from "../../components/Loading";
import WeaponsCard from "../../components/Cards/Weapons";

const AcervoPage = () => {
  const { get } = useAcervo();
  const query = useQueryClient();
  const { data, isLoading } = useQuery<IWeapon[]>("acervo", get);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center mt-2">
      <CreateWeaponModal
        isOpen={isOpen}
        handleClose={() => setIsOpen((prev) => !prev)}
      />
      <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
        Meu Acervo <FaPersonRifle />
      </h3>
      <div className="w-4/5 flex justify-end my-2 gap-2">
        <RefreshButton command={() => query.resetQueries("acervo")} />{" "}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-violet-700 text-white p-2 rounded-md hover:bg-violet-600 ease-linear duration-100"
        >
          <FaGun /> Nova arma
        </button>
      </div>
      <div className="flex flex-col w-4/5 gap-3">
        {isLoading ? (
          <Loading />
        ) : data && data?.length > 0 ? (
          data.map((weapon) => <WeaponsCard weapon={weapon} key={weapon._id} />)
        ) : (
          <p>Nenhuma arma cadastrada para seu usuário!</p>
        )}
      </div>
    </div>
  );
};

export { AcervoPage };
