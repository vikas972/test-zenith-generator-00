
import { Document } from "@/types/knowledge-base"

export const mockDocuments: Document[] = [
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
]
