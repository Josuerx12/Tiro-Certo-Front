import { FaGun, FaPersonRifle } from "react-icons/fa6";
import { useAcervo } from "../../hooks/useAcervo";
import { useQuery, useQueryClient } from "react-query";
import { Loading } from "../../components/Loading";
import { IWeapon } from "../../interfaces/IWeapon";
import { RefreshButton } from "../../components/Buttons/RefreshButton";

const AcervoPage = () => {
  const { get } = useAcervo();
  const query = useQueryClient();
  const { data, isLoading } = useQuery<IWeapon[]>("acervo", get);

  return (
    <div className="flex-1 flex flex-col items-center mt-2">
      <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
        Meu Acervo <FaPersonRifle />
      </h3>
      <div className="w-4/5 flex justify-end my-2 gap-2">
        <RefreshButton command={() => query.resetQueries("acervo")} />{" "}
        <button className="flex items-center gap-2 bg-violet-700 text-white p-2 rounded-md hover:bg-violet-600 ease-linear duration-100">
          <FaGun /> Nova arma
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : data && data?.length > 0 ? (
        <table className="w-4/5 border-collapse border border-gray-300 ">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-1 px-2">Foto</th>
              <th className="border border-gray-300 py-1 px-2">Categoria</th>
              <th className="border border-gray-300 py-1 px-2">Nome</th>
              <th className="border border-gray-300 py-1 px-2">Modelo</th>
              <th className="border border-gray-300 py-1 px-2">Validade</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      ) : (
        <p>Nenhuma arma cadastrada para seu usuário!</p>
      )}
    </div>
  );
};

export { AcervoPage };
