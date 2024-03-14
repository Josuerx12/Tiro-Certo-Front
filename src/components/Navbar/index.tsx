import { IoMenu } from "react-icons/io5";
import { GiCrossedPistols } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex text-slate-50 justify-between items-center p-4 bg-violet-950">
      <Link to="/">
        <h3 className="flex gap-2 justify-center text-xl font-bold">
          <GiCrossedPistols className="text-violet-300 text-3xl" />
          <span>Tiro Fácil</span>
        </h3>
      </Link>

      <nav className="flex gap-3 items-center tracking-wider">
        <Link
          to="/"
          className={`relative ${
            pathname === "/" ? "text-violet-300" : "text-white"
          } before:content-[''] before:absolute before:w-0 before:duration-300 before:bottom-0 before:bg-violet-100 before:left-0 before:h-0.5 hover:before:w-9`}
        >
          Inicio
        </Link>
        <Link
          className={`relative ${
            pathname === "/auth" ? "text-violet-300" : "text-white"
          } before:content-[''] before:absolute before:w-0 before:duration-300 before:bottom-0 before:bg-violet-100 before:left-0 before:h-0.5 hover:before:w-9`}
          to="/auth"
        >
          Login
        </Link>
      </nav>

      <button className="hidden">
        <IoMenu className="text-3xl" />
      </button>
    </header>
  );
};
export { Navbar };
