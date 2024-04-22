import Image from "next/image";
import { SignIn, SignOut } from "@phosphor-icons/react";
import { Modal } from "antd";
import { useState } from "react";

import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, Tooltip } from "antd";

export default function LayoutDefault({ children }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  return (
    <>
      <div
        className="px-4 flex flex-row items-center justify-between p-2"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,35,45,1) 0%, rgba(18,21,40,1) 8%, rgba(19,23,33,1) 92%, rgba(20,35,45,1) 100%)",
        }}
      >
        <Tooltip placement="bottom" title="Retonar ao home">
          <a href="/">
            <Image
              src={"/fulllogo.png"}
              alt="ComeInHandy"
              width={198}
              height={51}
            />
          </a>
        </Tooltip>

        {session?.user ? (
          <>
            <div className="flex flex-row gap-2 justify-center items-center">
              <Avatar
                src={`${session?.user?.image}`}
                alt={`${session?.user?.name}`}
                size="large"
              />
              <p>{session?.user?.name}</p>
              <span className="hover:cursor-pointer" onClick={() => signOut()}>
                <Tooltip placement="bottom" title="Sair">
                  <SignOut size={20} color={"#50B2C0"} />
                </Tooltip>
              </span>
            </div>
          </>
        ) : (
          <>
            <button
              className="flex flex-row items-center justify-center space-x-2"
              onClick={() => setModalOpen(!modalOpen)}
              style={{ background: "transparent" }}
            >
              <span className="text-gray-200">Fazer Login</span>{" "}
              <span>
                <SignIn size={20} color={"#50B2C0"} />
              </span>
            </button>
          </>
        )}
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
          <p className="text-center text-xl">
            Faça login para utilizar as funcionalidades
          </p>
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
      <div className="z-auto overflow-y-auto w-full min-h-full p-2 md:p-8">
        {children}
      </div>
    </>
  );
}
