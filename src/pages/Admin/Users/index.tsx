import { useQuery, useQueryClient } from "react-query";
import { useUsers } from "../../../hooks/useUsers";
import { IUser } from "../../../interfaces/IUser";

import { FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { CreateUserModal } from "../../../components/Modals/User/create";
import { RefreshButton } from "../../../components/Buttons/RefreshButton";
import { Loading } from "../../../components/Loading";
import { UsersTable } from "../../../components/Tables/UsersTable";

const UsersAdminDashboard = () => {
  const { getAll } = useUsers();
  const [isCreating, setIsCreating] = useState(false);
  const query = useQueryClient();
  const { data, isLoading } = useQuery<IUser[]>("users", getAll);
  return (
    <div className="flex-1 flex flex-col items-center mt-2">
      <CreateUserModal
        isOpen={isCreating}
        handleClose={() => setIsCreating((prev) => !prev)}
      />
      <h3 className="text-2xl font-semibold mb-4">Gerenciador de Usuários</h3>
      <div className="w-4/5 flex justify-end my-2 gap-2">
        <RefreshButton command={() => query.resetQueries("users")} />
        <button
          onClick={() => setIsCreating((prev) => !prev)}
          className="flex items-center gap-2 bg-violet-700 text-white p-2 rounded-md hover:bg-violet-600 ease-linear duration-100"
        >
          <FaUserPlus /> Novo usuário
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <table className="w-4/5 border-collapse border border-gray-300 ">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-1 px-2">Foto</th>
              <th className="border border-gray-300 py-1 px-2">Nome</th>
              <th className="border border-gray-300 py-1 px-2">E-mail</th>
              <th className="border border-gray-300 py-1 px-2">Cr</th>
              <th className="border border-gray-300 py-1 px-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => (
              <UsersTable user={user} key={user._id} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export { UsersAdminDashboard };
