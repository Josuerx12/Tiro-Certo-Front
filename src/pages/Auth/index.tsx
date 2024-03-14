import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div className="flex-1 mx-auto mt-10 w-full">
      <form className="flex flex-col gap-3 mx-auto m-2 border w-2/4 p-2 rounded max-sm:w-72 shadow shadow-violet-1 300">
        <h3 className="text-xl text-center mt-2 mb-2">
          Faça login para acessar
        </h3>

        <div className="flex flex-col">
          <label>Login:</label>
          <input
            type="text"
            required
            placeholder="Digite seu login!"
            className="rounded border-2 border-gray-100 outline-violet-600 p-1 mt-3"
          />
        </div>
        <div className="flex flex-col">
          <label>Senha:</label>
          <input
            type="text"
            required
            placeholder="Digite sua senha!"
            className="rounded border-2 border-gray-100 outline-violet-600 p-1 mt-3"
          />
          <Link to="/recovery" className="text-blue-500 p-1 w-fit">
            Esqueci minha senha!
          </Link>
        </div>
        <button
          type="submit"
          className="bg-violet-950 w-24 rounded mx-auto text-white p-2 hover:bg-violet-700 duration-200 tracking-wider font-semibold"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export { Auth };
