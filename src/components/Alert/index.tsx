import { FiAlertTriangle } from "react-icons/fi";

type Props = {
  message: string;
  show: boolean;
  hidden: () => void;
  type: string;
};

const Alert = ({ message, show, hidden, type }: Props) => {
  console.log(hidden, type);
  return (
    <div
      className={`relative top-28 ${
        show && "absolute right-6 opacity-100"
      } left-[-700px] z-[999] bg-green-300 border-l-4 border-l-green-800 w-56 p-3 rounded flex flex-col items-center`}
    >
      <h5 className="text-lg font-bold text-green-950 w-full text-center flex items-center gap-2">
        Alerta <FiAlertTriangle />
      </h5>
      <p>{message}</p>
    </div>
  );
};

export { Alert };
