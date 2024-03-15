import { FaUser } from "react-icons/fa";
import { IUser } from "../../../interfaces/IUser";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UserDetail } from "../../Modals/UserDetail";
import { useState } from "react";
import { useAuth } from "../../../store/useAuth";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  user: IUser;
};

const UserDropdown = ({ isOpen, handleClose, user }: Props) => {
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
      <UserDetail
        isOpen={userModalIsOpen}
        handleCloseModal={() => setUserModalIsOpen((prev) => !prev)}
        user={user}
      />
      <div className="relative">
        <div
          onClick={handleClose}
          className="flex items-center cursor-pointer gap-2"
          title="Clique para ver as opções do usuário"
        >
          <img
            className="w-10 h-10 rounded-full"
            src="/noImage.jpg"
            alt="profile-pic"
          />
          {user.name.split(" ")[0]}
          <RiArrowDropDownLine className="text-3xl" />
        </div>

        <ul
          onClick={handleClose}
          className={`md:absolute ${
            isOpen
              ? "opacity-100"
              : "opacity-0 h-0 w-0 z-[-2] md:w-fit md:h-fit"
          } flex flex-col gap-3 md:bg-gray-50 md:text-black w-fit rounded-lg p-2 md:right-0 md:mt-2 shadow transition-all ease-in-out duration-200 `}
        >
          <h4 className="flex gap-2 items-center justify-center  text-nowrap font-bold md:text-violet-950 md:pl-2">
            Opções do Usuário <FaUser />
          </h4>
          <li
            className="cursor-pointer hover:bg-violet-400 hover:text-white rounded md:pl-2 "
            onClick={() => {
              setUserModalIsOpen((prev) => !prev);
            }}
          >
            <Link to="/">Ver Perfil</Link>
          </li>
          <li
            onClick={() => {
              setUserModalIsOpen(false);
            }}
            className="cursor-pointer hover:bg-violet-400 hover:text-white rounded md:pl-2 "
          >
            <Link to="/registros">Atividades</Link>
          </li>
          <li
            className="cursor-pointer hover:bg-violet-400 hover:text-white rounded md:pl-2"
            onClick={() => {
              setUserModalIsOpen(false);
            }}
          >
            <Link to="/">Acervo</Link>
          </li>
          <li className="border-b-2 border-gray-300"></li>
          <li
            className="flex items-center gap-1 cursor-pointer hover:bg-violet-700 hover:text-white md:pl-2 rounded"
            title="Você irá se desconectar do sistema!"
            onClick={() => {
              setUserModalIsOpen(false);
              logout();
            }}
          >
            <RiLogoutBoxLine /> Sair
          </li>
        </ul>
      </div>
    </>
  );
};

export { UserDropdown };
