import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

type Props = {
  title: string;
  children: ReactNode;
};

const Dropdown = ({ title, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={handleClose}
        className="flex gap-2 items-center cursor-pointer"
        title={`Clique para ver mais opções: ${title}`}
      >
        <span>{title}</span>
        <RiArrowDropDownLine
          className={`text-3xl ${
            isOpen && "rotate-180"
          } ease-linear duration-100`}
        />
      </div>

      <div
        onClick={handleClose}
        className={`md:absolute ${
          !isOpen && "hidden"
        } flex flex-col gap-3 md:bg-gray-50 md:text-black w-fit rounded-lg p-2 md:right-0 md:mt-2 shadow`}
      >
        {children}
      </div>
    </div>
  );
};

export { Dropdown };
