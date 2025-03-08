
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Database } from "lucide-react"
import { Header } from "@/components/Header"
import { Document } from "@/types/knowledge-base"
import { KBDataManagement } from "./components/KBDataManagement"
import { KnowledgeBaseHeader } from "./components/KnowledgeBaseHeader"
import { DocumentsTabContent } from "./components/DocumentsTabContent"

export const KnowledgeBaseLayout = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "DTB Kenya Payment Processing Guide",
      category: "Documentation",
      lastModified: new Date("2024-03-15"),
      type: "Payment Transactions",
      status: "processed",
      uploadedBy: "John Smith",
      content: "This document outlines the payment processing guidelines for DTB Kenya...",
    },
    {
      id: "2",
      title: "User Interface Design Specifications",
      category: "Documentation",
      lastModified: new Date("2024-03-14"),
      type: "User Interfaces",
      status: "processing",
      uploadedBy: "Sarah Johnson",
      content: "Detailed specifications for the user interface design of DTB Kenya...",
    },
    {
      id: "3",
      title: "Data Integration Framework",
      category: "Technical",
      lastModified: new Date("2024-03-13"),
      type: "Data and Integrations",
      status: "needs_review",
      uploadedBy: "Michael Brown",
      content: "Framework documentation for data integration processes...",
    },
    {
      id: "4",
      title: "Validation Rules Documentation",
      category: "Technical",
      lastModified: new Date("2024-03-12"),
      type: "Validation Rules",
      status: "processed",
      uploadedBy: "Emma Davis",
      content: "Comprehensive documentation of validation rules for DTB Kenya...",
    },
    {
      id: "5",
      title: "Operational Process Flows",
      category: "Operations",
      lastModified: new Date("2024-03-11"),
      type: "Operational Flows",
      status: "processed",
      uploadedBy: "David Wilson",
      content: "Detailed documentation of operational process flows...",
    }
  ])

  const handleSelectDocument = (doc: Document) => {
    setSelectedDocument(doc)
    console.log("Selected document:", doc)
  }

  const handleEdit = (doc: Document, event: React.MouseEvent) => {
    event.stopPropagation()
    console.log("Editing document:", doc)
  }

  const handleDelete = (docId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setDocuments(prev => prev.filter(doc => doc.id !== docId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-500'
      case 'processing':
        return 'bg-yellow-500'
      case 'needs_review':
        return 'bg-orange-500'
      case 'deleted':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const triggerCollapse = (button: HTMLButtonElement) => {
    const panelElement = button.closest('div[class*="ResizablePanel"]');
    if (panelElement) {
      const handle = panelElement.nextElementSibling?.matches('[role="separator"]') 
        ? panelElement.nextElementSibling 
        : panelElement.previousElementSibling?.matches('[role="separator"]')
          ? panelElement.previousElementSibling
          : null;
      
      if (handle) {
        (handle as HTMLElement).click();
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <KnowledgeBaseHeader />
        
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="w-full bg-white border border-gray-100 rounded-lg h-12">
            <TabsTrigger 
              value="documents" 
              className="flex items-center gap-2 h-10 px-6 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-primary"
            >
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="data-management" 
              className="flex items-center gap-2 h-10 px-6 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-primary"
            >
              <Database className="h-4 w-4" />
              KB Data Management
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents">
            <DocumentsTabContent
              documents={documents}
              selectedDocument={selectedDocument}
              onSelectDocument={handleSelectDocument}
              onEdit={handleEdit}
              onDelete={handleDelete}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
              triggerCollapse={triggerCollapse}
            />
          </TabsContent>
          
          <TabsContent value="data-management">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 mt-4">
              <KBDataManagement />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
