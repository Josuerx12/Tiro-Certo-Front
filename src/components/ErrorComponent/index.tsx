import { ReactNode } from "react";

const ErrorComponent = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-red-500">
      <span className="text-red-700 font-bold">Error: </span>
      {children}
    </p>
  );
};

export { ErrorComponent };
