import { FileText, Cloud, Database, Globe, Loader2, XCircle, CheckCircle, RefreshCw, Trash2 } from "lucide-react";
import { SourceCard } from "../SourceCard";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface UploadedFile {
  id: string;
  name: string;
  uploadTime: Date;
  status: "parsing" | "completed" | "failed";
}

interface SourceSelectionProps {
  onFileSelect: (file: { id: string; name: string; uploadTime: Date } | null) => void;
}

interface DocumentContext {
  documentType: string;
  documentFormat: string;
  businessDomain: string;
  technicalDomain: string;
  compliance: string[];
  systemComponents: string[];
  outputPreferences: {
    requirementFormat: string;
    validationGranularity: string;
    namingConvention: string;
  };
}

export const SourceSelection = ({ onFileSelect }: SourceSelectionProps) => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [documentContext, setDocumentContext] = useState<DocumentContext>({
    documentType: "",
    documentFormat: "",
    businessDomain: "",
    technicalDomain: "",
    compliance: [],
    systemComponents: [],
    outputPreferences: {
      requirementFormat: "REQ-XXX",
      validationGranularity: "detailed",
      namingConvention: "camelCase",
    },
  });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "requirements.doc",
      uploadTime: new Date(),
      status: "completed",
    },
    {
      id: "2",
      name: "test-cases.xlsx",
      uploadTime: new Date(),
      status: "parsing",
    },
    {
      id: "3",
      name: "specifications.pdf",
      uploadTime: new Date(),
      status: "failed",
    },
  ]);

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

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "parsing":
        return <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const sources = [
    {
      id: "jira",
      title: "JIRA",
      description: "Import test cases from JIRA issues and epics",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      id: "confluence",
      title: "Confluence",
      description: "Import from Confluence pages and spaces",
      icon: <Cloud className="w-6 h-6" />,
    },
    {
      id: "local",
      title: "Local Files",
      description: "Import from local files and directories",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      id: "database",
      title: "Database",
      description: "Import from existing test databases",
      icon: <Database className="w-6 h-6" />,
    },
  ];

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Select Source
        </h2>
        <p className="text-gray-600 mb-8">
          Choose your preferred source and provide context for requirement parsing.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sources.map((source) => (
            <SourceCard
              key={source.id}
              title={source.title}
              description={source.description}
              icon={source.icon}
              selected={selectedSource === source.id}
              onClick={() => setSelectedSource(source.id)}
            />
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Document Context</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select
                  onValueChange={(value) => handleContextUpdate("documentType", value)}
                  value={documentContext.documentType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brd">Business Requirements Document</SelectItem>
                    <SelectItem value="srs">Software Requirements Specification</SelectItem>
                    <SelectItem value="userStories">User Stories</SelectItem>
                    <SelectItem value="technicalSpec">Technical Specification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentFormat">Document Format</Label>
                <Select
                  onValueChange={(value) => handleContextUpdate("documentFormat", value)}
                  value={documentContext.documentFormat}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ieee830">IEEE 830</SelectItem>
                    <SelectItem value="agile">Agile User Stories</SelectItem>
                    <SelectItem value="gherkin">Gherkin</SelectItem>
                    <SelectItem value="custom">Custom Format</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDomain">Business Domain</Label>
                <Select
                  onValueChange={(value) => handleContextUpdate("businessDomain", value)}
                  value={documentContext.businessDomain}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technicalDomain">Technical Domain</Label>
                <Select
                  onValueChange={(value) => handleContextUpdate("technicalDomain", value)}
                  value={documentContext.technicalDomain}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select technical domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Application</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="api">API Services</SelectItem>
                    <SelectItem value="desktop">Desktop Application</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="systemComponents">System Components</Label>
                <Textarea 
                  placeholder="Enter system components (one per line)"
                  value={documentContext.systemComponents.join('\n')}
                  onChange={(e) => handleContextUpdate("systemComponents", e.target.value.split('\n'))}
                  className="h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="compliance">Compliance Requirements</Label>
                <Textarea 
                  placeholder="Enter compliance requirements (one per line)"
                  value={documentContext.compliance.join('\n')}
                  onChange={(e) => handleContextUpdate("compliance", e.target.value.split('\n'))}
                  className="h-24"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-sm font-semibold mb-4">Output Preferences</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requirementFormat">Requirement ID Format</Label>
                  <Input 
                    placeholder="e.g., REQ-XXX"
                    value={documentContext.outputPreferences.requirementFormat}
                    onChange={(e) => handleContextUpdate("outputPreferences", {
                      ...documentContext.outputPreferences,
                      requirementFormat: e.target.value
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validationGranularity">Validation Detail Level</Label>
                  <Select
                    onValueChange={(value) => handleContextUpdate("outputPreferences", {
                      ...documentContext.outputPreferences,
                      validationGranularity: value
                    })}
                    value={documentContext.outputPreferences.validationGranularity}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="namingConvention">Naming Convention</Label>
                  <Select
                    onValueChange={(value) => handleContextUpdate("outputPreferences", {
                      ...documentContext.outputPreferences,
                      namingConvention: value
                    })}
                    value={documentContext.outputPreferences.namingConvention}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="camelCase">camelCase</SelectItem>
                      <SelectItem value="PascalCase">PascalCase</SelectItem>
                      <SelectItem value="snake_case">snake_case</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Imported Files</h3>
            <p className="text-sm text-gray-600 mt-1">
              Select a successfully parsed file to proceed
            </p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>File Name</TableHead>
                  <TableHead>Upload Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadedFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <input
                        type="radio"
                        name="selectedFile"
                        checked={selectedFile === file.id}
                        disabled={file.status !== "completed"}
                        onChange={() => handleFileSelect(file.id)}
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>
                      {file.uploadTime.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(file.status)}
                        <span className="text-sm">
                          {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {file.status === "failed" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRetry(file.id)}
                            className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(file.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
