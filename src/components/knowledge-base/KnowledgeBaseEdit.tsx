
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil } from "lucide-react";

interface Document {
  id: string;
  title: string;
  category: string;
  lastModified: Date;
  content?: string;
}

interface KnowledgeBaseEditProps {
  onSelectDocument?: (doc: Document) => void;
}

export const KnowledgeBaseEdit = ({ onSelectDocument }: KnowledgeBaseEditProps) => {
  const documents = [
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
  ];

  return (
    <div className="flex flex-col gap-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Edit Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{doc.title}</span>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => onSelectDocument?.(doc)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
