import { FaDatabase } from "react-icons/fa";
import { IRegister } from "../../../interfaces/IRegister";
import { FaGun } from "react-icons/fa6";
import { format } from "date-fns";

const RegisterCard = ({ register }: { register: IRegister }) => {
  return (
    <div className="border p-2 shadow bg-neutral-50  border-violet-600 w-full min-h-48 rounded flex flex-wrap justify-between overflow-auto">
      <div className="flex flex-col ">
        <h4 className="font-bold flex gap-2 items-center text-violet-900">
          <FaDatabase /> Dados:
        </h4>
        <p>
          <span className="font-bold">Nome: </span>
          {register.name}
        </p>
        <p>
          <span className="font-bold">cpf: </span>
          {register.cpf}
        </p>
        <p>
          <span className="font-bold">Clube: </span>
          {register.club.name}
        </p>
        <p>
          <span className="font-bold">Atividade: </span>
          {register.activity}
        </p>
        <p>
          <span className="font-bold">Execução: </span>{" "}
          {format(register.createdAt, "dd/MM/yyyy")}
        </p>
      </div>

      <div className="flex flex-col">
        <h3 className="font-bold flex gap-2 items-center text-violet-900">
          <FaGun /> Armas Utilizadas:
        </h3>

        <div className="flex flex-col gap-3">
          {register.weapons.map((weapon, i) => (
            <div className="bg-orange-300 rounded p-2" key={i}>
              <p>
                <span className="font-bold">Nome:</span> {weapon.name}
              </p>
              <p>
                <span className="font-bold">Disparos:</span> {weapon.disparos}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { RegisterCard };
