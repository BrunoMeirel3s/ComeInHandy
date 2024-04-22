import Head from "next/head";
import { Password } from "@phosphor-icons/react";
import { useContext } from "react";
import { FeaturesContext } from "@/contexts/features/FeaturesContext";
import CardFeature from "@/components/molecules/CardFeature";

export default function Home() {
  const { features } = useContext(FeaturesContext);
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
        <div className="flex flex-col md:flex-row items-center justify-around mt-8">
          <div>
            <img src="it_support.svg" alt="Suporte de TI" />
          </div>
          <div className="w-full md:w-1/3 mt-6 md:mt-0">
            <p className="text-3xl text-gray-100 text-center text-bold">
              Nosso site possui um conjunto de ferramentas gratuitas para
              facilitar tarefas do dia a dia, experimente!
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <h1 className="text-2xl text-bold">Funcionalidades</h1>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start mt-8 gap-4 md:gap-8 flex-wrap">
            {features.map((feature) => {
              return (
                <CardFeature
                  key={feature.id}
                  id={feature.id}
                  title={feature.title}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
