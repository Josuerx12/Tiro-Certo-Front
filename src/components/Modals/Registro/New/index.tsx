import { Modal } from "../../Modal";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const NewRegistro = ({ isOpen, handleClose }: Props) => {
  return (
    <Modal show={isOpen} hidden={handleClose} title="Novo Registro">
      <form className="flex flex-col gap-2 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <div className="flex flex-col gap-2 flex-grow">
            <label className="text-nowrap">clube: </label>
            <select className="bg-slate-200 rounded outline-violet-600 flex-1 p-1">
              <option value="">Selecione um Clube</option>
              <option value="">...</option>
              <option value="">...</option>
              <option value="">...</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 flex-grow">
            <label className="text-nowrap">Atividade executada:</label>
            <select className="bg-slate-200 rounded outline-violet-600 flex-1 p-1">
              <option value="">Selecione uma opção</option>
              <option value="">Treino</option>
              <option value="">Prova</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <label className="text-nowrap">Armas: </label>
          <div className="w-full">
            <input
              type="text"
              placeholder="testando"
              className="bg-slate-200 rounded outline-violet-600 flex-1 p-1"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export { NewRegistro };
