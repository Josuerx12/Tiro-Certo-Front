import { FaRegFileExcel, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { useUsers } from "../../hooks/useUsers";
import { ErrorComponent } from "../../components/ErrorComponent";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/useRegister";
import { SkeletonCard } from "../../components/Cards/Skeleton";
import { RegisterCard } from "../../components/Cards/Register";
import { useGenerateXlsx } from "../../hooks/useXlsxExport";

type FindUserCpf = {
  cpf: string;
};

const RegistrosPage = () => {
  const { getOne } = useUsers();
  const { userRegistersById } = useRegister();

  const {
    mutateAsync,
    data,
    isLoading,
    error,
    reset: resetActivities,
  } = useMutation("userActivities", userRegistersById);

  const { register, handleSubmit, reset } = useForm<FindUserCpf>();
  const { generateAndDownloadXLSX } = useGenerateXlsx();

  const findUser = useMutation("findUser", getOne, {
    onSuccess: (user) => Promise.all([mutateAsync(user._id)]),
  });

  async function onSubmit(data: FindUserCpf) {
    await findUser.mutateAsync(data.cpf);
  }

  const handleNewSearch = () => {
    findUser.reset();
    resetActivities();
    reset();
  };

  return (
    <div className="flex-1 flex flex-col items-center mt-2 gap-3">
      <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-center">
        {!findUser.data ? (
          <>Busque atividades relacionadas a seu CPF!</>
        ) : (
          <>Atividades registradas ({findUser.data.name})</>
        )}
      </h3>
      <div className="w-4/5 flex-wrap flex justify-end gap-2">
        <button
          onClick={handleNewSearch}
          className="flex flex-grow sm:flex-grow-0  justify-center items-center gap-2 bg-blue-700 text-white p-2 rounded hover:bg-blue-600 ease-linear duration-100"
        >
          Nova pesquisa <FaMagnifyingGlass />
        </button>
        {data && (
          <button
            onClick={() => generateAndDownloadXLSX(data)}
            className="flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 bg-green-700 text-white p-2 rounded hover:bg-green-600 ease-linear duration-100"
          >
            Extrair relatorio <FaRegFileExcel />
          </button>
        )}
        <Link
          to="/novoRegistro"
          className="flex flex-grow justify-center sm:flex-grow-0 items-center gap-2 bg-violet-700 text-white p-2 rounded hover:bg-violet-600 ease-linear duration-100"
        >
          <FaUserPlus /> Novo Registro
        </Link>
      </div>

      {!findUser.data && (
        <form className="w-4/5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-md text-neutral-700">
              CPF:
            </label>

            <input
              type="text"
              {...register("cpf")}
              required
              placeholder="000.000.000-00 ou 00000000000"
              title="Insira seu cpf"
              className="rounded border-2 border-gray-100 outline-violet-600 p-2 w-full"
            />
            {findUser.isError && (
              <ErrorComponent>{findUser.error as string}</ErrorComponent>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full justify-center bg-violet-800 hover:bg-violet-700 text-white flex items-center gap-2 p-2 rounded group"
              >
                Pesquisar
                <FaMagnifyingGlass />
              </button>
            </div>
          </div>
        </form>
      )}

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

export { RegistrosPage };
