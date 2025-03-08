
import { useState } from "react"
import { Document } from "@/types/knowledge-base"
import { KBEntry } from "../types"
import { mockDocuments } from "../data/mockDocuments"
import { mockEntries } from "../data/mockEntries"
import { useDocumentsState } from "./useDocumentsState"
import { useEntriesState } from "./useEntriesState"

export const useKBData = () => {
  const [selectedTab, setSelectedTab] = useState("Flows/Transactions")
  
  // Use separate hooks for document and entry state management
  const documentsState = useDocumentsState()
  const entriesState = useEntriesState()

  return {
    selectedTab,
    setSelectedTab,
    ...documentsState,
    ...entriesState
  }
}
