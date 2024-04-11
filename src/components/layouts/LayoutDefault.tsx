import Image from "next/image";
import { SignIn } from "@phosphor-icons/react";
import { Modal } from "antd";
import { useState } from "react";

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
       <div className="mt-8">
          <p className="text-center text-xl">Faça login para utilizar as funcionalidades</p>
       </div>
      </Modal>
      <div className="z-auto overflow-y-auto w-full min-h-full p-8">
        {children}
      </div>
    </>
  );
}
