import { ReactNode, createContext, useEffect, useRef, useState } from "react";

interface Feature {
  id: string;
  title: string;
}

interface FeaturesContextType {
  features: Feature[];
  generateRandomPassword: (
    length: number,
    includeUppercase: boolean,
    includeNumbers: boolean,
    includeSymbols: boolean,
    hexadecimalOnly: boolean
  ) => string;
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
    const symbolChars = includeSymbols ? "@#$%^&*()-+=\\:;'<>.?/" : "";

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

  return (
    <FeaturesContext.Provider value={{ features, generateRandomPassword }}>
      {children}
    </FeaturesContext.Provider>
  );
}
