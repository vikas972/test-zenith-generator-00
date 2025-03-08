
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog } from "@/components/ui/dialog"
import { MouseEvent } from "react"
import { Document } from "@/types/knowledge-base"
import { DocumentsListHeader } from "./DocumentsListHeader"
import { DocumentItem } from "./DocumentItem"
import { AddDocumentDialog } from "./AddDocumentDialog"
import { useDocumentDialog } from "../hooks/useDocumentDialog"

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
  const {
    selectedDoc,
    isDialogOpen,
    setIsDialogOpen,
    selectedType,
    customType,
    documentName,
    isDragging,
    handleEdit,
    handleTypeChange,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleSave,
    handleAddDocument,
    setDocumentName,
    setCustomType
  } = useDocumentDialog()

  return (
    <div className="flex flex-col h-full">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DocumentsListHeader onAddDocument={handleAddDocument} />
        <ScrollArea className="flex-1">
          <div className="space-y-4">
            {documents.map((doc) => (
              <DocumentItem
                key={doc.id}
                doc={doc}
                onSelectDocument={onSelectDocument}
                onEdit={(doc, event) => {
                  handleEdit(doc, event)
                  onEdit(doc, event)
                }}
                onDelete={onDelete}
                getStatusColor={getStatusColor}
                getStatusText={getStatusText}
              />
            ))}
          </div>
        </ScrollArea>
        <AddDocumentDialog
          selectedDoc={selectedDoc}
          documentName={documentName}
          selectedType={selectedType}
          customType={customType}
          isDragging={isDragging}
          handleTypeChange={handleTypeChange}
          handleFileChange={handleFileChange}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          handleSave={handleSave}
          setDocumentName={setDocumentName}
          setCustomType={setCustomType}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Dialog>
    </div>
  )
}
