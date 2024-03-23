import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

export default function Home() {
  return (
    <>
      <Head>
        <title>Come In Handy</title>
        <meta name="description" content="Conjunto de ferramentas para o dia a dia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={""}>
        <div>
          <span className="text-2xl text-purple-200">Lorena princesa do papai</span>
        </div>
        <div>
          <span className="text-2xl text-gray-200">Jair principe do papai</span>
        </div>
      </main>
    </>
  );
}
