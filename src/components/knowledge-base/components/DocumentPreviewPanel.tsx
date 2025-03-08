
import { Button } from "@/components/ui/button"
import { Minimize2 } from "lucide-react"
import { Document } from "@/types/knowledge-base"

interface DocumentPreviewPanelProps {
  selectedDocument: Document | null
  onCollapse: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const DocumentPreviewPanel = ({ 
  selectedDocument, 
  onCollapse 
}: DocumentPreviewPanelProps) => {
  return (
    <div className="h-[700px]">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Document Preview</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={onCollapse}
        >
          <Minimize2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4">
        {selectedDocument ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{selectedDocument.title}</h3>
            <div className="text-sm text-gray-500">
              <p>Type: {selectedDocument.type}</p>
              <p>Category: {selectedDocument.category}</p>
              <p>Last Modified: {selectedDocument.lastModified.toLocaleDateString()}</p>
              <p>Uploaded By: {selectedDocument.uploadedBy}</p>
            </div>
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <p className="text-gray-700">{selectedDocument.content}</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Select a document to preview its contents
          </div>
        )}
      </div>
    </div>
  )
}
