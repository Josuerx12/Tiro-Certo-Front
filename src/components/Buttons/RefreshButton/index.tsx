import { LuRefreshCcw } from "react-icons/lu";

const RefreshButton = ({ command }: { command: () => void }) => {
  return (
    <button
      onClick={() => command()}
      className="bg-black text-white rounded-md px-3 group"
    >
      <LuRefreshCcw className="text-xl group-hover:rotate-[460deg] ease-linear duration-300" />
    </button>
  );
};

export { RefreshButton };
