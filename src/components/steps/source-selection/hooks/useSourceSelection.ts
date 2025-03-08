
import { useState } from "react";
import { toast } from "sonner";
import { 
  RequirementBundle, 
  RequirementFile,
  GlobalParameters,
  SelectedFile
} from "../types";

export const useSourceSelection = (onFileSelect: (file: SelectedFile | null) => void) => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const [bundles, setBundles] = useState<RequirementBundle[]>([]);
  const [globalParameters, setGlobalParameters] = useState<GlobalParameters>({
    product: "",
    subProduct: "",
    domain: "",
    requirementType: "",
    region: "",
    country: "",
    customer: ""
  });

  const handleSourceFileSelect = (file: File) => {
    if (!selectedSource) {
      toast.error("Please select a source type first");
      return;
    }
    
    // When a file is selected via the import sources grid,
    // we'll create a new bundle with this file
    const newBundle: RequirementBundle = {
      id: `bundle-${Date.now()}`,
      name: `Bundle from ${file.name}`,
      createdAt: new Date(),
      source: selectedSource,
      files: [],
      totalFiles: 1,
      status: "incomplete"
    };

    setBundles(prev => [...prev, newBundle]);
    
    // Simulate adding the file to the bundle
    setTimeout(() => {
      handleBundleUpdate(
        newBundle.id, 
        [{
          id: `file-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ""),
          uploadTime: new Date(),
          category: "main",
          breakRequirementsBy: "section",
          context: "",
          status: "parsing",
          file
        }]
      );

      // Simulate parsing completion
      setTimeout(() => {
        setBundles(prev => 
          prev.map(b => 
            b.id === newBundle.id 
              ? { 
                  ...b, 
                  status: "completed",
                  files: b.files.map(f => ({ ...f, status: "completed" }))
                } 
              : b
          )
        );
      }, 2000);
    }, 500);
    
    toast.success(`File "${file.name}" selected for processing`);
  };

  const handleBundleAdd = (bundle: RequirementBundle) => {
    setBundles(prev => [...prev, bundle]);
  };

  const handleBundleUpdate = (bundleId: string, files: RequirementFile[]) => {
    setBundles(prev => 
      prev.map(bundle => {
        if (bundle.id === bundleId) {
          // Update bundle status based on file count and statuses
          let status: RequirementBundle["status"] = "incomplete";
          
          if (files.length >= bundle.totalFiles) {
            // If all files are complete, the bundle is complete
            if (files.every(f => f.status === "completed")) {
              status = "completed";
            }
            // If any file failed, the bundle failed
            else if (files.some(f => f.status === "failed")) {
              status = "failed";
            }
            // If some files are still parsing, the bundle is parsing
            else if (files.some(f => f.status === "parsing")) {
              status = "parsing";
            }
          }
          
          return { ...bundle, files, status };
        }
        return bundle;
      })
    );
  };

  const handleBundleDelete = (bundleId: string) => {
    setBundles(prev => prev.filter(b => b.id !== bundleId));
    if (selectedBundleId === bundleId) {
      setSelectedBundleId(null);
      onFileSelect(null);
    }
    toast.success("Bundle deleted successfully");
  };

  const handleBundleRetry = (bundleId: string) => {
    setBundles(prev => 
      prev.map(bundle => {
        if (bundle.id === bundleId) {
          return { 
            ...bundle, 
            status: "parsing",
            files: bundle.files.map(f => 
              f.status === "failed" ? { ...f, status: "parsing" } : f
            )
          };
        }
        return bundle;
      })
    );
    
    // Simulate parsing completion
    setTimeout(() => {
      setBundles(prev => 
        prev.map(bundle => {
          if (bundle.id === bundleId) {
            return { 
              ...bundle, 
              status: "completed",
              files: bundle.files.map(f => ({ ...f, status: "completed" }))
            };
          }
          return bundle;
        })
      );
    }, 2000);
    
    toast.success("Retrying bundle processing...");
  };

  const handleSelectBundle = (bundleId: string | null) => {
    setSelectedBundleId(bundleId);
    
    if (bundleId) {
      const bundle = bundles.find(b => b.id === bundleId);
      if (bundle && bundle.status === "completed") {
        // Convert the bundle to the format expected by the onFileSelect prop
        const mainFile = bundle.files.find(f => f.category === "main");
        if (mainFile) {
          onFileSelect({
            id: mainFile.id,
            name: mainFile.name,
            uploadTime: mainFile.uploadTime
          });
          toast.success(`Selected bundle: ${bundle.name}`);
        }
      } else {
        onFileSelect(null);
      }
    } else {
      onFileSelect(null);
    }
  };

  const handleGlobalParametersChange = (params: GlobalParameters) => {
    setGlobalParameters(params);
  };

  return {
    selectedSource,
    setSelectedSource,
    selectedBundleId,
    bundles,
    globalParameters,
    handleSourceFileSelect,
    handleBundleAdd,
    handleBundleUpdate,
    handleBundleDelete,
    handleBundleRetry,
    handleSelectBundle,
    handleGlobalParametersChange
  };
};
