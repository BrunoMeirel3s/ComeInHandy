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

export default function CopiarEntreDispositivos() {
  const { generateRandomPassword } = useContext(FeaturesContext);
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [api, contextHolder] = notification.useNotification();
  const [textoSalvarCopiar, setTextoSalvarCopiar] = useState<string>("");



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

  return (
    <>
      {contextHolder}
      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="w-full h-full md:w-4/5 flex flex-col justify-center items-center mt-4 flex-wrap">
          <span className="text-4xl">Copiar entre dispositivos</span>
          <div className="flex flex-row mt-8">
            <div className=" flex flex-col items-center gap-4">
              <Input.TextArea
                className="text-md md:w-256 w-96 h-30 md:h-128"
                placeholder="Insira o texto que deseja salvar"
                value={textoSalvarCopiar}
                onChange={(e) => setTextoSalvarCopiar(e.target.value)}
                style={{ resize: "none" }}
                showCount
              />
              <Button
                className={"w-56"}
                onClick={(e) => handleCopyToClipboard(textoSalvarCopiar)}
              >
                <span className="text-xl">Copiar</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/5 p-4 mt-4 md:mt-0 md:border-l md:border-gray-700">
          <SideBarOtherFeatures ActualFeature="copiarEntreDispositivos" />
        </div>
      </div>
    </>
  );
}
