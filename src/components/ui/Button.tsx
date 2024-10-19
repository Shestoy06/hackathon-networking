import React from "react";
import SmallLoader from "@/components/ui/SmallLoader.tsx";
import {twMerge} from "tailwind-merge";

interface ButtonProps {
  text: string;
  onClick: () => void;
  style?: string;
  isDisabled: boolean;
}

const Button: React.FC<ButtonProps> = (
  { text,
    onClick,
    style = "",
    isDisabled,
  }) => {

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={twMerge('p-2 px-4 bg-white text-black font-medium rounded-full', style)}
    >
      <div className="flex justify-center">
        {isDisabled ? <SmallLoader/> : text}
      </div>
    </button>
  );
};

export default Button;