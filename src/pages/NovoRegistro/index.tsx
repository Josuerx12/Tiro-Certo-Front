/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { v4 } from "uuid";
import { FaArrowRight, FaPlus, FaTrash } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { useClub } from "../../hooks/useClub";
import { IClub } from "../../interfaces/IClub";
import { useForm } from "react-hook-form";
import { useUsers } from "../../hooks/useUsers";
import { IWeapon } from "../../interfaces/IWeapon";
import { useAcervo } from "../../hooks/useAcervo";
import { FaMagnifyingGlass, FaPersonRifle } from "react-icons/fa6";
import { ICategories } from "../../interfaces/ICategories";
import { useWeaponCategory } from "../../hooks/useWeaponCategory";
import { useRegister } from "../../hooks/useRegister";
import { ErrorComponent } from "../../components/ErrorComponent";
import { IUser } from "../../interfaces/IUser";

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
  const [user, setUser] = useState<IUser | undefined>(undefined);

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
        setUser(data),
      ]),
  });

  const { create } = useRegister();

  const createRegister = useMutation("createRegister", create, {
    onSuccess: () =>
      Promise.all([
        reset(),
        resetUsedWeapons(),
        setStep(0),
        setUser(undefined),
      ]),
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
    setUser(undefined);
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
        {user && (
          <div className="flex flex-col gap-1">
            <img
              className="w-48 h-48 rounded-full shadow m-auto"
              src={user.photoURL ? user.photoURL : "/noImage.jpg"}
            />
            <div className="flex flex-col gap-1">
              <label className=" text-md text-neutral-700">Nome:</label>

              <input
                type="text"
                value={user.name}
                required
                disabled
                title="Seu Nome"
                className="rounded border-2 bg-gray-200 border-gray-100 outline-violet-600 p-1 w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className=" text-md text-neutral-700">CPF:</label>

              <input
                type="text"
                value={user.cpf}
                required
                disabled
                title="Seu CPF"
                className="rounded border-2 bg-gray-200 border-gray-100 outline-violet-600 p-1 w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className=" text-md text-neutral-700">Email:</label>

              <input
                type="text"
                value={user.email}
                required
                disabled
                title="Seu CPF"
                className="rounded border-2 bg-gray-200 border-gray-100 outline-violet-600 p-1 w-full"
              />
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
              placeholder="000.000.000-00 ou 00000000000"
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
              {...register("activity")}
              className="rounded border-2 border-gray-100 outline-violet-600 p-2  w-full"
            >
              <option value="">Selecione uma opção</option>
              <option value="treinamento">Treino</option>
              <option value="prova">Prova</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => handleCancel()}
                className="w-full justify-center bg-neutral-600 transition ease-linear duration-300 hover:bg-neutral-500 text-white flex items-center gap-2 p-2 rounded"
              >
                Cancelar
              </button>
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
              <option value="">Selecione um Clube</option>
              {data?.map((club) => (
                <option value={club._id} key={club._id}>
                  {club.name}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => handleCancel()}
                className="w-full justify-center bg-neutral-600 transition ease-linear duration-300 hover:bg-neutral-500 text-white flex items-center gap-2 p-2 rounded"
              >
                Cancelar
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
              <div className="w-full flex gap-3 flex-wrap" key={w.id}>
                <div className="flex flex-col gap-2 flex-1">
                  <label className="flex gap-2 items-center">
                    Arma Utilizada <FaPersonRifle />
                  </label>
                  <select
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
                    className="rounded border-2 border-gray-100 outline-violet-600 p-2"
                  >
                    <option value="">Selecione um armamento</option>
                    {acervo?.map((uW) => (
                      <option value={uW._id} key={uW._id}>
                        {uW.name} - NRº: {uW.registro}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-fit basis-40 flex-grow sm:flex-grow-0">
                  <label>Disparos</label>
                  <input
                    type="number"
                    required
                    className="rounded border-2 border-gray-100 outline-violet-600 p-2"
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
                <div className="flex flex-col gap-2 items-center md:justify-end">
                  <button
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
                    className=" bg-red-600 text-white p-2 rounded flex items-center justify-center"
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
              className="flex items-center gap-2 bg-gray-600 text-white w-fit px-2 py-2 rounded hover:bg-gray-500 ease-in-out duration-100"
            >
              <FaPlus /> Adicionar Armamento
            </button>

            {createRegister.isError && (
              <ErrorComponent>{createRegister.error as string}</ErrorComponent>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleCancel()}
                className="w-full justify-center bg-neutral-600 transition ease-linear duration-300 hover:bg-neutral-500 text-white flex items-center gap-2 p-2 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full justify-center bg-violet-800 hover:bg-violet-700 text-white flex items-center gap-2 p-2 rounded group"
              >
                Proximo
                <FaArrowRight className="animate-pulse duration-800 group-hover:animate-none" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NovoRegistro;
