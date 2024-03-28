import { useState } from "react";
import { CreateWeaponModal } from "../../../components/Modals/Weapon/create";
import { FaGun, FaPersonRifle } from "react-icons/fa6";
import { RefreshButton } from "../../../components/Buttons/RefreshButton";
import { useQuery, useQueryClient } from "react-query";
import WeaponsCard from "../../../components/Cards/Weapons";
import { Loading } from "../../../components/Loading";
import { useAcervo } from "../../../hooks/useAcervo";

const WeaponsDashboard = () => {
  const query = useQueryClient();
  const { getAll } = useAcervo();
  const [isCreating, setIsCreating] = useState(false);

  const { data, isLoading } = useQuery("allWeapons", getAll);

  return (
    <div className="flex-1 flex flex-col items-center mt-2">
      <CreateWeaponModal
        isOpen={isCreating}
        handleClose={() => setIsCreating((prev) => !prev)}
      />
      <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
        Gerenciar Armas <FaPersonRifle />
      </h3>
      <div className="w-4/5 flex justify-end my-2 gap-2">
        <RefreshButton command={() => query.resetQueries("allWeapons")} />{" "}
        <button
          onClick={() => setIsCreating((prev) => !prev)}
          className="flex items-center gap-2 bg-orange-600 text-white p-2 rounded-md hover:bg-orange-700 ease-linear duration-100"
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

export default WeaponsDashboard;
