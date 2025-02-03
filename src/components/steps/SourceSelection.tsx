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

interface UploadedFile {
  id: string;
  name: string;
  uploadTime: Date;
  status: "parsing" | "completed" | "failed";
}

interface SourceSelectionProps {
  onFileSelect: (file: { id: string; name: string; uploadTime: Date } | null) => void;
}

export const SourceSelection = ({ onFileSelect }: SourceSelectionProps) => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 animate-fade-in">
          Select Source
        </h2>
        <p className="text-gray-600 mb-8 animate-fade-in">
          Choose your preferred source to import test cases and begin the generation process.
        </p>
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in mb-12">
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

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
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
