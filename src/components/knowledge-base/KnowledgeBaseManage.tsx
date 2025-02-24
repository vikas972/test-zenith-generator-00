
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";

interface Document {
  id: string;
  title: string;
  category: string;
  lastModified: Date;
  content?: string;
}

interface KnowledgeBaseManageProps {
  onSelectDocument?: (doc: Document) => void;
}

export const KnowledgeBaseManage = ({ onSelectDocument }: KnowledgeBaseManageProps) => {
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
          <CardTitle>Manage Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => onSelectDocument?.(doc)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{doc.title}</span>
                      <p className="text-sm text-gray-500">Last modified: {doc.lastModified.toLocaleDateString()}</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
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
