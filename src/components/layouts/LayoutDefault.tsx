import Image from "next/image";
import { SignIn } from "@phosphor-icons/react";

export default function LayoutDefault({ children }) {
  return (
    <>
      <div className="px-4 flex flex-row items-center justify-between">
        <Image
          src={"/fulllogo.png"}
          alt="ComeInHandy"
          width={198}
          height={51}
        />

        <div className="flex flex-row">
          <span className="text-gray-200">Fazer Login</span>{" "}
          <span>
            <SignIn size={20} style={{ color: "#50B2C0" }} />
          </span>
        </div>
      </div>
      <div className="z-auto overflow-y-auto w-full min-h-full p-8">
        {children}
      </div>
    </>
  );
}
