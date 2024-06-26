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

  const {
    textoSalvarCopiar,
    handleSetTextoSalvarCopiar,
    getTextFeatureCopiarEntreDispositivos,
    putTextFeatureCopiarEntreDispositivos,
  } = useContext(FeaturesContext);

  const { data: session } = useSession();

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

  async function handleLimparTexto() {
    const response = await putTextFeatureCopiarEntreDispositivos("");

    response.error === false &&
      api.info({
        message: `Texto apagado`,
        description: `Texto apagado com sucesso!`,
        placement: "bottomRight",
        duration: 5,
      });

    response.error === false && handleSetTextoSalvarCopiar("");
  }

  async function handleSalvarTexto(text: string) {
    const response = await putTextFeatureCopiarEntreDispositivos(`${text}`);

    response.error === false &&
      api.success({
        message: `Texto salvo!`,
        description: `Texto salvo com sucesso!`,
        placement: "bottomRight",
        duration: 5,
      });
  }

  useEffect(() => {
    getTextFeatureCopiarEntreDispositivos();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="w-full h-full md:w-4/5 flex flex-col justify-center items-center mt-4 flex-wrap">
          <span className="text-4xl">Copiar entre dispositivos</span>
          <div className="flex flex-row mt-8">
            {session ? (
              <>
                <div className=" flex flex-col items-center gap-4">
                  <Input.TextArea
                    className="text-md md:w-256 w-96 h-96 md:h-128"
                    placeholder="Insira o texto que deseja salvar"
                    value={textoSalvarCopiar}
                    onChange={(e) => handleSetTextoSalvarCopiar(e.target.value)}
                    style={{ resize: "none" }}
                    showCount
                  />
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button
                      className={"w-56"}
                      onClick={(e) => handleSalvarTexto(textoSalvarCopiar)}
                    >
                      <span className="text-xl">Salvar</span>
                    </Button>
                    <Button
                      className={"w-56"}
                      onClick={(e) => handleCopyToClipboard(textoSalvarCopiar)}
                    >
                      <span className="text-xl">Copiar</span>
                    </Button>
                    <Button
                      className={"w-56"}
                      onClick={(e) => handleLimparTexto()}
                    >
                      <span className="text-xl">Limpar</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col md:flex-row items-center justify-around mt-8">
                  <div>
                    <img src="login_warning.svg" alt="Aviso de Login" width={400} />
                  </div>
                  <div className="w-full md:w-1/3 mt-6 md:mt-0">
                    <p className="text-3xl text-gray-100 text-center text-bold">
                      Para utilizar esta funcionalidade realize o login no menu
                      acima
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/5 p-4 mt-4 md:mt-0 md:border-l md:border-gray-700">
          <SideBarOtherFeatures ActualFeature="copiarEntreDispositivos" />
        </div>
      </div>
    </>
  );
}
