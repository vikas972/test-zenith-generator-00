
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Document } from "@/types/knowledge-base"
import { DocumentsListPanel } from "./DocumentsListPanel"
import { DocumentPreviewPanel } from "./DocumentPreviewPanel"

interface DocumentsTabContentProps {
  documents: Document[]
  selectedDocument: Document | null
  onSelectDocument: (doc: Document) => void
  onEdit: (doc: Document, event: React.MouseEvent) => void
  onDelete: (docId: string, event: React.MouseEvent) => void
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
  triggerCollapse: (button: HTMLButtonElement) => void
}

export const DocumentsTabContent = ({
  documents,
  selectedDocument,
  onSelectDocument,
  onEdit,
  onDelete,
  getStatusColor,
  getStatusText,
  triggerCollapse
}: DocumentsTabContentProps) => {
  const handleCollapse = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerCollapse(e.currentTarget);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-4">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel 
          defaultSize={50}
          minSize={0}
          collapsible={true}
        >
          <DocumentsListPanel
            documents={documents}
            onSelectDocument={onSelectDocument}
            onEdit={onEdit}
            onDelete={onDelete}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
            onCollapse={handleCollapse}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel 
          defaultSize={50}
          minSize={0}
          collapsible={true}
        >
          <DocumentPreviewPanel
            selectedDocument={selectedDocument}
            onCollapse={handleCollapse}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
