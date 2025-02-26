
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

interface KBEntry {
  id: string
  title: string
  description: string
  status: string
  lastModified: Date
  category: string
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

  const [entries, setEntries] = useState<KBEntry[]>([
    // Flows/Transactions
    {
      id: "1",
      title: "Payment Processing Flow",
      description: "End-to-end payment processing flow for DTB Kenya",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Flows/Transactions"
    },
    {
      id: "2",
      title: "Account Transfer Flow",
      description: "Internal account transfer process flow",
      status: "Active",
      lastModified: new Date("2024-03-14"),
      category: "Flows/Transactions"
    },
    {
      id: "3",
      title: "Bill Payment Flow",
      description: "Utility bill payment processing flow",
      status: "Active",
      lastModified: new Date("2024-03-13"),
      category: "Flows/Transactions"
    },
    {
      id: "4",
      title: "Mobile Money Transfer",
      description: "Mobile money transfer processing flow",
      status: "Active",
      lastModified: new Date("2024-03-12"),
      category: "Flows/Transactions"
    },

    // Validation Rules
    {
      id: "5",
      title: "Amount Validation",
      description: "Validation rules for payment amount",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Validation Rules"
    },
    {
      id: "6",
      title: "Account Number Validation",
      description: "Account number format and checksum validation",
      status: "Active",
      lastModified: new Date("2024-03-14"),
      category: "Validation Rules"
    },
    {
      id: "7",
      title: "Transaction Limit Rules",
      description: "Daily and per-transaction limit validation",
      status: "Active",
      lastModified: new Date("2024-03-13"),
      category: "Validation Rules"
    },
    {
      id: "8",
      title: "Currency Code Validation",
      description: "Valid currency code check for international transfers",
      status: "Active",
      lastModified: new Date("2024-03-12"),
      category: "Validation Rules"
    },

    // User Interfaces
    {
      id: "9",
      title: "Payment Form UI",
      description: "Payment form interface design and components",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "User Interfaces"
    },
    {
      id: "10",
      title: "Transaction History UI",
      description: "Transaction history and filters interface",
      status: "Active",
      lastModified: new Date("2024-03-14"),
      category: "User Interfaces"
    },
    {
      id: "11",
      title: "Account Dashboard",
      description: "Main account dashboard interface",
      status: "Active",
      lastModified: new Date("2024-03-13"),
      category: "User Interfaces"
    },
    {
      id: "12",
      title: "Settings Panel UI",
      description: "User settings and preferences interface",
      status: "Active",
      lastModified: new Date("2024-03-12"),
      category: "User Interfaces"
    },

    // Operational Flows
    {
      id: "13",
      title: "Account Opening Process",
      description: "End-to-end account opening workflow",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Operational Flows"
    },
    {
      id: "14",
      title: "Dispute Resolution",
      description: "Transaction dispute handling process",
      status: "Active",
      lastModified: new Date("2024-03-14"),
      category: "Operational Flows"
    },
    {
      id: "15",
      title: "KYC Verification",
      description: "Know Your Customer verification process",
      status: "Active",
      lastModified: new Date("2024-03-13"),
      category: "Operational Flows"
    },
    {
      id: "16",
      title: "Account Closure",
      description: "Account termination process flow",
      status: "Active",
      lastModified: new Date("2024-03-12"),
      category: "Operational Flows"
    },

    // Reports and Notifications
    {
      id: "17",
      title: "Transaction Report",
      description: "Daily transaction summary report",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Reports and Notifications"
    },
    {
      id: "18",
      title: "Account Statement",
      description: "Monthly account statement generation",
      status: "Active",
      lastModified: new Date("2024-03-14"),
      category: "Reports and Notifications"
    },
    {
      id: "19",
      title: "SMS Notifications",
      description: "Transaction SMS alert templates",
      status: "Active",
      lastModified: new Date("2024-03-13"),
      category: "Reports and Notifications"
    },
    {
      id: "20",
      title: "Email Reports",
      description: "Daily and weekly email report templates",
      status: "Active",
      lastModified: new Date("2024-03-12"),
      category: "Reports and Notifications"
    },

    // Data and Integrations
    {
      id: "21",
      title: "Core Banking Integration",
      description: "Core banking system integration specs",
      status: "Active",
      lastModified: new Date("2024-03-15"),
      category: "Data and Integrations"
    },
    {
      id: "22",
      title: "Payment Gateway API",
      description: "Payment gateway integration documentation",
      status: "Active",
      lastModified: new Date("2024-03-14"),
      category: "Data and Integrations"
    },
    {
      id: "23",
      title: "Mobile Money API",
      description: "Mobile money provider integration specs",
      status: "Active",
      lastModified: new Date("2024-03-13"),
      category: "Data and Integrations"
    },
    {
      id: "24",
      title: "Customer Data Schema",
      description: "Customer database schema documentation",
      status: "Active",
      lastModified: new Date("2024-03-12"),
      category: "Data and Integrations"
    }
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<KBEntry | null>(null)
  const [editMode, setEditMode] = useState<"add" | "edit" | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Active"
  })

  const handleAdd = (category: string) => {
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
    setSelectedEntry(entry)
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
    if (editMode === "add") {
      const newEntry: KBEntry = {
        id: Date.now().toString(),
        ...formData,
        lastModified: new Date(),
        category: selectedTab
      }
      setEntries([...entries, newEntry])
    } else if (editMode === "edit" && selectedEntry) {
      setEntries(entries.map(entry => 
        entry.id === selectedEntry.id 
          ? { ...entry, ...formData, lastModified: new Date() }
          : entry
      ))
    }
    setIsDialogOpen(false)
  }

  const [selectedTab, setSelectedTab] = useState(categories[0])

  const filteredEntries = entries.filter(entry => entry.category === selectedTab)

  return (
    <div className="space-y-6">
      <Tabs defaultValue={categories[0]} onValueChange={setSelectedTab}>
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-4 py-2"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

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
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
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
