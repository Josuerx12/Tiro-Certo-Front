import { useState } from "react";
import { IUser } from "../../../interfaces/IUser";
import { UserDetail } from "../../Modals/User/Details";

const UsersTable = ({ user }: { user: IUser }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <UserDetail
        isOpen={isOpenModal}
        handleCloseModal={() => setIsOpenModal((prev) => !prev)}
        user={user}
      />
      <tr>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <img
            className="w-14 h-14 mx-auto rounded"
            src={user.photoURL ? user.photoURL : "/noImage.jpg"}
            alt={user.name}
          />
        </td>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <span>{user.name}</span>
        </td>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <span>{user.email}</span>
        </td>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <span>{user.cr}</span>
        </td>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <button
            onClick={() => setIsOpenModal((prev) => !prev)}
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded ease-linear duration-100"
          >
            Detalhes
          </button>
        </td>
      </tr>
    </>
  );
};

export { UsersTable };
