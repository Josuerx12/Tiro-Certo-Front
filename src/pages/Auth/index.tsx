/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/useAuth";
import { useForm } from "react-hook-form";
import { ILoginCredentials } from "../../interfaces/ILoginCredentials";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { ErrorComponent } from "../../components/ErrorComponent";

type MutationError = {
  email: { msg: string };
  password: { msg: string };
};

const Auth = () => {
  const { login, getUser } = useAuth();
  const [isHidden, setIsHidden] = useState(true);
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
        className="flex flex-col gap-3 mx-auto m-2 border w-3/4  md:w-2/4 p-2 rounded max-sm:w-72 shadow shadow-violet-1"
      >
        <h3 className="text-xl text-center mt-2 mb-2">
          Faça login para acessar
        </h3>

        <div className="flex flex-col gap-3">
          <label>Email:</label>
          <input
            {...register("email")}
            type="text"
            required
            placeholder="Digite seu login!"
            className="rounded border-2 border-gray-100 outline-violet-600 p-2"
          />
          {error && error.email && (
            <ErrorComponent>{error.email.msg}</ErrorComponent>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label>Senha:</label>
          <div className="flex gap-2 items-center">
            <input
              {...register("password")}
              type={isHidden ? "password" : "text"}
              required
              placeholder="Digite sua senha!"
              className="rounded border-2 border-gray-100 outline-violet-600 p-2 flex-1"
            />
            <button
              onClick={() => setIsHidden((prev) => !prev)}
              type="button"
              className="flex items-center bg-violet-600 text-white p-2 rounded gap-2 border-2 border-gray-100 hover:bg-violet-500"
            >
              <span className="hidden sm:block">
                {isHidden ? "Mostrar" : "Ocultar"}
              </span>{" "}
              <FaEye />
            </button>
          </div>
          {error && error.password && (
            <ErrorComponent>{error.password.msg}</ErrorComponent>
          )}
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
