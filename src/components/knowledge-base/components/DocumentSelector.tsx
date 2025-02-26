
import { Document } from "@/types/knowledge-base"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface DocumentSelectorProps {
  documents: Document[]
  selectedDocument: Document | null
  onDocumentSelect: (document: Document | null) => void
}

export const DocumentSelector = ({
  documents,
  selectedDocument,
  onDocumentSelect,
}: DocumentSelectorProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border space-y-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="w-full sm:w-64">
          <Label>Select Document</Label>
          <Select
            value={selectedDocument?.id}
            onValueChange={(value) => {
              const doc = documents.find(d => d.id === value)
              onDocumentSelect(doc || null)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a document" />
            </SelectTrigger>
            <SelectContent>
              {documents.map((doc) => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedDocument && (
          <div className="text-sm text-gray-500 space-y-1">
            <p>Upload Date: {selectedDocument.lastModified.toLocaleDateString()}</p>
            <p>Uploaded By: {selectedDocument.uploadedBy}</p>
            <p>Document Type: {selectedDocument.type}</p>
          </div>
        )}
      </div>
    </div>
  )
}
