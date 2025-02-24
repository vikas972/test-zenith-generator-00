
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KnowledgeBaseUpload } from "./KnowledgeBaseUpload";
import { KnowledgeBaseEdit } from "./KnowledgeBaseEdit";
import { KnowledgeBaseView } from "./KnowledgeBaseView";
import { KnowledgeBaseManage } from "./KnowledgeBaseManage";
import { Header } from "../Header";
import { useState } from "react";
import { Card } from "../ui/card";

interface Document {
  id: string;
  title: string;
  category: string;
  content?: string;
  lastModified: Date;
}

export const KnowledgeBaseLayout = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Left Panel */}
          <div className="w-2/3">
            <Tabs defaultValue="view" className="space-y-6">
              <TabsList className="bg-white w-full flex justify-start p-1 gap-1">
                <TabsTrigger value="view" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
                  View
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
                  Upload
                </TabsTrigger>
                <TabsTrigger value="edit" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
                  Edit
                </TabsTrigger>
                <TabsTrigger value="manage" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
                  Manage
                </TabsTrigger>
              </TabsList>
              <TabsContent value="view">
                <KnowledgeBaseView onSelectDocument={setSelectedDocument} />
              </TabsContent>
              <TabsContent value="upload">
                <KnowledgeBaseUpload />
              </TabsContent>
              <TabsContent value="edit">
                <KnowledgeBaseEdit onSelectDocument={setSelectedDocument} />
              </TabsContent>
              <TabsContent value="manage">
                <KnowledgeBaseManage onSelectDocument={setSelectedDocument} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Document Preview */}
          <div className="w-1/3">
            <Card className="p-6 h-[calc(100vh-12rem)] shadow-md">
              {selectedDocument ? (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">{selectedDocument.title}</h2>
                  <div className="flex gap-2 text-sm text-gray-500">
                    <span>Category: {selectedDocument.category}</span>
                    <span>•</span>
                    <span>Last modified: {selectedDocument.lastModified.toLocaleDateString()}</span>
                  </div>
                  <div className="mt-4 prose">
                    {selectedDocument.content || (
                      <p className="text-gray-500 italic">No content available for preview</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Select a document to preview its contents
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
