import { useQuery, useQueryClient } from "react-query";
import { useRegister } from "../../hooks/useRegister";
import { FaUserPlus } from "react-icons/fa";

import { NewRegistro } from "../../components/Modals/Registro/New";
import { useState } from "react";
import { RegisterCard } from "../../components/Cards/Register";
import { SkeletonCard } from "../../components/Cards/Skeleton";
import { RefreshButton } from "../../components/Buttons/RefreshButton";

const RegistrosPage = () => {
  const query = useQueryClient();

  const [isRegistering, setIsRegistering] = useState(false);

  const { userRegisters } = useRegister();
  const { data, isLoading } = useQuery("userRegisters", userRegisters);

  console.log(data);

  return (
    <div className="flex-1 flex flex-col items-center mt-2">
      <NewRegistro
        isOpen={isRegistering}
        handleClose={() => setIsRegistering((prev) => !prev)}
      />
      <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-center">
        Minhas Atividades Registradas
      </h3>
      <div className="w-4/5 flex justify-end my-2 gap-2">
        <RefreshButton command={() => query.resetQueries("userRegisters")} />
        <button
          onClick={() => setIsRegistering((prev) => !prev)}
          className="flex items-center gap-2 bg-violet-700 text-white p-2 rounded-md hover:bg-violet-600 ease-linear duration-100"
        >
          <FaUserPlus /> Novo Registro
        </button>
      </div>

      <div className="bg-slate-100 border shadow-sm w-11/12 sm:w-4/5 p-2 h-[70dvh] mb-3 mx-2 rounded  flex flex-col gap-3 overflow-auto">
        {isLoading ? (
          Array.from(Array(10)).map((_, i) => <SkeletonCard key={i} />)
        ) : data && data?.length > 0 ? (
          data?.map((register) => (
            <RegisterCard key={register._id} register={register} />
          ))
        ) : (
          <p>Nenhuma atividade registrada até o momento!</p>
        )}
      </div>
    </div>
  );
};

export { RegistrosPage };
