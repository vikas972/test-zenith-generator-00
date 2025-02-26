
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Document {
  id: string
  title: string
  category: string
  lastModified: Date
  status: 'processed' | 'processing' | 'needs_review' | 'deleted'
  type: string
  content?: string
}

interface DocumentDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedDocument: Document | null
}

export const DocumentDialog = ({
  isOpen,
  onOpenChange,
  selectedDocument,
}: DocumentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {selectedDocument ? 'Update Document' : 'Add New Document'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="file" className="text-sm font-medium">Document File</label>
            <Input id="file" type="file" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input 
              id="title" 
              defaultValue={selectedDocument?.title} 
              placeholder="Enter document title"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea 
              id="description" 
              placeholder="Enter document description (4-5 lines)"
              className="min-h-[100px]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {selectedDocument ? 'Update' : 'Upload'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
