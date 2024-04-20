import Image from "next/image";
import { SignIn } from "@phosphor-icons/react";
import { Modal } from "antd";
import { useState } from "react";

import { useSession, signIn, signOut } from "next-auth/react"

export default function LayoutDefault({ children }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <>
      <div className="px-4 flex flex-row items-center justify-between p-4">
        <Image
          src={"/fulllogo.png"}
          alt="ComeInHandy"
          width={198}
          height={51}
        />

        <button
          className="flex flex-row items-center justify-center space-x-2"
          onClick={() => setModalOpen(!modalOpen)}
        >
          <span className="text-gray-200">Fazer Login</span>{" "}
          <span>
            <SignIn size={20} color={"#50B2C0"} />
          </span>
        </button>
      </div>
      <Modal
        style={{}}
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
       <div className="mt-8 flex flex-col items-center">
          <p className="text-center text-xl">Faça login para utilizar as funcionalidades</p>
          <div 
            className="w-96 bg-gray-600 flex flex-row p-4 items-center gap-5 justify-center rounded-lg hover:cursor-pointer mt-6"
            onClick={() => signIn("google")}
          >
            <img src="logo_google.svg" alt="Google" />
            <p>Entrar com o Google</p>
          </div>

          <div 
            className="w-96 bg-gray-600 flex flex-row p-4 items-center gap-5 justify-center rounded-lg hover:cursor-pointer mt-4"
            onClick={() => signIn("github")}
          >
            <img src="logo_github.svg" alt="Github" />
            <p>Entrar com o Github</p>
          </div>
       </div>
      </Modal>
      <div className="z-auto overflow-y-auto w-full min-h-full p-8">
        {children}
      </div>
    </>
  );
}
