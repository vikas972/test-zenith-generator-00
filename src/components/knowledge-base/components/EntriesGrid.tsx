
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { KBEntry } from "../types"

interface EntriesGridProps {
  category: string
  entries: KBEntry[]
  onAdd: (category: string) => void
  onEdit: (entry: KBEntry) => void
  onDelete: (entryId: string) => void
}

export const EntriesGrid = ({
  category,
  entries,
  onAdd,
  onEdit,
  onDelete,
}: EntriesGridProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
        <Button onClick={() => onAdd(category)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%] min-w-[200px]">Title</TableHead>
                <TableHead className="w-[35%] min-w-[250px]">Description</TableHead>
                <TableHead className="w-[15%] min-w-[100px]">Status</TableHead>
                <TableHead className="w-[15%] min-w-[120px]">Last Modified</TableHead>
                <TableHead className="w-[10%] min-w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.title}</TableCell>
                  <TableCell className="max-w-md">{entry.description}</TableCell>
                  <TableCell>{entry.status}</TableCell>
                  <TableCell>{entry.lastModified.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(entry)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(entry.id)}
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
      </div>
    </div>
  )
}
