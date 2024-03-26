import { useMutation, useQuery } from "react-query";
import { Modal } from "../../Modal";
import { useClub } from "../../../../hooks/useClub";
import { IClub } from "../../../../interfaces/IClub";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { v4 } from "uuid";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useAcervo } from "../../../../hooks/useAcervo";
import { IWeapon } from "../../../../interfaces/IWeapon";
import { ICategories } from "../../../../interfaces/ICategories";
import { useWeaponCategory } from "../../../../hooks/useWeaponCategory";
import { FaLocationCrosshairs, FaPersonRifle } from "react-icons/fa6";
import { useRegister } from "../../../../hooks/useRegister";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

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

export type NewRegisterCredentials = {
  clubId: string;
  userGeoLocation: string;
  activity: string;
  weapons: WeaponRegister[];
};

const NewRegistro = ({ isOpen, handleClose }: Props) => {
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<NewRegisterCredentials>();

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

  const { get } = useClub();
  const { get: getAcervo } = useAcervo();
  const { Fetch } = useWeaponCategory();
  const { create } = useRegister();

  const { isLoading, mutateAsync } = useMutation("newRegister", create, {
    onSuccess: () => Promise.all([resetUsedWeapons(), reset(), handleClose()]),
  });

  const clubs = useQuery<IClub[]>("clubs", get);
  const userWeapons = useQuery<IWeapon[]>("acervo", getAcervo);
  const WCategories = useQuery<ICategories[]>("categories", Fetch);

  function getLoc() {
    navigator.geolocation.getCurrentPosition((data) =>
      setValue(
        "userGeoLocation",
        `${data.coords.latitude}, ${data.coords.longitude}`
      )
    );
  }

  async function onSubmit(data: NewRegisterCredentials) {
    await mutateAsync({ ...data, weapons: usedWeapons });
  }

  return (
    <Modal show={isOpen} hidden={handleClose} title="Novo Registro">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 flex-wrap"
      >
        <div className="flex flex-col gap-2 flex-grow">
          <label className="text-nowrap">clube: </label>
          <select
            required
            defaultValue=""
            {...register("clubId")}
            className="rounded border-2 border-gray-100 outline-violet-600 p-2"
          >
            <option value="">Selecione um Clube</option>
            {clubs.data?.map((club) => (
              <option value={club._id}>{club.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 flex-grow">
          <label className="text-nowrap">Atividade executada:</label>
          <select
            required
            {...register("activity")}
            className="flex-1 rounded border-2 border-gray-100 outline-violet-600 p-2"
          >
            <option value="">Selecione uma opção</option>
            <option value="treinamento">Treino</option>
            <option value="prova">Prova</option>
          </select>
        </div>

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
                    const weapon = userWeapons.data?.find(
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
                  {userWeapons.data?.map((uW) => (
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
                  className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-2"
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
              <div className="flex flex-col gap-2 w-fit items-center">
                <label>Remover</label>
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
                  className="bg-red-600 text-white  w-8 h-8 flex items-center justify-center rounded-full"
                >
                  <FaTrash />
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
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Sua Localização:</label>
          <input
            {...register("userGeoLocation")}
            type="text"
            value={watch("userGeoLocation")}
            disabled
            required
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
          <p>
            Está na localização do clube? Precione Coletar Localização para
            confirmar!
          </p>
          <button
            type="button"
            onClick={getLoc}
            title="Clique aqui para coletar sua localização!"
            className="w-fit bg-violet-800 hover:bg-violet-700 text-white flex items-center gap-2 p-2 rounded "
          >
            <FaLocationCrosshairs /> Coletar Localização
          </button>
        </div>

        <div className="flex justify-between gap-2">
          <button
            onClick={() => {
              reset();
              handleClose();
            }}
            className="w-full bg-red-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-red-600 ease-linear duration-100"
          >
            Cancelar
          </button>
          <button className="flex gap-2 items-center justify-center w-full bg-blue-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-blue-600 ease-linear duration-100">
            {isLoading ? (
              <>
                Salvando
                <AiOutlineLoading3Quarters className="animate-spin duration-1000000 " />
              </>
            ) : (
              <>Salvar</>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export { NewRegistro };
