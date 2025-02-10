
export interface SelectedFile {
  id: string;
  name: string;
  uploadTime: Date;
}

export interface UploadedFile {
  id: string;
  name: string;
  uploadTime: Date;
  status: "parsing" | "completed" | "failed";
}

export interface DocumentContext {
  documentType: string;
  documentFormat: string;
  businessDomain: string;
  agentContext: string;
  outputPreferences: {
    requirementFormat: string;
    validationGranularity: string;
    namingConvention: string;
  };
}

export interface SourceSelectionProps {
  onFileSelect: (file: SelectedFile | null) => void;
}
