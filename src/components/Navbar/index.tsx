import { IoMenu } from "react-icons/io5";
import { GiCrossedPistols, GiPistolGun } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../store/useAuth";
import { UserDropdown } from "./UserDropdown";
import { FaX } from "react-icons/fa6";
import { FaPlus, FaRing, FaUsers } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { Dropdown } from "../Dropdown";
import { NewRegistro } from "../Modals/Registro/New";
import { GrNotes } from "react-icons/gr";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [userDropdownIsOpen, setUserDropDownIsOpen] = useState(false);
  const [mobileIsOpen, setMobileIsOpen] = useState(false);
  const [newRegisterModalOpen, setNewRegisterModalOpen] = useState(false);

  return (
    <>
      <NewRegistro
        isOpen={newRegisterModalOpen}
        handleClose={() => setNewRegisterModalOpen((prev) => !prev)}
      />
      <nav className=" flex  justify-between items-center p-4 bg-orange-500 z-10">
        <Link to="/" className="z-[-999] text-neutral-800">
          <h3 className="flex gap-2 justify-center text-xl font-bold">
            <GiCrossedPistols className=" text-3xl" />
            <span>C.C.T.E</span>
          </h3>
        </Link>

        <ul
          className={`absolute p-4  md:opacity-100 md:shadow-none shadow w-screen md:w-auto left-0 ${
            mobileIsOpen
              ? "top-14 opacity-100 bg-orange-600"
              : "top-[-400px] opacity-0 z-[-999]"
          } md:top-0 md:relative flex md:flex-row flex-col gap-3 md:items-center tracking-wider ease-out transition-all duration-700`}
        >
          <li>
            <Link
              to="/registros"
              onClick={() => setMobileIsOpen((prev) => !prev)}
              className={`relative ${
                pathname === "/registros" ? "text-white" : "text-neutral-800"
              } flex gap-2 items-center "text-white"
           before:content-[''] before:absolute before:w-0 before:duration-300 before:bottom-[-4px] before:bg-neutral-50 before:left-0 before:h-0.5 hover:before:w-4/5`}
            >
              Atividades
            </Link>
          </li>

          <li>
            <Link
              to="/novoRegistro"
              onClick={() => {
                setMobileIsOpen((prev) => !prev);
              }}
              className={`relative ${
                pathname === "/novoRegistro" ? "text-white" : "text-neutral-800"
              } flex gap-2 items-center "text-white"
           before:content-[''] before:absolute before:w-0 before:duration-300 before:bottom-[-4px] before:bg-neutral-50 before:left-0 before:h-0.5 hover:before:w-4/5`}
            >
              <FaPlus /> Novo registro
            </Link>
          </li>

          {(user?.admin || user?.founder) && (
            <li>
              <Dropdown title="Administração">
                <Link
                  to="/usuarios"
                  className="flex items-center gap-2 cursor-pointer hover:bg-orange-400 hover:text-white rounded md:pl-2 text-nowrap"
                >
                  <FaUsers /> Usuários
                </Link>
                <Link
                  to="/atividadesDosUsuarios"
                  className="flex items-center gap-2 cursor-pointer hover:bg-orange-400 hover:text-white rounded md:pl-2 text-nowrap"
                >
                  <GrNotes /> Registros de Atividades
                </Link>
                <Link
                  to="/clubes"
                  className="flex items-center gap-2 cursor-pointer hover:bg-orange-400 hover:text-white rounded md:pl-2 text-nowrap"
                >
                  <FaRing /> Clubes
                </Link>
                <Link
                  to="/acervos"
                  className="flex items-center gap-2 cursor-pointer hover:bg-orange-400 hover:text-white rounded md:pl-2 text-nowrap"
                >
                  <GiPistolGun /> Armas
                </Link>
                <Link
                  to="/categoriasArmas"
                  className="flex items-center gap-2 cursor-pointer hover:bg-orange-400 hover:text-white rounded md:pl-2 text-nowrap"
                >
                  <BiCategory /> Categorias de Arma
                </Link>
              </Dropdown>
            </li>
          )}
          {!user ? (
            <li>
              <Link
                className={`relative px-3 py-1 border-2 rounded-full  hover:bg-orange-800 hover:text-white ease-linear duration-100 ${
                  pathname === "/auth"
                    ? "bg-orange-800 text-white"
                    : "bg-neutral-50 "
                }`}
                to="/auth"
                onClick={() => setMobileIsOpen((prev) => !prev)}
              >
                Login
              </Link>
            </li>
          ) : (
            <li>
              <UserDropdown
                isOpen={userDropdownIsOpen}
                handleClose={() => {
                  setUserDropDownIsOpen((prev) => !prev);
                }}
                user={user}
              />
            </li>
          )}
        </ul>

        <button
          className="md:hidden z-[-99]"
          onClick={() => setMobileIsOpen((prev) => !prev)}
        >
          {mobileIsOpen ? (
            <FaX className="text-xl" />
          ) : (
            <IoMenu className="text-3xl" />
          )}
        </button>
      </nav>
    </>
  );
};
export { Navbar };
