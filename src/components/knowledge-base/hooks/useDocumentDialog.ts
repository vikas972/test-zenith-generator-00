
import { useState, MouseEvent } from "react"
import { Document } from "@/types/knowledge-base"

export function useDocumentDialog() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("")
  const [customType, setCustomType] = useState<string>("")
  const [documentName, setDocumentName] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  const handleEdit = (doc: Document, event: MouseEvent) => {
    setSelectedDoc(doc)
    setIsDialogOpen(true)
  }

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
    if (value !== "Other") {
      setCustomType("")
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setDocumentName(file.name.replace(/\.[^/.]+$/, "")) // Remove file extension
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      setDocumentName(file.name.replace(/\.[^/.]+$/, ""))
      // You would typically handle the file upload here
    }
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving document...")
    setIsDialogOpen(false)
  }

  const handleAddDocument = () => {
    setSelectedDoc(null)
    setDocumentName("")
    setSelectedType("")
    setCustomType("")
    setIsDialogOpen(true)
  }

  return {
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
  }
}
