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
import SideBarOtherFeatures from "@/components/organisms/SideBarOtherFeatures";
import Button from "@/components/atoms/Button";

export default function GeradorSenhas() {
  const { generateRandomPassword } = useContext(FeaturesContext);
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [api, contextHolder] = notification.useNotification();
  const [qtdCaracteres, setQtdCaracteres] = useState<number | string>(8);
  const [senhaGerada, setSenhaGerada] = useState<string>("");

  const [habCaracteresEspeciais, setHabCaracteresEspeciais] = useState(false);
  const [habNumeros, setHabNumeros] = useState(false);
  const [habHexadecimal, setHabHexadecimal] = useState(false);

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
      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="w-full md:w-4/5 flex flex-col justify-center items-center mt-4 flex-wrap">
          <span className="text-4xl">Gerador de senhas</span>
          <div className="flex flex-row mt-8">
            <div className=" flex flex-col items-center gap-4">
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <span>Qtd. caracteres</span>
                <InputNumber
                  className="h-12 w-1/5 text-3xl flex justify-center items-center"
                  value={qtdCaracteres}
                  onChange={(value) => setQtdCaracteres(value as string)}
                />
                <Input
                  className="h-15 text-3xl w-full md:w-4/5"
                  value={senhaGerada}
                  onChange={(e) => setSenhaGerada(e.target.value)}
                />
                <Button
                  className={"w-56"}
                  onClick={(e) => handleGenerateRandomPassword()}
                >
                  <span className="text-xl">Gerar senha</span>
                </Button>
              </div>
              <Button
                className={"w-56"}
                onClick={(e) => handleCopyToClipboard(senhaGerada)}
              >
                <span className="text-xl">Copiar</span>
              </Button>
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
                  checked={habCaracteresEspeciais}
                  onClick={(e) =>
                    setHabCaracteresEspeciais(!habCaracteresEspeciais)
                  }
                >
                  Caracteres especiais
                </Radio>
                <Radio
                  className="text-2xl"
                  checked={habHexadecimal}
                  onClick={(e) => setHabHexadecimal(!habHexadecimal)}
                >
                  Hexadecimal 0-9, A-F
                </Radio>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/5 p-4 mt-4 md:mt-0 md:border-l md:border-gray-700">
          <SideBarOtherFeatures ActualFeature="geradorSenhas" />
        </div>
      </div>
    </>
  );
}
