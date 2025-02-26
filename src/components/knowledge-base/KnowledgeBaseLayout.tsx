
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Database, Settings, Minimize2 } from "lucide-react"
import { Header } from "@/components/Header"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { DocumentsList } from "./components/DocumentsList"
import { Document } from "@/types/knowledge-base"

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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Knowledge Base Management</h1>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="grid grid-cols-2 gap-8 max-w-2xl">
              <div className="space-y-2">
                <Label htmlFor="product-select" className="text-sm font-medium text-gray-700">
                  Product
                </Label>
                <Select defaultValue="dtb">
                  <SelectTrigger id="product-select" className="w-full">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dtb">DTB</SelectItem>
                    <SelectItem value="product-a">Product A</SelectItem>
                    <SelectItem value="product-b">Product B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain-select" className="text-sm font-medium text-gray-700">
                  Domain
                </Label>
                <Select defaultValue="payments">
                  <SelectTrigger id="domain-select" className="w-full">
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payments">Payments</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

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
                Data Management
              </TabsTrigger>
              <TabsTrigger 
                value="relationships" 
                className="flex items-center gap-2 h-10 px-6 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-primary"
              >
                <Settings className="h-4 w-4" />
                Relationships
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-4">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel 
                    defaultSize={50}
                    minSize={0}
                    collapsible={true}
                  >
                    <div className="h-[700px] border-r border-gray-100">
                      <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Document List</h2>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => triggerCollapse(e.currentTarget)}
                        >
                          <Minimize2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4 h-[calc(100%-65px)]">
                        <DocumentsList
                          documents={documents}
                          onSelectDocument={handleSelectDocument}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          getStatusColor={getStatusColor}
                          getStatusText={getStatusText}
                        />
                      </div>
                    </div>
                  </ResizablePanel>
                  
                  <ResizableHandle withHandle />
                  
                  <ResizablePanel 
                    defaultSize={50}
                    minSize={0}
                    collapsible={true}
                  >
                    <div className="h-[700px]">
                      <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Document Preview</h2>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => triggerCollapse(e.currentTarget)}
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
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </TabsContent>
            
            <TabsContent value="data-management">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 mt-4">
                Data Management content
              </div>
            </TabsContent>
            
            <TabsContent value="relationships">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 mt-4">
                Relationships content
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
