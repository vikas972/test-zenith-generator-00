
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
      prev.map(b => 
        b.id === bundleId 
          ? { 
              ...b, 
              status: "importing",
              files: b.files.map(f => ({ ...f, status: "importing" }))
            } 
          : b
      )
    );

    toast.success(`Importing bundle "${bundle.name}"...`);

    // Simulate the import process with a delay
    setTimeout(() => {
      setBundles(prev => 
        prev.map(b => 
          b.id === bundleId 
            ? { 
                ...b, 
                status: "imported",
                files: b.files.map(f => ({ ...f, status: "imported" }))
              } 
            : b
        )
      );
      toast.success(`Bundle "${bundle.name}" imported successfully`);
    }, 3000);
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
