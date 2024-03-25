import { useState } from "react";
import { IClub } from "../../../interfaces/IClub";
import { ClubDetailModal } from "../../Modals/Club/Details";

const ClubsTable = ({ club }: { club: IClub }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <>
      <ClubDetailModal
        club={club}
        isOpen={isOpen}
        handleClose={() => setIsOpen((prev) => !prev)}
      />
      <tr>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <img
            className="w-14 h-14 mx-auto rounded"
            src={club.logoURL ? club.logoURL : "/noImage.jpg"}
            alt={club.name}
          />
        </td>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <span>{club.name}</span>
        </td>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <span>{club.cnpj}</span>
        </td>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <span>{club.cr}</span>
        </td>
        <td className="border border-gray-300 py-1 px-2 text-center">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded ease-linear duration-100"
          >
            Detalhes
          </button>
        </td>
      </tr>
    </>
  );
};

export { ClubsTable };
