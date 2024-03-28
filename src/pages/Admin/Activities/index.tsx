import { GrNotes } from "react-icons/gr";
import { RegisterCard } from "../../../components/Cards/Register";
import { SkeletonCard } from "../../../components/Cards/Skeleton";
import { useRegister } from "../../../hooks/useRegister";
import { useQuery, useQueryClient } from "react-query";
import { useGenerateXlsx } from "../../../hooks/useXlsxExport";
import { FaRegFileExcel } from "react-icons/fa";
import { RefreshButton } from "../../../components/Buttons/RefreshButton";

const ActivitiesAdminDashboard = () => {
  const { allRegisters } = useRegister();
  const { generateAndDownloadXLSX } = useGenerateXlsx();

  const { data, isLoading, error } = useQuery("allRegisters", allRegisters);

  const query = useQueryClient();

  data?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex-1 flex flex-col items-center mt-2 gap-3">
      <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
        Gerenciador de Atividades <GrNotes />
      </h3>

      <div className="w-4/5 flex-wrap flex justify-end gap-2 flex-1">
        <RefreshButton command={() => query.resetQueries("allRegisters")} />
        {data && (
          <button
            onClick={() => generateAndDownloadXLSX(data)}
            className="flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 bg-green-700 text-white p-2 rounded hover:bg-green-600 ease-linear duration-100"
          >
            Extrair relatorio <FaRegFileExcel />
          </button>
        )}
      </div>

      <div className="bg-neutral-50 border-indigo-200 border shadow w-11/12 sm:w-4/5 h-[70dvh] mb-3 mx-2 rounded p-6 flex flex-col gap-6 overflow-auto">
        {isLoading ? (
          Array.from(Array(10)).map((_, i) => <SkeletonCard key={i} />)
        ) : data ? (
          data.map((register) => (
            <RegisterCard key={register._id} register={register} />
          ))
        ) : (
          <p className="text-center">
            {error
              ? (error as string)
              : "Pesquise atividades realizadas no seu CPF!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivitiesAdminDashboard;
