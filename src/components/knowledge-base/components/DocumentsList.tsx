import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pencil, Trash2, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, MouseEvent } from "react"
import { Document } from "@/types/knowledge-base"

interface DocumentsListProps {
  documents: Document[]
  onSelectDocument: (doc: Document) => void
  onEdit: (doc: Document, event: MouseEvent) => void
  onDelete: (docId: string, event: MouseEvent) => void
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
}

export const DocumentsList = ({
  documents,
  onSelectDocument,
  onEdit,
  onDelete,
  getStatusColor,
  getStatusText
}: DocumentsListProps) => {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("")
  const [customType, setCustomType] = useState<string>("")

  const documentTypes = [
    "Payment Transactions",
    "Validation Rules",
    "User Interfaces",
    "Operational Flows",
    "Reports and Notifications",
    "Data and Integrations",
    "Other"
  ]

  const handleEdit = (doc: Document, event: MouseEvent) => {
    setSelectedDoc(doc)
    setIsDialogOpen(true)
    onEdit(doc, event)
  }

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
    if (value !== "Other") {
      setCustomType("")
    }
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving document...")
    setIsDialogOpen(false)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Documents</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedDoc(null)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Document
            </Button>
          </DialogTrigger>
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
                  value={selectedDoc?.title || ""}
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
              <div className="space-y-2">
                <Label>Document File</Label>
                <Input 
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                />
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
        </Dialog>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onSelectDocument(doc)}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-medium">{doc.title}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Upload Date: {doc.lastModified.toLocaleDateString()}</p>
                    <p>Uploaded By: {doc.uploadedBy}</p>
                    <p>Type: {doc.type}</p>
                    <div className="flex items-center gap-2">
                      <span>Status:</span>
                      <span className="flex items-center gap-1">
                        {getStatusText(doc.status)}
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(doc.status)}`} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => handleEdit(doc, e)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={(e) => onDelete(doc.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
