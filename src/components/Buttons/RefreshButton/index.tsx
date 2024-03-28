import { LuRefreshCcw } from "react-icons/lu";

const RefreshButton = ({ command }: { command: () => void }) => {
  return (
    <button
      onClick={() => command()}
      className="bg-black text-white rounded-md w-10 h-10 group flex items-center justify-center"
    >
      <LuRefreshCcw className="text-xl group-hover:rotate-[460deg] ease-linear duration-300" />
    </button>
  );
};

export { RefreshButton };
