/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { v4 } from "uuid";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { useClub } from "../../hooks/useClub";
import { IClub } from "../../interfaces/IClub";
import { useForm } from "react-hook-form";
import { useUsers } from "../../hooks/useUsers";
import { IWeapon } from "../../interfaces/IWeapon";
import { useAcervo } from "../../hooks/useAcervo";
import { FaMagnifyingGlass, FaPersonRifle, FaX } from "react-icons/fa6";
import { ICategories } from "../../interfaces/ICategories";
import { useWeaponCategory } from "../../hooks/useWeaponCategory";
import { useRegister } from "../../hooks/useRegister";
import { ErrorComponent } from "../../components/ErrorComponent";
import { toast } from "react-hot-toast";

type WeaponRegister = {
  id: string;
  wid?: string;
  name?: string;
  categoria?: string;
  modelo?: string;
  registro?: string;
  validade?: string;
  disparos?: number;
};

const NovoRegistro = () => {
  const [step, setStep] = useState(0);

  const [acervo, setAcervo] = useState<IWeapon[] | undefined>(undefined);
  const { get } = useClub();
  const { getById } = useAcervo();
  const { Fetch } = useWeaponCategory();
  const { data } = useQuery<IClub[]>("clubs", get);
  const WCategories = useQuery<ICategories[]>("categories", Fetch);

  const { register, handleSubmit, reset, setValue } = useForm();

  const { getOne } = useUsers();

  const getUserAcervo = useMutation("getAcervo", getById, {
    onSuccess: (acervo) => setAcervo(acervo),
  });
  const findUser = useMutation("findUser", getOne, {
    onSuccess: async (data) =>
      Promise.all([
        reset(),
        setStep(1),
        setValue("userId", data._id),
        getUserAcervo.mutateAsync(data._id),
        toast.success(`Usuário ${data.name}, encontrado!`),
      ]),
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const { create } = useRegister();

  const createRegister = useMutation("createRegister", create, {
    onSuccess: () =>
      Promise.all([
        toast.success("Registro de atividade criado com sucesso!"),
        handleCancel(),
      ]),
    onError: (e: string) => {
      toast.error(e);
    },
  });

  const [usedWeapons, setUsedWeapons] = useState<WeaponRegister[]>([
    {
      id: v4(),
      wid: "",
      name: "",
      categoria: "",
      modelo: "",
      registro: "",
      validade: "",
      disparos: 0,
    },
  ]);

  function resetUsedWeapons() {
    setUsedWeapons([
      {
        id: v4(),
        wid: "",
        name: "",
        categoria: "",
        modelo: "",
        registro: "",
        validade: "",
        disparos: 0,
      },
    ]);
  }

  async function onSubmit(data: any) {
    if (data.cpf && step === 0) {
      await findUser.mutateAsync(data.cpf);
      navigator.geolocation.getCurrentPosition((p) =>
        setValue(
          "userGeoLocation",
          `${p.coords.latitude}, ${p.coords.longitude}`
        )
      );
    }
    if (step === 3) {
      await createRegister.mutateAsync({ ...data, weapons: usedWeapons });
    }
  }

  function handleCancel() {
    reset();
    resetUsedWeapons();
    setStep(0);
    findUser.reset();
  }

  function handlePrevStep() {
    if (step == 1) {
      setStep(1);
    } else {
      if (step == 3) {
        createRegister.reset();
      }
      setStep((prev) => prev - 1);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center mt-2">
      <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
        Novo Registro de Atividade
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-4/5 bg-violet-50 p-3 rounded m-2 gap-2"
      >
        <button
          type="button"
          onClick={handleCancel}
          className={`${
            step < 1 && "hidden"
          } flex items-center gap-2 text-md hover:bg-neutral-800 transition ease-linear duration-100 p-2 bg-neutral-700 rounded text-white w-fit`}
        >
          <FaX /> Cancelar
        </button>
        {findUser.data && (
          <div className="flex flex-col gap-3 justify-center items-center">
            {findUser.data.photoURL && (
              <img
                className="w-52 h-52 rounded-full shadow border border-white"
                src={findUser.data.photoURL}
                alt={findUser.data.name}
              />
            )}
            <div className="flex flex-wrap">
              <p className="text-nowrap  px-2">
                <span className="font-bold">Nome: </span> {findUser.data.name}
              </p>
              <p className="text-nowrap px-2">
                <span className="font-bold">CPF: </span> {findUser.data.cpf}
              </p>
              <p className="text-nowrap px-2">
                <span className="font-bold">CR: </span> {findUser.data.cr}
              </p>
            </div>
          </div>
        )}
        {step === 0 && (
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-md text-neutral-700">
              CPF:
            </label>

            <input
              type="text"
              {...register("cpf")}
              required
              placeholder="Insira seu cpf sem pontução!"
              title="Insira seu cpf"
              className="rounded border-2 border-gray-100 outline-violet-600 p-2 w-full"
            />
            {findUser.isError && (
              <ErrorComponent>{findUser.error as string}</ErrorComponent>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full justify-center bg-violet-800 hover:bg-violet-700 text-white flex items-center gap-2 p-2 rounded group"
              >
                Pesquisar
                <FaMagnifyingGlass />
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-2 items-center flex-grow">
            <label className="font-semibold text-md text-neutral-700 text-nowrap">
              Atividade executada:
            </label>
            <select
              required
              defaultValue=""
              {...register("activity")}
              className="rounded border-2 border-gray-100 outline-violet-600 p-2  w-full"
            >
              <option value="treinamento">Treino</option>
              <option value="prova">Prova</option>
            </select>
            <div className="flex gap-2 w-full">
              <button
                type="submit"
                onClick={() => setStep(2)}
                className="w-full justify-center bg-violet-800 hover:bg-violet-700 text-white flex items-center gap-2 p-2 rounded group"
              >
                Proximo
                <FaArrowRight className="animate-pulse duration-800 group-hover:animate-none" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-2 flex-grow">
            <label className="text-nowrap">Clube: </label>
            <select
              required
              defaultValue=""
              {...register("clubId")}
              className="rounded border-2 border-gray-100 outline-violet-600 p-2  w-full "
            >
              {data?.map((club) => (
                <option value={club._id} key={club._id}>
                  {club.name}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={handlePrevStep}
                className="w-full justify-center bg-neutral-600 transition group ease-linear duration-300 hover:bg-neutral-500 text-white flex items-center gap-2 p-2 rounded"
              >
                <FaArrowLeft className="animate-pulse duration-800 group-hover:animate-none" />{" "}
                Voltar
              </button>
              <button
                type="submit"
                onClick={() => setStep(3)}
                className="w-full justify-center bg-violet-800 hover:bg-violet-700 text-white flex items-center gap-2 p-2 rounded group"
              >
                Proximo
                <FaArrowRight className="animate-pulse duration-800 group-hover:animate-none" />
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col gap-2 flex-grow">
            {usedWeapons?.map((w) => (
              <div className="flex gap-3 flex-wrap" key={w.id}>
                <div className="flex flex-col gap-2 w-fit basis-40 flex-grow ">
                  <label className="flex gap-2 items-center">
                    Arma Utilizada <FaPersonRifle />
                  </label>
                  <select
                    className="w-full rounded border-2 border-gray-100 outline-violet-600 p-2"
                    required
                    onChange={async (e) => {
                      const weapon = acervo?.find(
                        (slw) => slw._id === e.target.value
                      );
                      const weaponCategory = WCategories.data?.find(
                        (wc) => wc._id === weapon?.categoryId
                      );

                      if (
                        usedWeapons.map((usdw) => usdw.wid).includes(String(e))
                      ) {
                        return;
                      }

                      setUsedWeapons((prev) =>
                        prev.map((usedW) =>
                          usedW.id === w.id
                            ? {
                                ...usedW,
                                wid: weapon?._id,
                                name: weapon?.name,
                                categoria: weaponCategory?.name,
                                validade: weapon?.validade,
                                registro: weapon?.registro,
                                modelo: weapon?.modelo,
                              }
                            : usedW
                        )
                      );
                    }}
                  >
                    <option value="">Selecione um armamento</option>
                    {acervo?.map((uW) => (
                      <option value={uW._id} key={uW._id}>
                        {uW.name} - NRº: {uW.registro}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-fit basis-48 flex-grow sm:flex-grow-0">
                  <label>Disparos</label>
                  <input
                    type="number"
                    required
                    className="rounded border-2 w-full border-gray-100 outline-violet-600 p-2"
                    onChange={(e) =>
                      setUsedWeapons((prev) =>
                        prev.map((usedW) =>
                          usedW.id === w.id
                            ? { ...usedW, disparos: Number(e.target.value) }
                            : usedW
                        )
                      )
                    }
                  />
                </div>
                <div className="flex-grow sm:flex-grow-0 flex flex-col gap-2 items-center md:justify-end">
                  <button
                    className="w-full gap-2 bg-red-600 text-white p-2 rounded flex items-center justify-center"
                    title="remover esse campo!"
                    type="button"
                    onClick={() =>
                      setUsedWeapons((prev) => {
                        if (prev.length <= 1) {
                          return prev;
                        }
                        return prev.filter((puww) => puww.id !== w.id);
                      })
                    }
                  >
                    Remover <FaTrash />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                setUsedWeapons((prev) => [
                  ...prev,
                  {
                    id: v4(),
                    name: "",
                    categoria: "",
                    modelo: "",
                    registro: "",
                    validade: "",
                    disparos: 0,
                  },
                ])
              }
              type="button"
              className="flex w-full justify-center items-center gap-2 bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-500 ease-in-out duration-100"
            >
              <FaPlus /> Adicionar Armamento
            </button>

            {createRegister.isError && (
              <ErrorComponent>{createRegister.error as string}</ErrorComponent>
            )}

            <div className="flex gap-2">
              <button
                onClick={handlePrevStep}
                className="w-full justify-center bg-neutral-600 transition group ease-linear duration-300 hover:bg-neutral-500 text-white flex items-center gap-2 p-2 rounded"
              >
                <FaArrowLeft className="animate-pulse duration-800 group-hover:animate-none" />{" "}
                Voltar
              </button>
              <button
                type="submit"
                className="w-full justify-center bg-green-800 hover:bg-green-700 text-white flex items-center gap-2 p-2 rounded group"
              >
                Gerar registro
                <FaCheck className="animate-pulse duration-800 group-hover:animate-none" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NovoRegistro;
