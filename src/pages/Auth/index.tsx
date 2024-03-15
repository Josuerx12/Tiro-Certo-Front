/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import { useForm } from "react-hook-form";
import { ILoginCredentials } from "../../interfaces/ILoginCredentials";
import { useNavigate } from "react-router-dom";

type MutationError = {
  email: { msg: string };
  password: { msg: string };
};

const Auth = () => {
  const { login, getUser } = useAuth();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const { mutateAsync, error } = useMutation<
    any,
    MutationError,
    ILoginCredentials
  >(["login"], login, {
    onSuccess: () => Promise.all([getUser(), navigate("/")]),
  });

  async function onSubmit(data: ILoginCredentials) {
    await mutateAsync(data);
  }

  return (
    <div className="flex-1 mx-auto mt-10 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 mx-auto m-2 border w-2/4 p-2 rounded max-sm:w-72 shadow shadow-violet-1 300"
      >
        <h3 className="text-xl text-center mt-2 mb-2">
          Faça login para acessar
        </h3>

        <div className="flex flex-col">
          <label>Email:</label>
          <input
            {...register("email")}
            type="text"
            required
            placeholder="Digite seu login!"
            className="rounded border-2 border-gray-100 outline-violet-600 p-1 mt-3"
          />
        </div>
        <div className="flex flex-col">
          <label>Senha:</label>
          <input
            {...register("password")}
            type="text"
            required
            placeholder="Digite sua senha!"
            className="rounded border-2 border-gray-100 outline-violet-600 p-1 mt-3"
          />
          <Link to="/recovery" className="text-blue-500 p-1 w-fit">
            Esqueci minha senha!
          </Link>
        </div>
        {error && !error?.email && !error?.password && (
          <p className="bg-red-100 rounded-md p-1 text-red-600">
            <span className="text-red-900 font-bold">Error: </span>{" "}
            {error.toString()}
          </p>
        )}
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
