
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
  const [pendingFile, setPendingFile] = useState<File | null>(null);
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

  // Initialize with default files
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "requirements.pdf",
      uploadTime: new Date("2024-01-15T10:00:00"),
      status: "completed",
    },
    {
      id: "2",
      name: "specifications.docx",
      uploadTime: new Date("2024-01-16T14:30:00"),
      status: "completed",
    },
    {
      id: "3",
      name: "test-cases.xlsx",
      uploadTime: new Date("2024-01-17T09:15:00"),
      status: "failed",
    }
  ]);

  const handleSourceFileSelect = (file: File) => {
    setPendingFile(file);
    setIsContextExpanded(true);
    
    // Set document context with the file name when selected from source
    setDocumentContext({
      documentType: "",
      documentFormat: "",
      businessDomain: "",
      agentContext: `Processing ${file.name}`,
      outputPreferences: {
        requirementFormat: "REQ-XXX",
        validationGranularity: "detailed",
        namingConvention: "camelCase",
      },
    });
    
    toast.success(`File "${file.name}" selected for processing`);
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
    if (!pendingFile) {
      toast.error("No file selected to import");
      return;
    }

    // Create a new uploaded file entry
    const newFile: UploadedFile = {
      id: String(Date.now()),
      name: pendingFile.name,
      uploadTime: new Date(),
      status: "parsing",
    };
    
    setUploadedFiles(prev => [...prev, newFile]);
    
    // Simulate file processing completion
    setTimeout(() => {
      setUploadedFiles(prev =>
        prev.map(f =>
          f.id === newFile.id ? { ...f, status: "completed" } : f
        )
      );
    }, 2000);

    // Clear the pending file after import
    setPendingFile(null);
    setIsContextExpanded(false);
    setDocumentContext({
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
    
    toast.success("File imported successfully");
  };

  const handleReset = () => {
    if (pendingFile) {
      setDocumentContext({
        documentType: "",
        documentFormat: "",
        businessDomain: "",
        agentContext: `Processing ${pendingFile.name}`,
        outputPreferences: {
          requirementFormat: "REQ-XXX",
          validationGranularity: "detailed",
          namingConvention: "camelCase",
        },
      });
      toast.success("Reset to default values");
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
          pendingFile={pendingFile}
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
