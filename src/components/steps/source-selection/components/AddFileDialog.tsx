
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileUploadArea } from "./file-dialog/FileUploadArea";
import { FileMetadataForm } from "./file-dialog/FileMetadataForm";
import { REGIONS, COUNTRIES, CUSTOMERS } from "../types";

interface AddFileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFile: (
    file: File, 
    name: string, 
    category: "main" | "supporting", 
    breakBy: "userJourney" | "userStories" | "section" | "paragraph" | "page",
    context: string,
    requirementType: string,
    region?: string,
    country?: string,
    customer?: string
  ) => void;
  bundleHasMainFile: boolean;
}

export const AddFileDialog = ({
  isOpen,
  onOpenChange,
  onAddFile,
  bundleHasMainFile
}: AddFileDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileCategory, setFileCategory] = useState<"main" | "supporting">("main");
  const [fileBreakBy, setFileBreakBy] = useState<"userJourney" | "userStories" | "section" | "paragraph" | "page">("userJourney");
  const [fileContext, setFileContext] = useState("");
  const [requirementType, setRequirementType] = useState("K4");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [customer, setCustomer] = useState("");

  // Reset form state when the dialog opens or closes
  useEffect(() => {
    if (!isOpen) {
      resetState();
    } else {
      // Set default values when dialog opens
      setFileCategory(bundleHasMainFile ? "supporting" : "main");
      setFileBreakBy("userJourney");
      setRequirementType("K4");
    }
  }, [isOpen, bundleHasMainFile]);

  const handleAddFile = () => {
    if (file && fileName.trim()) {
      onAddFile(
        file, 
        fileName, 
        fileCategory, 
        fileBreakBy, 
        fileContext, 
        requirementType,
        requirementType === "K2" ? region : undefined,
        requirementType === "K3" ? country : undefined,
        requirementType === "K4" ? customer : undefined
      );
      resetState();
    }
  };

  const resetState = () => {
    setFile(null);
    setFileName("");
    setFileCategory("main");
    setFileBreakBy("userJourney");
    setFileContext("");
    setRequirementType("K4");
    setRegion("");
    setCountry("");
    setCustomer("");
  };

  // Update filename when file changes
  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    if (newFile) {
      setFileName(newFile.name.replace(/\.[^/.]+$/, ""));
    }
  };

  // Get available countries based on selected region
  const getAvailableCountries = () => {
    if (region && COUNTRIES[region as keyof typeof COUNTRIES]) {
      return COUNTRIES[region as keyof typeof COUNTRIES];
    }
    return [];
  };

  // Get available customers based on selected country
  const getAvailableCustomers = () => {
    if (country && CUSTOMERS[country as keyof typeof CUSTOMERS]) {
      return CUSTOMERS[country as keyof typeof CUSTOMERS];
    }
    return [];
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader className="py-2">
          <DialogTitle>Add File to Bundle</DialogTitle>
        </DialogHeader>
        
        <div className="flex-grow overflow-hidden">
          <ScrollArea className="pr-4 h-[calc(90vh-160px)]">
            <div className="space-y-3 py-2">
              <FileUploadArea 
                file={file} 
                setFile={handleFileChange} 
              />
              
              <FileMetadataForm 
                fileName={fileName}
                setFileName={setFileName}
                fileCategory={fileCategory}
                setFileCategory={setFileCategory}
                fileBreakBy={fileBreakBy}
                setFileBreakBy={setFileBreakBy}
                fileContext={fileContext}
                setFileContext={setFileContext}
                requirementType={requirementType}
                setRequirementType={setRequirementType}
                bundleHasMainFile={bundleHasMainFile}
                region={region}
                setRegion={setRegion}
                country={country}
                setCountry={setCountry}
                customer={customer}
                setCustomer={setCustomer}
                regions={REGIONS}
                countries={getAvailableCountries()}
                customers={getAvailableCustomers()}
                showRegion={requirementType === "K2"}
                showCountry={requirementType === "K3"}
                showCustomer={requirementType === "K4"}
              />
            </div>
          </ScrollArea>
        </div>
        
        <DialogFooter className="pt-4 flex-shrink-0 w-full border-t mt-2">
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={() => onOpenChange(false)} size="sm">
              Cancel
            </Button>
            <Button 
              onClick={handleAddFile} 
              disabled={!file || !fileName || !requirementType || 
                (requirementType === "K2" && !region) ||
                (requirementType === "K3" && !country) ||
                (requirementType === "K4" && !customer)
              } 
              size="sm"
            >
              Add File
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
