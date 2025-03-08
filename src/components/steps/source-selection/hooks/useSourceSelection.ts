
import { useSelectionState } from "./useSelectionState";
import { useBundleOperations } from "./useBundleOperations";
import { useFileSelection } from "./useFileSelection";
import { useGlobalParameters } from "./useGlobalParameters";
import { SelectedFile } from "../types";

export const useSourceSelection = (onFileSelect: (file: SelectedFile | null) => void) => {
  const { 
    selectedSource, 
    setSelectedSource, 
    selectedBundleId, 
    handleSelectBundle 
  } = useSelectionState(onFileSelect);
  
  const {
    bundles,
    handleBundleAdd,
    handleBundleUpdate,
    handleBundleDelete,
    handleBundleRetry,
    handleBundleImport
  } = useBundleOperations();
  
  const { globalParameters, handleGlobalParametersChange } = useGlobalParameters();
  
  const { handleSourceFileSelect } = useFileSelection(
    selectedSource, 
    handleBundleUpdate,
    handleBundleAdd
  );

  return {
    selectedSource,
    setSelectedSource,
    selectedBundleId,
    bundles,
    globalParameters,
    handleSourceFileSelect,
    handleBundleAdd,
    handleBundleUpdate,
    handleBundleDelete: (bundleId: string) => handleBundleDelete(bundleId, selectedBundleId, (id) => handleSelectBundle(id, bundles)),
    handleBundleRetry,
    handleBundleImport,
    handleSelectBundle: (bundleId: string | null) => handleSelectBundle(bundleId, bundles),
    handleGlobalParametersChange
  };
};
