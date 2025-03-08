
import { useState } from "react";
import { FileText, Trash2, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequirementBundle, RequirementFile } from "../types";
import { FileItem } from "./FileItem";

interface BundleItemProps {
  bundle: RequirementBundle;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpand: (bundleId: string) => void;
  onDeleteBundle: (bundleId: string) => void;
  onRetryBundle: (bundleId: string) => void;
  onAddFile: (bundleId: string) => void;
  onDeleteFile: (bundleId: string, fileId: string) => void;
  onSelectBundle: (bundleId: string | null) => void;
}

export const BundleItem = ({
  bundle,
  isExpanded,
  isSelected,
  onToggleExpand,
  onDeleteBundle,
  onRetryBundle,
  onAddFile,
  onDeleteFile,
  onSelectBundle
}: BundleItemProps) => {
  const getBundleStatusColor = (bundle: RequirementBundle) => {
    switch (bundle.status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "parsing":
        return "bg-yellow-100 text-yellow-800";
      case "incomplete":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div 
      key={bundle.id}
      className={`border rounded-lg overflow-hidden transition-all duration-200 ${
        isSelected ? "ring-2 ring-primary" : ""
      }`}
    >
      <div 
        className="flex items-center justify-between bg-gray-50 p-4 cursor-pointer"
        onClick={() => onToggleExpand(bundle.id)}
      >
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-gray-500" />
          <div>
            <div className="font-medium text-gray-900">{bundle.name}</div>
            <div className="text-sm text-gray-500">
              {bundle.files.length} of {bundle.totalFiles} files • 
              {bundle.createdAt.toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getBundleStatusColor(bundle)}`}>
            {bundle.status.charAt(0).toUpperCase() + bundle.status.slice(1)}
          </span>
          
          <div className="flex gap-2">
            {bundle.files.length < bundle.totalFiles && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddFile(bundle.id);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
            
            {bundle.status === "failed" && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRetryBundle(bundle.id);
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteBundle(bundle.id);
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <input
            type="radio"
            checked={isSelected}
            onChange={() => onSelectBundle(bundle.id)}
            onClick={(e) => e.stopPropagation()}
            disabled={bundle.status !== "completed"}
            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
          />
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t">
          {bundle.files.length > 0 ? (
            <div className="space-y-3">
              {bundle.files.map(file => (
                <FileItem 
                  key={file.id} 
                  file={file} 
                  onDeleteFile={() => onDeleteFile(bundle.id, file.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-gray-500">
              No files in this bundle yet.
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onAddFile(bundle.id)}
                className="ml-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add File
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
