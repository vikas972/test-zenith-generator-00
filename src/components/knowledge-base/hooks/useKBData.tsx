
import { useState } from "react"
import { Document } from "@/types/knowledge-base"
import { KBEntry } from "../types"
import { mockDocuments } from "../data/mockDocuments"
import { mockEntries } from "../data/mockEntries"

export const useKBData = () => {
  const [selectedTab, setSelectedTab] = useState("Flows/Transactions")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [entries, setEntries] = useState<KBEntry[]>(mockEntries)

  return {
    selectedTab,
    setSelectedTab,
    selectedDocument,
    setSelectedDocument,
    documents,
    setDocuments,
    entries,
    setEntries
  }
}
