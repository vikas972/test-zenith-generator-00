
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { MouseEvent } from "react"
import { Document } from "@/types/knowledge-base"

interface DocumentItemProps {
  doc: Document
  onSelectDocument: (doc: Document) => void
  onEdit: (doc: Document, event: MouseEvent) => void
  onDelete: (docId: string, event: MouseEvent) => void
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
}

export const DocumentItem = ({
  doc,
  onSelectDocument,
  onEdit,
  onDelete,
  getStatusColor,
  getStatusText
}: DocumentItemProps) => {
  return (
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
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => onEdit(doc, e)}
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
  )
}
