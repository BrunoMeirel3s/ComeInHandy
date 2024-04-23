import {
  Password,
  Backspace,
  ArrowsDownUp,
  ClipboardText,
  ArticleNyTimes,
  TextIndent
} from "@phosphor-icons/react";

interface CardFeatureProps {
  id: string;
  title: string;
}

export default function CardFeature({ id, title }: CardFeatureProps) {
  return (
    <a
      className="hover:brightness-75 flex flex-row h-14 w-80 rounded-lg overflow-hidden hover:cursor-pointer"
      href={`/${id}`}
    >
      <div className="bg-purple-200 w-1/4 flex items-center justify-center">
        {id === "geradorSenhas" && (
          <Password size={32} style={{ background: "transparent" }} />
        )}
        {id === "formatacaoTexto" && (
          <TextIndent size={32} style={{ background: "transparent" }} />
        )}
        {id === "removedorAcentos" && (
          <Backspace size={32} style={{ background: "transparent" }} />
        )}
        {id === "maisculoMinusculo" && (
          <ArrowsDownUp size={32} style={{ background: "transparent" }} />
        )}
        {id === "copiarEntreDispositivos" && (
          <ClipboardText size={32} style={{ background: "transparent" }} />
        )}
      </div>
      <div className="bg-gray-700 text-xl w-3/4 flex items-center justify-center">
        {title}
      </div>
    </a>
  );
}
