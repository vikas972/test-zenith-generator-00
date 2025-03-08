
import { useState } from "react";
import { toast } from "sonner";
import { RequirementBundle, RequirementFile } from "../types";

export const useBundleOperations = () => {
  const [bundles, setBundles] = useState<RequirementBundle[]>([]);

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
            // If any file is importing, the bundle is importing
            else if (files.some(f => f.status === "importing")) {
              status = "importing";
            }
            // If any file is imported, check if all are imported
            else if (files.some(f => f.status === "imported")) {
              status = files.every(f => f.status === "imported") ? "imported" : "incomplete";
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

  const handleBundleDelete = (bundleId: string, selectedBundleId: string | null, onBundleSelect: (bundleId: string | null) => void) => {
    setBundles(prev => prev.filter(b => b.id !== bundleId));
    if (selectedBundleId === bundleId) {
      onBundleSelect(null);
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

  const handleBundleImport = (bundleId: string) => {
    const bundle = bundles.find(b => b.id === bundleId);
    if (!bundle) {
      toast.error("Bundle not found");
      return;
    }

    if (bundle.status !== "completed") {
      toast.error("Bundle must be completed before importing");
      return;
    }

    // Set the bundle status to importing
    setBundles(prev => 
      prev.map(b => {
        if (b.id === bundleId) {
          const updatedFiles = b.files.map(f => {
            // Explicitly cast the status to ensure type safety
            const newStatus: RequirementFile["status"] = "importing";
            return { ...f, status: newStatus };
          });
          
          return { 
            ...b, 
            status: "importing" as RequirementBundle["status"],
            files: updatedFiles
          };
        }
        return b;
      })
    );

    toast.success(`Importing bundle "${bundle.name}"...`);

    // Simulate the import process for each file with sequential delays
    bundle.files.forEach((file, index) => {
      setTimeout(() => {
        setBundles(prev => 
          prev.map(b => {
            if (b.id === bundleId) {
              const updatedFiles = b.files.map((f, fileIndex) => {
                if (f.id === file.id) {
                  // Explicitly type the status
                  const newStatus: RequirementFile["status"] = "imported";
                  return { ...f, status: newStatus };
                }
                return f;
              });
              
              // If all files are imported, update the bundle status
              const allImported = updatedFiles.every(f => f.status === "imported");
              // Explicitly type the status
              const newStatus: RequirementBundle["status"] = allImported ? "imported" : "importing";
              
              return { ...b, files: updatedFiles, status: newStatus };
            }
            return b;
          })
        );
        
        // Show toast when the last file is imported
        if (index === bundle.files.length - 1) {
          toast.success(`Bundle "${bundle.name}" imported successfully`);
        }
      }, 1000 + (index * 1000)); // Stagger imports by 1 second per file
    });
  };

  return {
    bundles,
    handleBundleAdd,
    handleBundleUpdate,
    handleBundleDelete,
    handleBundleRetry,
    handleBundleImport
  };
};
