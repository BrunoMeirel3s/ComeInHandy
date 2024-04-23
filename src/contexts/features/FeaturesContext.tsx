import axios from "axios";
import { ReactNode, createContext, useEffect, useRef, useState } from "react";

interface Feature {
  id: string;
  title: string;
}

interface DefaultResponse {
  error: boolean;
  message: string;
  data: {};
}

interface FeaturesContextType {
  features: Feature[];
  textoSalvarCopiar: string;
  generateRandomPassword: (
    length: number,
    includeUppercase: boolean,
    includeNumbers: boolean,
    includeSymbols: boolean,
    hexadecimalOnly: boolean
  ) => string;
  handleSetTextoSalvarCopiar: (text: string) => void;
  getTextFeatureCopiarEntreDispositivos: () => void;
  putTextFeatureCopiarEntreDispositivos: (
    text: string
  ) => Promise<DefaultResponse>;
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
      id: "formatacaoTexto",
      title: "Formatação de Texto",
    },
    {
      id: "copiarEntreDispositivos",
      title: "Copiar entre dispositivos",
    },
  ];
  const [textoSalvarCopiar, setTextoSalvarCopiar] = useState<string>("");

  function generateRandomPassword(
    length,
    includeUppercase = true,
    includeNumbers = true,
    includeSymbols = true,
    hexadecimalOnly = false
  ) {
    // Character sets for different categories
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = includeUppercase ? lowercaseChars.toUpperCase() : "";
    const numberChars = includeNumbers ? "0123456789" : "";
    const symbolChars = includeSymbols ? "@#$%^&*()-+=:;'<>.?" : "";

    // Combine character sets based on flags
    let charSet = lowercaseChars;
    if (includeUppercase) charSet += uppercaseChars;
    if (includeNumbers) charSet += numberChars;
    if (includeSymbols) charSet += symbolChars;

    // Handle hexadecimal-only case
    if (hexadecimalOnly) {
      charSet = "0123456789abcdef";
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet.charAt(randomIndex);
    }

    return password;
  }

  function handleSetTextoSalvarCopiar(text: string) {
    setTextoSalvarCopiar(text);
  }

  async function getTextFeatureCopiarEntreDispositivos() {
    await axios
      .get("/api/copiarEntreDispositivos?action=get")
      .then((response) => {
        setTextoSalvarCopiar(response.data.data.text);
      })
      .catch((err) => {
        setTextoSalvarCopiar("");
      });
  }

  async function putTextFeatureCopiarEntreDispositivos(
    text: string
  ): Promise<DefaultResponse> {
    const response = (await axios
      .get(`/api/copiarEntreDispositivos?action=update&text=${encodeURIComponent(text)}`)
      .then((response) => response?.data)
      .catch((err) => err.response?.data)) as DefaultResponse;

    return response;
  }

  return (
    <FeaturesContext.Provider
      value={{
        features,
        textoSalvarCopiar,
        generateRandomPassword,
        handleSetTextoSalvarCopiar,
        getTextFeatureCopiarEntreDispositivos,
        putTextFeatureCopiarEntreDispositivos,
      }}
    >
      {children}
    </FeaturesContext.Provider>
  );
}
