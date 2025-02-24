
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KnowledgeBaseUpload } from "./KnowledgeBaseUpload";
import { KnowledgeBaseEdit } from "./KnowledgeBaseEdit";
import { KnowledgeBaseView } from "./KnowledgeBaseView";
import { KnowledgeBaseManage } from "./KnowledgeBaseManage";
import { Header } from "../Header";

export const KnowledgeBaseLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
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
            <KnowledgeBaseView />
          </TabsContent>
          <TabsContent value="upload">
            <KnowledgeBaseUpload />
          </TabsContent>
          <TabsContent value="edit">
            <KnowledgeBaseEdit />
          </TabsContent>
          <TabsContent value="manage">
            <KnowledgeBaseManage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
