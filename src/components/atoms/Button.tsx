import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  borderLeft?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  const baseClasses =
    "bg-purple-200 hover:bg-purple-200 border-none h-12 rounded-md p-4 flex justify-center items-center hover:brightness-75";
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
}
