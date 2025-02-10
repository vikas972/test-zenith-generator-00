
import { Loader2, XCircle, CheckCircle, RefreshCw, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UploadedFile } from "./types";

interface ImportedFilesTableProps {
  uploadedFiles: UploadedFile[];
  selectedFile: string | null;
  onFileSelect: (fileId: string) => void;
  onRetry: (fileId: string) => void;
  onDelete: (fileId: string) => void;
}

export const ImportedFilesTable = ({
  uploadedFiles,
  selectedFile,
  onFileSelect,
  onRetry,
  onDelete,
}: ImportedFilesTableProps) => {
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
                    onChange={() => onFileSelect(file.id)}
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
                        onClick={() => onRetry(file.id)}
                        className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(file.id)}
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
  );
};
