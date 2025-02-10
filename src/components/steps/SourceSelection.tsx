
import { useState } from "react";
import { toast } from "sonner";
import { ImportSourcesGrid } from "./source-selection/ImportSourcesGrid";
import { DocumentContextSection } from "./source-selection/DocumentContextSection";
import { ImportedFilesTable } from "./source-selection/ImportedFilesTable";
import { DocumentContext, SourceSelectionProps, UploadedFile } from "./source-selection/types";

export const SourceSelection = ({ onFileSelect }: SourceSelectionProps) => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isContextExpanded, setIsContextExpanded] = useState(false);
  const [documentContext, setDocumentContext] = useState<DocumentContext>({
    documentType: "",
    documentFormat: "",
    businessDomain: "",
    agentContext: "",
    outputPreferences: {
      requirementFormat: "REQ-XXX",
      validationGranularity: "detailed",
      namingConvention: "camelCase",
    },
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "PaymentService_Requirements.doc",
      uploadTime: new Date(2024, 2, 15, 10, 30),
      status: "completed"
    },
    {
      id: "2",
      name: "TradeFinance_Specs.pdf",
      uploadTime: new Date(2024, 2, 15, 11, 45),
      status: "completed"
    },
    {
      id: "3",
      name: "SupplyChain_SRS.docx",
      uploadTime: new Date(2024, 2, 15, 14, 20),
      status: "parsing"
    }
  ]);

  const handleSourceFileSelect = (file: File) => {
    // Create a new uploaded file entry
    const newFile: UploadedFile = {
      id: String(uploadedFiles.length + 1),
      name: file.name,
      uploadTime: new Date(),
      status: "parsing",
    };
    
    setUploadedFiles(prev => [...prev, newFile]);
    
    // Set document context with the file name when selected from source
    setDocumentContext({
      documentType: "srs",
      documentFormat: "ieee830",
      businessDomain: "payments",
      agentContext: `Processing ${file.name}`,
      outputPreferences: {
        requirementFormat: "REQ-PAY-XXX",
        validationGranularity: "detailed",
        namingConvention: "camelCase",
      },
    });

    // Set context section to expanded when a file is selected from source
    setIsContextExpanded(true);
    
    toast.success(`File "${file.name}" selected for processing`);

    // Simulate file processing completion
    setTimeout(() => {
      setUploadedFiles(prev =>
        prev.map(f =>
          f.id === newFile.id ? { ...f, status: "completed" } : f
        )
      );
      onFileSelect({
        id: newFile.id,
        name: file.name,
        uploadTime: new Date()
      });
    }, 2000);
  };

  const handleFileSelect = (fileId: string) => {
    setSelectedFile(fileId);
    const file = uploadedFiles.find(f => f.id === fileId);
    if (file && file.status === "completed") {
      onFileSelect(file);
    } else {
      onFileSelect(null);
    }
  };

  const handleContextUpdate = (field: keyof DocumentContext, value: any) => {
    setDocumentContext(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRetry = (fileId: string) => {
    setUploadedFiles(files =>
      files.map(file =>
        file.id === fileId ? { ...file, status: "parsing" as const } : file
      )
    );
    toast.success("Retrying file parsing...");
  };

  const handleDelete = (fileId: string) => {
    setUploadedFiles(files => files.filter(file => file.id !== fileId));
    if (selectedFile === fileId) {
      setSelectedFile(null);
    }
    toast.success("File deleted successfully");
  };

  const handleImport = () => {
    toast.success("File imported successfully");
  };

  const handleReset = () => {
    if (selectedFile) {
      setDocumentContext({
        documentType: "srs",
        documentFormat: "ieee830",
        businessDomain: "payments",
        agentContext: "This is a corporate banking application focused on payment processing.",
        outputPreferences: {
          requirementFormat: "REQ-PAY-XXX",
          validationGranularity: "detailed",
          namingConvention: "camelCase",
        },
      });
      toast.success("Reset to SPA agent's default values");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Select Source
        </h2>
        <p className="text-gray-600 mb-8">
          Choose your preferred source and provide context for requirement parsing.
        </p>

        <ImportSourcesGrid
          selectedSource={selectedSource}
          onSourceSelect={setSelectedSource}
          onFileSelect={handleSourceFileSelect}
        />

        <DocumentContextSection
          isExpanded={isContextExpanded}
          onToggleExpand={() => setIsContextExpanded(!isContextExpanded)}
          selectedFile={selectedFile}
          uploadedFiles={uploadedFiles}
          documentContext={documentContext}
          onContextUpdate={handleContextUpdate}
          onReset={handleReset}
          onImport={handleImport}
        />

        <ImportedFilesTable
          uploadedFiles={uploadedFiles}
          selectedFile={selectedFile}
          onFileSelect={handleFileSelect}
          onRetry={handleRetry}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
