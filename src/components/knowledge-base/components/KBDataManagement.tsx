import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Save } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Document } from "@/types/knowledge-base"

interface KBEntry {
  id: string
  title: string
  description: string
  status: string
  lastModified: Date
  category: string
  documentId: string
}

export const KBDataManagement = () => {
  const categories = [
    "Flows/Transactions",
    "Validation Rules",
    "User Interfaces",
    "Operational Flows",
    "Reports and Notifications",
    "Data and Integrations"
  ]

  const [selectedTab, setSelectedTab] = useState(categories[0])
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
      title: "Mobile Banking User Manual",
      category: "Documentation",
      lastModified: new Date("2024-03-14"),
      type: "User Interface",
      status: "processed",
      uploadedBy: "Sarah Wilson",
      content: "Comprehensive guide for mobile banking interfaces...",
    },
    {
      id: "3",
      title: "Account Opening Procedures",
      category: "Documentation",
      lastModified: new Date("2024-03-13"),
      type: "Operational Flows",
      status: "processed",
      uploadedBy: "Michael Brown",
      content: "Step-by-step guide for account opening process...",
    },
    {
      id: "4",
      title: "Integration Specifications Document",
      category: "Documentation",
      lastModified: new Date("2024-03-12"),
      type: "Technical",
      status: "processed",
      uploadedBy: "David Chen",
      content: "Technical specifications for system integrations...",
    }
  ])

  const [entries, setEntries] = useState<KBEntry[]>([
    {
      id: "1-1",
      title: "Payment Processing Flow",
      description: "End-to-end payment processing flow for DTB Kenya",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Flows/Transactions",
      documentId: "1"
    },
    {
      id: "1-2",
      title: "Payment Amount Validation",
      description: "Validation rules for payment amounts in DTB Kenya",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Validation Rules",
      documentId: "1"
    },
    {
      id: "2-1",
      title: "Mobile Login Screen",
      description: "User interface specifications for mobile login",
      status: "Active",
      lastModified: new Date("2024-03-14"),
      category: "User Interfaces",
      documentId: "2"
    },
    {
      id: "2-2",
      title: "Mobile Dashboard",
      description: "Dashboard layout and components for mobile app",
      status: "Active",
      lastModified: new Date("2024-03-14"),
      category: "User Interfaces",
      documentId: "2"
    },
    {
      id: "3-1",
      title: "Account Opening Workflow",
      description: "Step-by-step account opening process flow",
      status: "Active",
      lastModified: new Date("2024-03-13"),
      category: "Operational Flows",
      documentId: "3"
    },
    {
      id: "3-2",
      title: "KYC Validation Rules",
      description: "Customer verification and validation rules",
      status: "Active",
      lastModified: new Date("2024-03-13"),
      category: "Validation Rules",
      documentId: "3"
    },
    {
      id: "4-1",
      title: "API Integration Flow",
      description: "System integration workflow and architecture",
      status: "Active",
      lastModified: new Date("2024-03-12"),
      category: "Data and Integrations",
      documentId: "4"
    },
    {
      id: "4-2",
      title: "Data Mapping Rules",
      description: "Field mapping and transformation rules",
      status: "Active",
      lastModified: new Date("2024-03-12"),
      category: "Data and Integrations",
      documentId: "4"
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editMode, setEditMode] = useState<"add" | "edit" | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Active"
  })

  const handleAdd = (category: string) => {
    if (!selectedDocument) return
    setEditMode("add")
    setFormData({
      title: "",
      description: "",
      status: "Active"
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (entry: KBEntry) => {
    setEditMode("edit")
    setFormData({
      title: entry.title,
      description: entry.description,
      status: entry.status
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (entryId: string) => {
    setEntries(entries.filter(entry => entry.id !== entryId))
  }

  const handleSave = () => {
    if (editMode === "add" && selectedDocument) {
      const newEntry: KBEntry = {
        id: Date.now().toString(),
        ...formData,
        lastModified: new Date(),
        category: selectedTab,
        documentId: selectedDocument.id
      }
      setEntries([...entries, newEntry])
    }
    setIsDialogOpen(false)
  }

  if (!selectedDocument && documents.length > 0) {
    setSelectedDocument(documents[0])
  }

  const filteredEntries = entries.filter(
    entry => entry.category === selectedTab && entry.documentId === selectedDocument?.id
  )

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="w-full sm:w-64">
            <Label>Select Document</Label>
            <Select
              value={selectedDocument?.id}
              onValueChange={(value) => {
                const doc = documents.find(d => d.id === value)
                setSelectedDocument(doc || null)
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

      <Tabs defaultValue={categories[0]} onValueChange={setSelectedTab}>
        <div className="border rounded-md">
          <div className="overflow-auto">
            <TabsList className="w-max border-b">
              {categories.map(category => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-2 whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
              <Button onClick={() => handleAdd(category)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map(entry => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.title}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>{entry.status}</TableCell>
                      <TableCell>{entry.lastModified.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(entry)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(entry.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>
              {editMode === "add" ? "Add New Entry" : "Edit Entry"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
