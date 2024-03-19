import { ReactNode } from "react";
import { FaX } from "react-icons/fa6";

type Props = {
  show: boolean;
  hidden: () => void;
  children: ReactNode;
  title: string;
};

const Modal = ({ children, show, hidden, title }: Props) => {
  return (
    <div
      className={`fixed overflow-auto bg-black bg-opacity-30 inset-0 backdrop-blur-sm z-50 flex justify-center top-[0] items-start ease-linear transition-all duration-200 ${
        !show && "top-[-500px] hidden"
      }`}
    >
      <div className="w-full md:w-3/4 mx-4 mt-14 mb-4 bg-white text-black flex flex-col gap-4 rounded-lg px-4 py-3">
        <div className="flex w-full justify-between border-b-2 pb-3 border-b-purple-950">
          <span className="text-xl font-semibold">{title}</span>
          <button onClick={hidden}>
            <FaX />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export { Modal };
