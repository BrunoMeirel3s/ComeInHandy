import { FeaturesContext } from "@/contexts/features/FeaturesContext";
import { useContext } from "react";
import CardFeature from "../molecules/CardFeature";

interface SideBarOtherFeaturesProps {
  ActualFeature: string;
}
export default function SideBarOtherFeatures({
  ActualFeature,
}: SideBarOtherFeaturesProps) {
  const { features } = useContext(FeaturesContext);
  const otherFeatures = features.filter(
    (feature) => feature.id !== ActualFeature
  );
  return (
    <div>
      <p className="text-xl">Outras Funcionalidades</p>
      <div className="flex flex-col gap-4 mt-4 items-center md:items-start">
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
  );
}
