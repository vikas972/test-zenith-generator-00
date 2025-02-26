import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Document } from "@/types/knowledge-base"
import { DocumentSelector } from "./DocumentSelector"
import { EntriesGrid } from "./EntriesGrid"
import { EntryDialog } from "./EntryDialog"
import { KBEntry } from "../types"

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
      <DocumentSelector
        documents={documents}
        selectedDocument={selectedDocument}
        onDocumentSelect={setSelectedDocument}
      />

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
          <TabsContent key={category} value={category}>
            <EntriesGrid
              category={category}
              entries={filteredEntries}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>
        ))}
      </Tabs>

      <EntryDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={editMode}
        formData={formData}
        onFormDataChange={setFormData}
        onSave={handleSave}
      />
    </div>
  )
}
