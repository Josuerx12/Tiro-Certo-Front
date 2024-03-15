import { IoMenu } from "react-icons/io5";
import { GiCrossedPistols } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../store/useAuth";
import { UserDropdown } from "./UserDropdown";
import { FaX } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { NewRegistro } from "../Modals/Registro/New";

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
      <nav className=" flex text-white justify-between items-center p-4 bg-violet-950 z-10">
        <Link to="/" className="z-[-999] text-orange-300">
          <h3 className="flex gap-2 justify-center text-xl font-bold">
            <GiCrossedPistols className=" text-3xl" />
            <span>Tiro Fácil</span>
          </h3>
        </Link>

        <ul
          className={`absolute p-4  md:opacity-100 md:shadow-none shadow w-screen md:w-auto left-0 ${
            mobileIsOpen
              ? "top-14 opacity-100 z-[-10]"
              : "top-[-400px] opacity-0"
          } md:top-0 md:relative flex md:flex-row flex-col gap-3 md:items-center tracking-wider bg-violet-950 ease-out transition-all duration-700`}
        >
          {user && (
            <li>
              <Link
                to="/registros"
                onClick={() => {
                  setMobileIsOpen((prev) => !prev);
                  setNewRegisterModalOpen((prev) => !prev);
                }}
                className={`relative flex gap-2 items-center "text-white"
           before:content-[''] before:absolute before:w-0 before:duration-300 before:bottom-[-4px] before:bg-fuchsia-400 before:left-0 before:h-0.5 hover:before:w-4/5`}
              >
                <FaPlus /> Novo registro
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/"
              onClick={() => setMobileIsOpen((prev) => !prev)}
              className={`relative ${
                pathname === "/" ? "text-violet-300" : "text-white"
              } flex gap-2 items-center "text-white"
           before:content-[''] before:absolute before:w-0 before:duration-300 before:bottom-[-4px] before:bg-fuchsia-400 before:left-0 before:h-0.5 hover:before:w-4/5`}
            >
              Inicio
            </Link>
          </li>
          {user && (
            <>
              <li></li>
            </>
          )}
          {!user ? (
            <li>
              <Link
                className={`relative ${
                  pathname === "/auth" ? "text-violet-300" : "text-white"
                } before:content-[''] before:absolute before:w-0 before:duration-300 before:bottom-0 before:bg-violet-100 before:left-0 before:h-0.5 hover:before:w-9`}
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
