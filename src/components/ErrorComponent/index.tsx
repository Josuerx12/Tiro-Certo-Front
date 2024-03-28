import { ReactNode } from "react";

const ErrorComponent = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-red-500 bg-white w-fit p-2 rounded-lg">
      <span className="text-red-700 font-bold">Error: </span>
      {children}
    </p>
  );
};

export { ErrorComponent };
