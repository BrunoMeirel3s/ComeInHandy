import Head from "next/head";
import { Password } from "@phosphor-icons/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Come In Handy</title>
        <meta
          name="description"
          content="Conjunto de ferramentas para o dia a dia"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={""}>
        <div className="flex flex-row items-center justify-around mt-8">
          <div>
            <img src="it_support.svg" alt="Suporte de TI" />
          </div>
          <div className="w-1/3">
            <p className="text-3xl text-gray-100 text-center text-bold">
              Nosso site possui um conjunto de ferramentas gratuitas para
              facilitar tarefas do dia a dia, experimente!
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <h1 className="text-2xl text-bold">Funcionalidades</h1>
          <div className="flex flex-row justify-center mt-8 gap-4 md:gap-8 wrap">
            <div className="flex flex-row h-14 w-80 rounded-lg overflow-hidden">
              <div className="bg-purple-200 w-1/4 flex items-center justify-center">
                <Password size={32} style={{ background: "transparent" }} />
              </div>
              <div className="bg-gray-700 text-xl w-3/4 flex items-center justify-center">
                Gerador de Senhas
              </div>
            </div>
            <div className="flex flex-row h-14 w-80 rounded-lg overflow-hidden">
              <div className="bg-purple-200 w-1/4 flex items-center justify-center">
                <Password size={32} style={{ background: "transparent" }} />
              </div>
              <div className="bg-gray-700 text-xl w-3/4 flex items-center justify-center">
                Gerador de Senhas
              </div>
            </div>
            <div className="flex flex-row h-14 w-80 rounded-lg overflow-hidden">
              <div className="bg-purple-200 w-1/4 flex items-center justify-center">
                <Password size={32} style={{ background: "transparent" }} />
              </div>
              <div className="bg-gray-700 text-xl w-3/4 flex items-center justify-center">
                Gerador de Senhas
              </div>
            </div>
            <div className="flex flex-row h-14 w-80 rounded-lg overflow-hidden">
              <div className="bg-purple-200 w-1/4 flex items-center justify-center">
                <Password size={32} style={{ background: "transparent" }} />
              </div>
              <div className="bg-gray-700 text-xl w-3/4 flex items-center justify-center">
                Gerador de Senhas
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
