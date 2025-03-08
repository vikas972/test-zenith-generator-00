
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  DialogTrigger
} from "@/components/ui/dialog"

interface DocumentsListHeaderProps {
  onAddDocument: () => void
}

export const DocumentsListHeader = ({ onAddDocument }: DocumentsListHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-semibold text-lg">Documents</h2>
      <DialogTrigger asChild>
        <Button onClick={onAddDocument} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Document
        </Button>
      </DialogTrigger>
    </div>
  )
}
