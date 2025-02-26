
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pencil, Trash2 } from "lucide-react"

interface Document {
  id: string
  title: string
  category: string
  lastModified: Date
  status: 'processed' | 'processing' | 'needs_review' | 'deleted'
  type: string
  content?: string
}

interface DocumentsListProps {
  documents: Document[]
  onSelectDocument: (doc: Document) => void
  onEdit: (doc: Document, event: React.MouseEvent) => void
  onDelete: (docId: string, event: React.MouseEvent) => void
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
  return (
    <ScrollArea className="h-[500px] overflow-hidden">
      <div className="space-y-4 p-1">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onSelectDocument(doc)}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">{doc.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getStatusColor(doc.status)}`}>
                    {getStatusText(doc.status)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Type: {doc.type}</p>
                  <p>Category: {doc.category}</p>
                  <p>Last modified: {doc.lastModified.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90"
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
        ))}
      </div>
    </ScrollArea>
  )
}
