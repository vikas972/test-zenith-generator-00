
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Document {
  id: string;
  title: string;
  category: string;
  lastModified: Date;
  content?: string;
}

interface KnowledgeBaseViewProps {
  onSelectDocument?: (doc: Document) => void;
}

export const KnowledgeBaseView = ({ onSelectDocument }: KnowledgeBaseViewProps) => {
  const [documents] = useState<Document[]>([
    {
      id: "1",
      title: "Product Requirements Document",
      category: "Requirements",
      lastModified: new Date("2024-03-10"),
      content: "This document outlines the requirements for the SPA Generator product...",
    },
    {
      id: "2",
      title: "API Documentation",
      category: "Technical",
      lastModified: new Date("2024-03-09"),
      content: "API endpoints and their usage documentation...",
    },
    {
      id: "3",
      title: "User Guide",
      category: "Documentation",
      lastModified: new Date("2024-03-08"),
      content: "Step by step guide for using the SPA Generator...",
    },
  ]);

  return (
    <div className="flex flex-col gap-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Documents Library</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onSelectDocument?.(doc)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-gray-500">{doc.category}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {doc.lastModified.toLocaleDateString()}
                    </span>
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
