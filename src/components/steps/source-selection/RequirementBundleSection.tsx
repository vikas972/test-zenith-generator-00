
import { useState } from "react";
import { toast } from "sonner";
import { FileText, Trash2, RefreshCw, X, Plus, Check, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RequirementBundle, RequirementFile } from "./types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface RequirementBundleSectionProps {
  bundles: RequirementBundle[];
  onBundleAdd: (bundle: RequirementBundle) => void;
  onBundleUpdate: (bundleId: string, files: RequirementFile[]) => void;
  onBundleDelete: (bundleId: string) => void;
  onBundleRetry: (bundleId: string) => void;
  onSelectBundle: (bundleId: string | null) => void;
  selectedBundleId: string | null;
}

export const RequirementBundleSection = ({
  bundles,
  onBundleAdd,
  onBundleUpdate,
  onBundleDelete,
  onBundleRetry,
  onSelectBundle,
  selectedBundleId
}: RequirementBundleSectionProps) => {
  const [isNewBundleDialogOpen, setIsNewBundleDialogOpen] = useState(false);
  const [isAddFileDialogOpen, setIsAddFileDialogOpen] = useState(false);
  const [newBundleName, setNewBundleName] = useState("");
  const [newBundleTotalFiles, setNewBundleTotalFiles] = useState(1);
  const [expandedBundles, setExpandedBundles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // For the add file dialog
  const [selectedBundleForFile, setSelectedBundleForFile] = useState<string | null>(null);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newFileName, setNewFileName] = useState("");
  const [newFileCategory, setNewFileCategory] = useState<"main" | "supporting">("supporting");
  const [newFileBreakBy, setNewFileBreakBy] = useState<"userJourney" | "userStories" | "section" | "paragraph" | "page">("section");
  const [newFileContext, setNewFileContext] = useState("");

  const toggleExpandBundle = (bundleId: string) => {
    setExpandedBundles(prev => 
      prev.includes(bundleId) 
        ? prev.filter(id => id !== bundleId)
        : [...prev, bundleId]
    );
  };

  const handleCreateNewBundle = () => {
    if (!newBundleName.trim()) {
      toast.error("Bundle name is required");
      return;
    }

    const newBundle: RequirementBundle = {
      id: `bundle-${Date.now()}`,
      name: newBundleName,
      createdAt: new Date(),
      files: [],
      totalFiles: newBundleTotalFiles,
      status: "incomplete"
    };

    onBundleAdd(newBundle);
    setNewBundleName("");
    setNewBundleTotalFiles(1);
    setIsNewBundleDialogOpen(false);
    toast.success("New requirement bundle created");
  };

  const handleAddFileToBundle = (bundleId: string) => {
    setSelectedBundleForFile(bundleId);
    setIsAddFileDialogOpen(true);
    setNewFile(null);
    setNewFileName("");
    setNewFileCategory("supporting");
    setNewFileBreakBy("section");
    setNewFileContext("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewFile(file);
      setNewFileName(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      setNewFile(file);
      setNewFileName(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleAddFile = () => {
    if (!selectedBundleForFile || !newFileName.trim() || !newFile) {
      toast.error("File and name are required");
      return;
    }

    const bundle = bundles.find(b => b.id === selectedBundleForFile);
    
    if (!bundle) {
      toast.error("Bundle not found");
      return;
    }

    // Check if this bundle already has a main file if trying to add a main file
    if (newFileCategory === "main" && bundle.files.some(f => f.category === "main")) {
      toast.error("This bundle already has a main document");
      return;
    }

    const newRequirementFile: RequirementFile = {
      id: `file-${Date.now()}`,
      name: newFileName,
      uploadTime: new Date(),
      category: newFileCategory,
      breakRequirementsBy: newFileBreakBy,
      context: newFileContext,
      status: "parsing",
      file: newFile
    };

    const updatedFiles = [...bundle.files, newRequirementFile];
    
    // Update bundle status
    let updatedStatus: RequirementBundle["status"] = "incomplete";
    if (updatedFiles.length >= bundle.totalFiles) {
      updatedStatus = "parsing";
    }

    onBundleUpdate(selectedBundleForFile, updatedFiles);
    
    setIsAddFileDialogOpen(false);
    toast.success(`File added to bundle "${bundle.name}"`);
    
    // Automatically expand the bundle when adding a file
    if (!expandedBundles.includes(selectedBundleForFile)) {
      setExpandedBundles(prev => [...prev, selectedBundleForFile]);
    }

    // Start parsing simulation
    setTimeout(() => {
      onBundleUpdate(
        selectedBundleForFile, 
        updatedFiles.map(f => 
          f.id === newRequirementFile.id 
            ? { ...f, status: "completed" } 
            : f
        )
      );
    }, 2000);
  };

  const handleDeleteFile = (bundleId: string, fileId: string) => {
    const bundle = bundles.find(b => b.id === bundleId);
    if (!bundle) return;
    
    const updatedFiles = bundle.files.filter(f => f.id !== fileId);
    onBundleUpdate(bundleId, updatedFiles);
    toast.success("File removed from bundle");
  };

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

  const getFileStatusIcon = (status: RequirementFile["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-green-500" />;
      case "failed":
        return <X className="h-4 w-4 text-red-500" />;
      case "parsing":
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">Requirement Bundles</CardTitle>
          <Button onClick={() => setIsNewBundleDialogOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Bundle
          </Button>
        </CardHeader>
        <CardContent>
          {bundles.length > 0 ? (
            <div className="space-y-4">
              {bundles.map(bundle => (
                <div 
                  key={bundle.id}
                  className={`border rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedBundleId === bundle.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div 
                    className="flex items-center justify-between bg-gray-50 p-4 cursor-pointer"
                    onClick={() => toggleExpandBundle(bundle.id)}
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
                              handleAddFileToBundle(bundle.id);
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
                              onBundleRetry(bundle.id);
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
                            onBundleDelete(bundle.id);
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <input
                        type="radio"
                        checked={selectedBundleId === bundle.id}
                        onChange={() => onSelectBundle(bundle.id)}
                        onClick={(e) => e.stopPropagation()}
                        disabled={bundle.status !== "completed"}
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  {expandedBundles.includes(bundle.id) && (
                    <div className="p-4 border-t">
                      {bundle.files.length > 0 ? (
                        <div className="space-y-3">
                          {bundle.files.map(file => (
                            <div key={file.id} className="flex items-center justify-between p-3 bg-white rounded border">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center bg-gray-100 rounded-full p-1">
                                  {getFileStatusIcon(file.status)}
                                </div>
                                <div>
                                  <div className="font-medium">{file.name}</div>
                                  <div className="text-xs text-gray-500 flex gap-3">
                                    <span className="capitalize">{file.category} Document</span>
                                    <span>Break by: {file.breakRequirementsBy.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    <span>Uploaded: {file.uploadTime.toLocaleTimeString()}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteFile(bundle.id, file.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-4 text-gray-500">
                          No files in this bundle yet.
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleAddFileToBundle(bundle.id)}
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
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <FileText className="mx-auto h-12 w-12 mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">No requirement bundles yet</h3>
              <p className="mb-4">Create a new bundle to start adding documents</p>
              <Button onClick={() => setIsNewBundleDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Bundle
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Bundle Dialog */}
      <Dialog open={isNewBundleDialogOpen} onOpenChange={setIsNewBundleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Requirement Bundle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bundleName">Bundle Name</Label>
              <Input
                id="bundleName"
                value={newBundleName}
                onChange={(e) => setNewBundleName(e.target.value)}
                placeholder="Enter a name for this requirement bundle"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalFiles">Total Expected Files</Label>
              <Input
                id="totalFiles"
                type="number"
                min="1"
                max="10"
                value={newBundleTotalFiles}
                onChange={(e) => setNewBundleTotalFiles(parseInt(e.target.value) || 1)}
              />
              <p className="text-xs text-gray-500">How many documents are in this requirement bundle?</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewBundleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateNewBundle}>
              Create Bundle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add File Dialog */}
      <Dialog open={isAddFileDialogOpen} onOpenChange={setIsAddFileDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add File to Bundle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div 
              className={`space-y-2 border-2 border-dashed rounded-lg p-4 transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-gray-200"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Label>Document File</Label>
              <div className="flex flex-col items-center justify-center gap-2 py-4">
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500">
                  Drag and drop your file here, or
                </p>
                <label htmlFor="file-upload">
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    onChange={handleFileChange}
                  />
                  <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => document.getElementById('file-upload')?.click()}>
                    Browse Files
                  </Button>
                </label>
                <p className="text-xs text-gray-400">
                  Supports: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
                </p>
              </div>
              {newFile && (
                <div className="flex items-center justify-between mt-2 p-2 bg-gray-50 rounded">
                  <span className="text-sm truncate max-w-[80%]">{newFile.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setNewFile(null)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Document Name</Label>
              <Input 
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="Enter document name"
              />
            </div>

            <div className="space-y-2">
              <Label>File Category</Label>
              <Select 
                value={newFileCategory}
                onValueChange={(value: "main" | "supporting") => setNewFileCategory(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Requirement Document</SelectItem>
                  <SelectItem value="supporting">Supporting Requirement Document</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Break Requirements By</Label>
              <Select 
                value={newFileBreakBy}
                onValueChange={(value: "userJourney" | "userStories" | "section" | "paragraph" | "page") => setNewFileBreakBy(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="userJourney">User Journey</SelectItem>
                  <SelectItem value="userStories">User Stories</SelectItem>
                  <SelectItem value="section">Section</SelectItem>
                  <SelectItem value="paragraph">Paragraph</SelectItem>
                  <SelectItem value="page">Page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Additional Context for SPA Agent</Label>
              <Textarea 
                value={newFileContext}
                onChange={(e) => setNewFileContext(e.target.value)}
                placeholder="Provide any additional context that will help the SPA agent process this document..."
                className="h-20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddFileDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFile} disabled={!newFile || !newFileName}>
              Add File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
