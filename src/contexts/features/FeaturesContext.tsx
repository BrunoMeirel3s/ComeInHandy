import { ReactNode, createContext, useEffect, useRef, useState } from "react";

interface Feature {
  id: string;
  title: string;
}

interface FeaturesContextType {
  features: Feature[];
}

interface FeaturesProviderProps {
  children: ReactNode;
}

export const FeaturesContext = createContext({} as FeaturesContextType);

export function FeaturesProvider({ children }: FeaturesProviderProps) {
  const features = [
    {
      id: "geradorSenhas",
      title: "Gerador de senhas",
    },
    {
      id: "removedorFormatacao",
      title: "Removedor de formatação",
    },
    {
      id: "removedorAcentos",
      title: "Removedor de acentos",
    },
    {
      id: "maisculoMinusculo",
      title: "Maiúsculo e minúsculo",
    },
    {
      id: "copiarEntreDispositivos",
      title: "Copiar entre dispositivos",
    },
  ];

  return (
    <FeaturesContext.Provider value={{ features }}>
      {children}
    </FeaturesContext.Provider>
  );
}
