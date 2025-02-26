
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Database, Settings } from "lucide-react"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentsList } from "./components/DocumentsList"
import { DocumentsSearch } from "./components/DocumentsSearch"
import { DocumentDialog } from "./components/DocumentDialog"
import { DataManagementTab } from "./components/DataManagementTab"
import { RelationshipsTab } from "./components/RelationshipsTab"

interface Document {
  id: string
  title: string
  category: string
  lastModified: Date
  status: 'processed' | 'processing' | 'needs_review' | 'deleted'
  type: string
  content?: string
}

interface KnowledgeBaseManageProps {
  onSelectDocument?: (doc: Document) => void
  selectedProduct: string
  selectedDomain: string
}

export const KnowledgeBaseManage = ({ onSelectDocument, selectedProduct, selectedDomain }: KnowledgeBaseManageProps) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [activeTab, setActiveTab] = useState("documents")
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Product Requirements Document",
      category: "Requirements",
      type: "Documentation",
      status: "processed",
      lastModified: new Date("2024-03-10"),
    },
    {
      id: "2",
      title: "API Documentation",
      category: "Technical",
      type: "Technical",
      status: "processing",
      lastModified: new Date("2024-03-09"),
    },
    {
      id: "3",
      title: "User Guide",
      category: "Documentation",
      type: "Documentation",
      status: "needs_review",
      lastModified: new Date("2024-03-08"),
    },
  ])

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handleDelete = (docId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== docId))
  }

  const handleEdit = (doc: Document, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedDocument(doc)
    setIsUploadDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'bg-green-500'
      case 'processing':
        return 'bg-blue-500'
      case 'needs_review':
        return 'bg-yellow-500'
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

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Knowledge Base Management</h1>
      
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <Tabs defaultValue="documents" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Data Management
              </TabsTrigger>
              <TabsTrigger value="relationships" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Relationships
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documents">
              <div className="flex justify-end mb-4">
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setSelectedDocument(null)
                    setIsUploadDialogOpen(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
              </div>
              
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-5">
                  <DocumentsSearch
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                  />
                  <DocumentsList
                    documents={filteredDocuments}
                    onSelectDocument={onSelectDocument || (() => {})}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    getStatusColor={getStatusColor}
                    getStatusText={getStatusText}
                  />
                </div>
                <div className="col-span-7"></div>
              </div>
            </TabsContent>

            <TabsContent value="data">
              <DataManagementTab />
            </TabsContent>

            <TabsContent value="relationships">
              <RelationshipsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <DocumentDialog
        isOpen={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        selectedDocument={selectedDocument}
      />
    </div>
  )
}
