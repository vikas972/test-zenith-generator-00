import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, FileText, Database, Settings, Trash2, Pencil, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
                {/* Left Panel */}
                <div className="col-span-5">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          className="pl-10"
                          placeholder="Search documents..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="processed">Processed</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="needs_review">Needs Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <ScrollArea className="h-[500px] overflow-hidden">
                    <div className="space-y-4 p-1">
                      {filteredDocuments.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => onSelectDocument?.(doc)}
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
                                onClick={(e) => handleEdit(doc, e)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={(e) => handleDelete(doc.id, e)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                
                {/* Right Panel */}
                <div className="col-span-7">
                </div>
              </div>
            </TabsContent>

            <TabsContent value="data">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">Manage product information and metadata</p>
                      <Button variant="outline" className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Domains</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">Manage domain configurations</p>
                      <Button variant="outline" className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Domain
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="relationships">
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Manage relationships between documents, products, and domains
                </p>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Relationship
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDocument ? 'Update Document' : 'Add New Document'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="file" className="text-sm font-medium">Document File</label>
              <Input id="file" type="file" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input 
                id="title" 
                defaultValue={selectedDocument?.title} 
                placeholder="Enter document title"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                placeholder="Enter document description (4-5 lines)"
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {selectedDocument ? 'Update' : 'Upload'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
