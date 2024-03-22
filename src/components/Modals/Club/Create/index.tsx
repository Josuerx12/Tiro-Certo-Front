/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Modal } from "../../Modal";
import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useClub } from "../../../../hooks/useClub";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

type TClubCredentials = {
  name: string;
  cnpj: string;
  cr: string;
  geoLocation: string;
  ["club-logo"]: FileList;
};

const CreateClubModal = ({ isOpen, handleClose }: Props) => {
  const { register, handleSubmit, watch, setValue, reset } =
    useForm<TClubCredentials>();
  const credentials = new FormData();
  const { create } = useClub();

  const query = useQueryClient();

  const { mutateAsync, isLoading } = useMutation("createClub", create, {
    onSuccess: () =>
      Promise.all([query.invalidateQueries("clubs"), handleClose()]),
  });

  function getLoc() {
    navigator.geolocation.getCurrentPosition((data) =>
      setValue(
        "geoLocation",
        `${data.coords.latitude}, ${data.coords.longitude}`
      )
    );
  }

  async function onSubmit(data: TClubCredentials) {
    if (data.name.length > 0) credentials.append("name", data.name);
    if (data.cnpj.length > 0) credentials.append("cnpj", data.cnpj);
    if (data.cr.length > 0) credentials.append("cr", data.cr);
    if (data.geoLocation.length > 0)
      credentials.append("geoLocation", data.geoLocation);
    if (data["club-logo"]) {
      credentials.append("club-logo", data["club-logo"][0]);
    }

    await mutateAsync(credentials);
  }

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Modal show={isOpen} hidden={handleClose} title="Cadastrar novo clube">
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Logomarca do Clube:</label>
          <input
            {...register("club-logo")}
            type="file"
            accept="image/*"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Nome:</label>
          <input
            {...register("name")}
            type="text"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-nowrap">CNPJ:</label>
          <input
            {...register("cnpj")}
            type="text"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">CR:</label>
          <input
            {...register("cr")}
            type="text"
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-nowrap">Localização:</label>
          <input
            {...register("geoLocation")}
            type="text"
            value={watch("geoLocation")}
            className="rounded border-2 border-gray-100 outline-violet-600 flex-1 p-1"
          />
          <p>Está na localização do clube?</p>
          <button
            type="button"
            onClick={getLoc}
            className="w-fit bg-violet-800 text-white flex items-center gap-2 p-2 rounded "
          >
            <FaLocationCrosshairs /> Coletar Localização Atual
          </button>
        </div>
      </form>
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
        <button
          onClick={() => formRef.current?.requestSubmit()}
          className="flex gap-2 items-center justify-center w-full bg-blue-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-blue-600 ease-linear duration-100"
        >
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
    </Modal>
  );
};

export { CreateClubModal };
