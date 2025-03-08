
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Document } from "@/types/knowledge-base"

interface AddDocumentDialogProps {
  selectedDoc: Document | null
  documentName: string
  selectedType: string
  customType: string
  isDragging: boolean
  handleTypeChange: (value: string) => void
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleDragOver: (e: React.DragEvent) => void
  handleDragLeave: (e: React.DragEvent) => void
  handleDrop: (e: React.DragEvent) => void
  handleSave: () => void
  setDocumentName: (name: string) => void
  setCustomType: (type: string) => void
  setIsDialogOpen: (isOpen: boolean) => void
}

export const AddDocumentDialog = ({
  selectedDoc,
  documentName,
  selectedType,
  customType,
  isDragging,
  handleTypeChange,
  handleFileChange,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleSave,
  setDocumentName,
  setCustomType,
  setIsDialogOpen
}: AddDocumentDialogProps) => {
  const documentTypes = [
    "Payment Transactions",
    "Validation Rules",
    "User Interfaces",
    "Operational Flows",
    "Reports and Notifications",
    "Data and Integrations",
    "Other"
  ]

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>
          {selectedDoc ? 'Edit Document' : 'Add New Document'}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label>Document Name</Label>
          <Input 
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            placeholder="Enter document name"
          />
        </div>
        <div className="space-y-2">
          <Label>Document Type</Label>
          <Select 
            defaultValue={selectedDoc?.type}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedType === "Other" && (
            <div className="mt-2">
              <Input 
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                placeholder="Enter custom document type"
              />
            </div>
          )}
        </div>
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
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isUpdate" 
            disabled
          />
          <Label htmlFor="isUpdate">Is Update to Existing Document</Label>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
