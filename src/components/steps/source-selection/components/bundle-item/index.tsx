
import { useState } from "react";
import { Plus } from "lucide-react";
import { RequirementBundle } from "../../types";
import { BundleHeader } from "./BundleHeader";
import { BundleActions } from "./BundleActions";
import { BundleContent } from "./BundleContent";

interface BundleItemProps {
  bundle: RequirementBundle;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpand: (bundleId: string) => void;
  onDeleteBundle: (bundleId: string) => void;
  onRetryBundle: (bundleId: string) => void;
  onAddFile: (bundleId: string) => void;
  onDeleteFile: (bundleId: string, fileId: string) => void;
  onSelectBundle: (bundleId: string | null) => void;
  onImportBundle: (bundleId: string) => void;
}

export const BundleItem = ({
  bundle,
  isExpanded,
  isSelected,
  onToggleExpand,
  onDeleteBundle,
  onRetryBundle,
  onAddFile,
  onDeleteFile,
  onSelectBundle,
  onImportBundle
}: BundleItemProps) => {
  const [isImporting, setIsImporting] = useState(false);
  
  // Enable radio button when all files are added to the bundle
  const isAllFilesAdded = bundle.files.length >= bundle.totalFiles;

  const handleImport = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImporting(true);
    onImportBundle(bundle.id);
  };

  return (
    <div 
      key={bundle.id}
      className={`border rounded-lg overflow-hidden transition-all duration-200 ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
    >
      <div 
        className="flex items-center justify-between bg-gray-50 p-4 cursor-pointer"
        onClick={() => onToggleExpand(bundle.id)}
      >
        <BundleHeader bundle={bundle} />
        
        <BundleActions 
          bundle={bundle}
          onAddFile={(e) => {
            e.stopPropagation();
            onAddFile(bundle.id);
          }}
          onRetryBundle={(e) => {
            e.stopPropagation();
            onRetryBundle(bundle.id);
          }}
          onDeleteBundle={(e) => {
            e.stopPropagation();
            onDeleteBundle(bundle.id);
          }}
          isSelected={isSelected}
          onSelectBundle={() => onSelectBundle(isSelected ? null : bundle.id)}
          isAllFilesAdded={isAllFilesAdded}
        />
      </div>
      
      {isExpanded && (
        <BundleContent 
          bundle={bundle}
          onAddFile={() => onAddFile(bundle.id)}
          onDeleteFile={(fileId) => onDeleteFile(bundle.id, fileId)}
          onImport={handleImport}
          isImporting={isImporting}
          isSelected={isSelected}
        />
      )}
    </div>
  );
};
