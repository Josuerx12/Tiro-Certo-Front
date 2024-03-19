import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="w-full flex justify-center gap-3 text-3xl">
      <span>Carregando</span>
      <span>
        <AiOutlineLoading3Quarters className="animate-spin duration-1000000 " />
      </span>
    </div>
  );
};

export { Loading };
