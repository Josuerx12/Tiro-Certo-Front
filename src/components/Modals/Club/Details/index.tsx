import { FaPen, FaTrash } from "react-icons/fa";
import { IClub } from "../../../../interfaces/IClub";
import { Modal } from "../../Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useClub } from "../../../../hooks/useClub";
import { useMutation, useQueryClient } from "react-query";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import DeleteClubModal from "../Delete";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  club: IClub;
};

type EditCredentials = {
  name: string;
  cnpj: string;
  cr: string;
  geoLocation: string;
  ["club-logo"]: FileList;
};

const ClubDetailModal = ({ isOpen, handleClose, club }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<EditCredentials>({
      defaultValues: {
        geoLocation: club.geoLocation,
      },
    });

  const { edit } = useClub();

  const query = useQueryClient();

  const credentials = new FormData();

  const { isLoading, mutateAsync } = useMutation("editClub", edit, {
    onSuccess: (res) =>
      Promise.all([
        reset(),
        handleClose(),
        query.invalidateQueries("clubs"),
        setIsEditing(false),
        toast.success(res),
      ]),
  });

  function getLoc() {
    navigator.geolocation.getCurrentPosition((data) =>
      setValue(
        "geoLocation",
        `${data.coords.latitude}, ${data.coords.longitude}`
      )
    );
  }

  async function onSubmit(data: EditCredentials) {
    if (data.name && data.name !== club.name)
      credentials.append("name", data.name);
    if (data.cnpj && data.cnpj !== club.cnpj)
      credentials.append("cnpj", data.cnpj);
    if (data.cr && data.cr !== club.cr) credentials.append("cr", data.cr);
    if (data.geoLocation && data.geoLocation !== club.geoLocation) {
      credentials.append("geoLocation", data.geoLocation);
    }
    if (data["club-logo"]) {
      credentials.append("club-logo", data["club-logo"][0]);
    }
    await mutateAsync({ id: club._id, credentials });
  }

  return (
    <Modal
      show={isOpen}
      hidden={() => {
        handleClose();
        reset();
      }}
      title={`Detalhes do Clube`}
    >
      <DeleteClubModal
        isOpen={isDeleting}
        handleClose={() => setIsDeleting((prev) => !prev)}
        club={club}
      />
      <div className="flex-1">
        <div className="flex gap-3 flex-wrap">
          <img
            className="w-40 h-40 md:w-80 md:h-80 rounded-lg shadow shadow-gray-300"
            src={club.logoURL ? club.logoURL : "noImage.jpg"}
            alt={club.name}
          />

          <div className="flex-1 flex  flex-col gap-4">
            <div className="flex justify-between">
              <h3 className="font-bold text-violet-950 text-2xl">
                Dados do Clube
              </h3>
              {!isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing((prev) => !prev)}
                    className="flex items-center gap-2 bg-violet-800 hover:bg-violet-600 ease-in-out duration-100 px-2 py-1 rounded text-white"
                  >
                    <FaPen /> Editar
                  </button>
                  <button
                    onClick={() => setIsDeleting(true)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-500 ease-in-out duration-100  px-2 py-1 rounded text-white"
                  >
                    <FaTrash /> Excluir
                  </button>
                </div>
              )}
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-32">Nome:</label>
                <input
                  type="text"
                  disabled={!isEditing || isLoading}
                  {...register("name")}
                  defaultValue={club.name}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-32">CNPJ:</label>
                <input
                  type="text"
                  {...register("cnpj")}
                  disabled={!isEditing || isLoading}
                  defaultValue={club.cnpj}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-32">CR:</label>
                <input
                  type="text"
                  disabled={!isEditing || isLoading}
                  {...register("cr")}
                  defaultValue={club.cr}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <label className="font-bold text-violet-950 w-32">
                  Localização:
                </label>

                <input
                  type="text"
                  {...register("geoLocation")}
                  disabled={!isEditing || isLoading}
                  defaultValue={watch("geoLocation")}
                  className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                />
              </div>
              {isEditing && (
                <div className="flex items-center">
                  <label className="font-bold text-violet-950 w-32"></label>
                  <div className="flex gap-2 flex-wrap items-center">
                    <p>Está na localização do clube?</p>
                    <button
                      type="button"
                      onClick={getLoc}
                      className="w-fit bg-violet-800 text-white flex items-center gap-2 p-2 rounded "
                    >
                      <FaLocationCrosshairs /> Coletar Localização Atual
                    </button>
                  </div>
                </div>
              )}

              {!isEditing && (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <label className="font-bold text-violet-950 w-32">
                      Cadastrado:
                    </label>
                    <input
                      type="text"
                      disabled
                      value={new Date(club.createdAt).toLocaleString("pt-BR")}
                      className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <label className="font-bold text-violet-950 w-32">
                      Atualizado:
                    </label>
                    <input
                      type="text"
                      disabled
                      value={new Date(club.updatedAt).toLocaleString("pt-BR")}
                      className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                    />
                  </div>
                </>
              )}
              {isEditing && (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <label className="font-bold text-violet-950 w-32">
                      Nova Logo:
                    </label>
                    <input
                      type="file"
                      {...register("club-logo")}
                      disabled={!isEditing || isLoading}
                      accept="image/*"
                      className="rounded border-2 border-gray-100 outline-violet-600 p-1 w-full flex-grow"
                    />
                  </div>

                  <div className="flex justify-between gap-2">
                    <button
                      disabled={isLoading}
                      onClick={() => {
                        setIsEditing((prev) => !prev);
                        reset();
                      }}
                      className="w-full bg-red-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-red-600 ease-linear duration-100"
                    >
                      Cancelar
                    </button>
                    <button
                      disabled={isLoading}
                      className="flex justify-center items-center gap-1 w-full bg-blue-700 p-2 rounded font-semibold tracking-wider text-white hover:bg-blue-600 ease-linear duration-100"
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
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { ClubDetailModal };
