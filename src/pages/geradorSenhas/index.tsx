import CardFeature from "@/components/molecules/CardFeature";
import {
  Input,
  InputNumber,
  Radio,
  notification,
  NotificationArgsProps,
} from "antd";
import { FeaturesContext } from "@/contexts/features/FeaturesContext";
import React, { useContext, useEffect, useState } from "react";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

export default function GeradorSenhas() {
  const { features, generateRandomPassword } = useContext(FeaturesContext);
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [api, contextHolder] = notification.useNotification();
  const [qtdCaracteres, setQtdCaracteres] = useState<number | string>(8);
  const [senhaGerada, setSenhaGerada] = useState<string>("");

  const [habCaracteresEspeciais, setHabCaracteresEspeciais] = useState(false);
  const [habNumeros, setHabNumeros] = useState(false);
  const [habHexadecimal, setHabHexadecimal] = useState(false);

  const otherFeatures = features.filter(
    (feature) => feature.id !== "geradorSenhas"
  );

  function handleCopyToClipboard(text: string | number) {
    copyToClipboard(text);

    isCopied &&
      api.success({
        message: `Senha copiada`,
        description: `Senha copiada com sucesso!`,
        placement: "bottomRight",
        duration: 5,
      });
  }

  function handleGenerateRandomPassword() {
    setSenhaGerada(
      generateRandomPassword(
        Number(qtdCaracteres),
        false,
        habNumeros,
        habCaracteresEspeciais,
        habHexadecimal
      )
    );
  }

  useEffect(() => {
    // habCaracteresEspeciais && setHabHexadecimal(false);
    // habHexadecimal && setHabCaracteresEspeciais(false);
  }, [habCaracteresEspeciais, habNumeros, habHexadecimal]);

  return (
    <>
      {contextHolder}
      <div>
        <div className="flex justify-center items-center mt-4">
          <span className="text-4xl">Gerador de senhas</span>
        </div>
        <div className="flex flex-row mt-8">
          <div className="w-4/5 flex flex-col items-center gap-4">
            <div className="flex flex-row gap-4 justify-center items-center">
              <span>Qtd. caracteres</span>
              <InputNumber
                className="h-12 text-3xl flex justify-center items-center"
                value={qtdCaracteres}
                onChange={(value) => setQtdCaracteres(value as string)}
                style={{ width: 80 }}
              />
              <Input
                className="h-15 text-3xl"
                style={{ width: 500 }}
                value={senhaGerada}
                onChange={(e) => setSenhaGerada(e.target.value)}
              />
              <button
                className={`
                bg-purple-200 hover:bg-purple-200 border-none h-12 
                rounded-md p-4 flex justify-center items-center
                hover:brightness-75
                w-56
              `}
                onClick={(e) => handleGenerateRandomPassword()}
              >
                <span className="text-xl">Gerar senha</span>
              </button>
            </div>
            <button
              className={`
                bg-purple-200 hover:bg-purple-200 border-none h-12 
                rounded-md p-4 flex justify-center items-center
                hover:brightness-75
                w-56
              `}
              onClick={(e) => handleCopyToClipboard(senhaGerada)}
            >
              <span className="text-xl">Copiar</span>
            </button>
            <div className="flex flex-col gap-4">
              <Radio
                className="text-2xl"
                checked={habNumeros}
                onClick={(e) => setHabNumeros(!habNumeros)}
              >
                Números
              </Radio>
              <Radio
                className="text-2xl"
                checked={habHexadecimal}
                onClick={(e) => setHabHexadecimal(!habHexadecimal)}
              >
                Hexadecimal 0-9, A-F
              </Radio>
              <Radio
                className="text-2xl"
                checked={habCaracteresEspeciais}
                onClick={(e) =>
                  setHabCaracteresEspeciais(!habCaracteresEspeciais)
                }
              >
                Caracteres especiais
              </Radio>
            </div>
          </div>
          <div
            className="w-1/5 p-4"
            style={{
              borderLeft: "1px solid #181C2A",
            }}
          >
            <span className="text-xl">Outras Funcionalidades</span>
            <div className="flex flex-col gap-4 mt-4">
              {otherFeatures &&
                otherFeatures.map((feature) => {
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
        </div>
      </div>
    </>
  );
}
