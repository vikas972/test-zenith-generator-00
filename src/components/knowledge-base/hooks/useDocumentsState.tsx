
import { useState } from "react"
import { Document } from "@/types/knowledge-base"
import { mockDocuments } from "../data/mockDocuments"

export const useDocumentsState = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)

  return {
    selectedDocument,
    setSelectedDocument,
    documents,
    setDocuments
  }
}
