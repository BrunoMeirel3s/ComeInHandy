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
import { useSession } from "next-auth/react";

export default function CopiarEntreDispositivos() {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [api, contextHolder] = notification.useNotification();
  const [textoParaFormatar, setTextoParaFormatar] = useState<string>("");
  const [opcaoFormatacao, setOpcaoFormatacao] = useState<string>("");
  const [habRemoverAcentos, setHabRemoverAcentos] = useState<boolean>(false);
  const [habRemoverFormatacao, setHabRemoverFormatacao] = useState<boolean>(false);

  function handleCopyToClipboard(text: string | number) {
    copyToClipboard(text);

    isCopied &&
      api.success({
        message: `Texto copiado`,
        description: `Texto copiado com sucesso!`,
        placement: "bottomRight",
        duration: 5,
      });
  }

  function handleFormatarTexto(text: string) {
    if (opcaoFormatacao === "maiusculo") {
      setTextoParaFormatar(`${text}`.toUpperCase());
    } else if (opcaoFormatacao === "minusculo") {
      setTextoParaFormatar(`${text}`.toLowerCase());
    } else {
      setTextoParaFormatar(`${text}`);
    }

    habRemoverAcentos && setTextoParaFormatar(handleRemoverAcentos(`${text}`));


  }

  function handleRemoverAcentos(text: string) {
    const texto = `${text}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return texto
  }

  useEffect(() => {
    handleFormatarTexto(textoParaFormatar);
  }, [opcaoFormatacao, habRemoverAcentos]);

  return (
    <>
      {contextHolder}
      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="w-full h-full md:w-4/5 flex flex-col justify-center items-center mt-4 flex-wrap">
          <span className="text-4xl">Formatação de texto</span>
          <div className="flex flex-row mt-8">
            <div className=" flex flex-col items-center gap-4">
              <Input.TextArea
                className="text-md md:w-256 w-96 h-96 md:h-128"
                placeholder="Insira o texto"
                value={textoParaFormatar}
                onChange={(e) => handleFormatarTexto(e.target.value)}
                style={{ resize: "none" }}
                showCount
              />
              <div className="flex flex-col md:flex-row">
                <Radio.Group
                  onChange={(e) => setOpcaoFormatacao(e.target.value)}
                  value={opcaoFormatacao}
                  className="flex flex-col md:flex-row"
                >
                  <Radio value={""}>Normal</Radio>
                  <Radio value={"maiusculo"}>Maiúsculo</Radio>
                  <Radio value={"minusculo"}>Minúsculo</Radio>
                </Radio.Group>
                <Radio checked={habRemoverAcentos} onClick={e => setHabRemoverAcentos(!habRemoverAcentos)}>
                  Removedor de acentos
                </Radio>
                {/* <Radio checked={habRemoverFormatacao} onClick={e => setHabRemoverFormatacao(!habRemoverFormatacao)}>
                  Removedor de formatação
                </Radio> */}
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  className={"w-56"}
                  onClick={(e) => handleCopyToClipboard(textoParaFormatar)}
                >
                  <span className="text-xl">Copiar</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/5 p-4 mt-4 md:mt-0 md:border-l md:border-gray-700">
          <SideBarOtherFeatures ActualFeature="formatacaoTexto" />
        </div>
      </div>
    </>
  );
}
