import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Pencil, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Document {
  id: string;
  title: string;
  category: string;
  lastModified: Date;
  content?: string;
}

interface KnowledgeBaseManageProps {
  onSelectDocument?: (doc: Document) => void;
  selectedProduct: string;
  selectedDomain: string;
}

export const KnowledgeBaseManage = ({ onSelectDocument, selectedProduct, selectedDomain }: KnowledgeBaseManageProps) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [mounted, setMounted] = useState(false);
  const [documents, setDocuments] = useState([
    {
      id: "1",
      title: "Product Requirements Document",
      category: "Requirements",
      lastModified: new Date("2024-03-10"),
    },
    {
      id: "2",
      title: "API Documentation",
      category: "Technical",
      lastModified: new Date("2024-03-09"),
    },
    {
      id: "3",
      title: "User Guide",
      category: "Documentation",
      lastModified: new Date("2024-03-08"),
    },
  ]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleDelete = (docId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== docId));
  };

  const handleEdit = (doc: Document, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedDocument(doc);
    setIsUploadDialogOpen(true);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Documents</CardTitle>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => {
              setSelectedDocument(null);
              setIsUploadDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Document
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] overflow-hidden">
            <div className="space-y-4 p-1">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onSelectDocument?.(doc)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{doc.title}</span>
                      <p className="text-sm text-gray-500">Last modified: {doc.lastModified.toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90"
                        onClick={(e) => handleEdit(doc, e)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={(e) => handleDelete(doc.id, e)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
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
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {selectedDocument ? 'Update' : 'Upload'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
