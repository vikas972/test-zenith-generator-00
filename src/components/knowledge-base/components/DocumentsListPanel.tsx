
import { Button } from "@/components/ui/button"
import { Minimize2 } from "lucide-react"
import { Document } from "@/types/knowledge-base"
import { DocumentsList } from "./DocumentsList"

interface DocumentsListPanelProps {
  documents: Document[]
  onSelectDocument: (doc: Document) => void
  onEdit: (doc: Document, event: React.MouseEvent) => void
  onDelete: (docId: string, event: React.MouseEvent) => void
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
  onCollapse: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const DocumentsListPanel = ({
  documents,
  onSelectDocument,
  onEdit,
  onDelete,
  getStatusColor,
  getStatusText,
  onCollapse
}: DocumentsListPanelProps) => {
  return (
    <div className="h-[700px] border-r border-gray-100">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">KB List</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={onCollapse}
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 h-[calc(100%-65px)]">
        <DocumentsList
          documents={documents}
          onSelectDocument={onSelectDocument}
          onEdit={onEdit}
          onDelete={onDelete}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />
      </div>
    </div>
  )
}
