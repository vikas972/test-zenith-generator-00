
import { useState } from "react"
import { Document } from "@/types/knowledge-base"
import { DocumentSelector } from "./DocumentSelector"
import { CategoryTabs } from "./CategoryTabs"
import { EntryDialog } from "./EntryDialog"
import { useKBData } from "../hooks/useKBData"
import { KBEntry } from "../types"

export const KBDataManagement = () => {
  const {
    selectedTab,
    setSelectedTab,
    selectedDocument,
    setSelectedDocument,
    documents,
    entries,
    setEntries
  } = useKBData()

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
      const newEntry = {
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

  console.log('Selected Document:', selectedDocument)
  console.log('All Entries:', entries)
  console.log('Filtered Entries:', entries.filter(entry => entry.documentId === selectedDocument?.id))

  // Set initial document if none selected
  if (!selectedDocument && documents.length > 0) {
    setSelectedDocument(documents[0])
  }

  // Filter entries based on selected document
  const filteredEntries = entries.filter(
    entry => entry.documentId === selectedDocument?.id
  )

  return (
    <div className="space-y-6">
      <DocumentSelector
        documents={documents}
        selectedDocument={selectedDocument}
        onDocumentSelect={setSelectedDocument}
      />

      <CategoryTabs
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        entries={filteredEntries}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
