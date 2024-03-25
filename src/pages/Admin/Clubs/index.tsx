import { useState } from "react";
import { RefreshButton } from "../../../components/buttons/refreshButton";
import { useQuery, useQueryClient } from "react-query";
import { FaRing, FaUserPlus } from "react-icons/fa";
import { useClub } from "../../../hooks/useClub";
import { Loading } from "../../../components/loading";
import { IClub } from "../../../interfaces/IClub";
import { ClubsTable } from "../../../components/tables/clubsTable";
import { CreateClubModal } from "../../../components/Modals/Club/create";

const ClubsAdminDashboard = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { get } = useClub();
  const query = useQueryClient();

  const { data, isLoading } = useQuery<IClub[]>("clubs", get);

  return (
    <div className="flex-1 flex flex-col items-center mt-2">
      <CreateClubModal
        isOpen={isCreating}
        handleClose={() => setIsCreating((prev) => !prev)}
      />
      <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
        Gerenciador de Clubes <FaRing />
      </h3>
      <div className="w-4/5 flex justify-end my-2 gap-2">
        <RefreshButton command={() => query.resetQueries("clubs")} />
        <button
          onClick={() => setIsCreating((prev) => !prev)}
          className="flex items-center gap-2 bg-violet-700 text-white p-2 rounded-md hover:bg-violet-600 ease-linear duration-100"
        >
          <FaUserPlus /> Novo Clube
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : data && data?.length > 0 ? (
        <table className="w-4/5 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-1 px-2">Foto</th>
              <th className="border border-gray-300 py-1 px-2">Nome</th>
              <th className="border border-gray-300 py-1 px-2">CNPJ</th>
              <th className="border border-gray-300 py-1 px-2">CR</th>
              <th className="border border-gray-300 py-1 px-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((club) => (
              <ClubsTable key={club._id} club={club} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum clube cadastrado no sistema!!</p>
      )}
    </div>
  );
};

export { ClubsAdminDashboard };
