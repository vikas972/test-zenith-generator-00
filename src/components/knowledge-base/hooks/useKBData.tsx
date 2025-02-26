
import { useState } from "react"
import { Document } from "@/types/knowledge-base"
import { KBEntry } from "../types"

export const useKBData = () => {
  const [selectedTab, setSelectedTab] = useState("Flows/Transactions")
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
