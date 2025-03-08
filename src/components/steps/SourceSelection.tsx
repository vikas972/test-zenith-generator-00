
import { Toaster } from "sonner";
import { SourceSelectionProps } from "./source-selection/types";
import { useSourceSelection } from "./source-selection/hooks/useSourceSelection";
import { SourceSelectionHeader } from "./source-selection/components/SourceSelectionHeader";
import { SourceSelectionContent } from "./source-selection/components/SourceSelectionContent";

export const SourceSelection = ({ onFileSelect }: SourceSelectionProps) => {
  const sourceSelectionState = useSourceSelection(onFileSelect);
  
  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="w-full mx-auto">
        <Toaster position="top-right" />
        <SourceSelectionHeader />
        <SourceSelectionContent {...sourceSelectionState} />
      </div>
    </div>
  );
};
