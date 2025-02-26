
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pencil, Trash2, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

interface Document {
  id: string
  title: string
  uploadDate: Date
  type: string
  status: 'processed' | 'processing' | 'error'
  format: 'Excel' | 'PDF' | 'Word' | 'PowerPoint'
  isUpdate: boolean
}

export const DocumentsList = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'DTB Kenya Functionalities',
      uploadDate: new Date('2025-02-25'),
      type: 'Functionalities',
      status: 'processed',
      format: 'PDF',
      isUpdate: false
    }
  ])
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const documentTypes = [
    "Payment Transactions",
    "Validation Rules",
    "User Interfaces",
    "Operational Flows",
    "Reports and Notifications",
    "Data and Integrations",
    "Other"
  ]

  const handleDelete = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId))
  }

  const handleEdit = (doc: Document) => {
    setSelectedDoc(doc)
    setIsDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-500'
      case 'processing':
        return 'bg-yellow-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
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
          <DialogContent className="sm:max-w-[500px]">
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
                  readOnly
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label>Document Type</Label>
                <Select defaultValue={selectedDoc?.type}>
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
              </div>
              <div className="space-y-2">
                <Label>Document Format</Label>
                <Input 
                  value={selectedDoc?.format || "Auto-detected"}
                  readOnly
                  disabled
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isUpdate" 
                  checked={selectedDoc?.isUpdate}
                  disabled
                />
                <Label htmlFor="isUpdate">Is Update to Existing Document</Label>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-medium">{doc.title}</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Upload Date: {doc.uploadDate.toLocaleDateString()}</p>
                    <p>Type: {doc.type}</p>
                    <div className="flex items-center gap-2">
                      <span>Status:</span>
                      <span className="flex items-center gap-1">
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(doc.status)}`} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(doc)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(doc.id)}
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
