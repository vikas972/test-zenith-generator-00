
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
  const [isFormValid, setIsFormValid] = useState(false);

  // Reset form state when the dialog opens or closes
  useEffect(() => {
    if (!isOpen) {
      resetState();
    } else {
      // Set default values when dialog opens
      setFileCategory(bundleHasMainFile ? "supporting" : "main");
      setFileBreakBy("userJourney");
      setRequirementType("K4");
      
      // Reset dependent fields
      setRegion("");
      setCountry("");
      setCustomer("");
      
      // Check form validity after setting defaults - using setTimeout to ensure state updates complete
      setTimeout(() => validateForm(), 100);
    }
  }, [isOpen, bundleHasMainFile]);

  // Validate form whenever dependencies change
  useEffect(() => {
    validateForm();
  }, [file, fileName, requirementType, region, country, customer]);

  const validateForm = () => {
    // Basic validation - file and name are always required
    let valid = file !== null && fileName.trim() !== "";
    
    // Add validation for type-specific fields
    if (requirementType === "K2") {
      valid = valid && region.trim() !== "";
    } else if (requirementType === "K3") {
      valid = valid && country.trim() !== "";
    } else if (requirementType === "K4") {
      valid = valid && customer.trim() !== "";
    }
    
    console.log("Form validation:", { 
      file: !!file, 
      fileName: !!fileName.trim(), 
      requirementType,
      region: region.trim(),
      country: country.trim(),
      customer: customer.trim(),
      valid
    });
    
    setIsFormValid(valid);
  };

  const handleAddFile = () => {
    if (file && fileName.trim() && isFormValid) {
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
    setIsFormValid(false);
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

  // Handle customer changes directly in AddFileDialog
  const handleCustomerChange = (selectedCustomer: string) => {
    setCustomer(selectedCustomer);
    validateForm();
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
                setCustomer={handleCustomerChange}
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
              disabled={!isFormValid} 
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
