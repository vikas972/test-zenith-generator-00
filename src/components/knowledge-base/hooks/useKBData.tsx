
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
    // Flows/Transactions
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
      title: "Transaction Rollback Process",
      description: "Process flow for handling failed transactions",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Flows/Transactions",
      documentId: "1"
    },
    {
      id: "1-3",
      title: "Batch Payment Processing",
      description: "Flow for processing batch payments",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Flows/Transactions",
      documentId: "1"
    },

    // Validation Rules
    {
      id: "1-4",
      title: "Payment Amount Validation",
      description: "Validation rules for payment amounts in DTB Kenya",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Validation Rules",
      documentId: "1"
    },
    {
      id: "1-5",
      title: "KYC Validation Rules",
      description: "Customer verification and validation rules",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Validation Rules",
      documentId: "1"
    },
    {
      id: "1-6",
      title: "Account Number Format Rules",
      description: "Rules for validating account number formats",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Validation Rules",
      documentId: "1"
    },

    // User Interfaces
    {
      id: "1-7",
      title: "Mobile Login Screen",
      description: "User interface specifications for mobile login",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "User Interfaces",
      documentId: "1"
    },
    {
      id: "1-8",
      title: "Mobile Dashboard",
      description: "Dashboard layout and components for mobile app",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "User Interfaces",
      documentId: "1"
    },
    {
      id: "1-9",
      title: "Transaction History UI",
      description: "Interface for viewing transaction history",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "User Interfaces",
      documentId: "1"
    },

    // Operational Flows
    {
      id: "1-10",
      title: "Account Opening Workflow",
      description: "Step-by-step account opening process flow",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Operational Flows",
      documentId: "1"
    },
    {
      id: "1-11",
      title: "Card Issuance Process",
      description: "Workflow for issuing new cards",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Operational Flows",
      documentId: "1"
    },
    {
      id: "1-12",
      title: "Account Closure Process",
      description: "Steps for closing customer accounts",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Operational Flows",
      documentId: "1"
    },

    // Reports and Notifications
    {
      id: "1-13",
      title: "Daily Transaction Report",
      description: "Format and content of daily transaction reports",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Reports and Notifications",
      documentId: "1"
    },
    {
      id: "1-14",
      title: "Customer Alert Templates",
      description: "Templates for customer notifications",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Reports and Notifications",
      documentId: "1"
    },
    {
      id: "1-15",
      title: "Audit Log Reports",
      description: "Structure of system audit log reports",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Reports and Notifications",
      documentId: "1"
    },

    // Data and Integrations
    {
      id: "1-16",
      title: "API Integration Flow",
      description: "System integration workflow and architecture",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Data and Integrations",
      documentId: "1"
    },
    {
      id: "1-17",
      title: "Data Mapping Rules",
      description: "Field mapping and transformation rules",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Data and Integrations",
      documentId: "1"
    },
    {
      id: "1-18",
      title: "Database Schema Design",
      description: "Database structure and relationships",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Data and Integrations",
      documentId: "1"
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
