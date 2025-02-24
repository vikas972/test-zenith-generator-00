
import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { KnowledgeBaseUpload } from "./KnowledgeBaseUpload";
import { KnowledgeBaseView } from "./KnowledgeBaseView";
import { KnowledgeBaseEdit } from "./KnowledgeBaseEdit";
import { KnowledgeBaseManage } from "./KnowledgeBaseManage";

export const KnowledgeBaseLayout = () => {
  const [isLeftPanelMaximized, setIsLeftPanelMaximized] = useState(false);
  const [isRightPanelMaximized, setIsRightPanelMaximized] = useState(false);

  const toggleLeftPanel = () => {
    setIsLeftPanelMaximized(!isLeftPanelMaximized);
    setIsRightPanelMaximized(false);
  };

  const toggleRightPanel = () => {
    setIsRightPanelMaximized(!isRightPanelMaximized);
    setIsLeftPanelMaximized(false);
  };

  return (
    <div className="flex flex-col h-full gap-4 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Knowledge Base Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upload" className="flex-1">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          <TabsTrigger value="view">View Documents</TabsTrigger>
          <TabsTrigger value="edit">Edit Documents</TabsTrigger>
          <TabsTrigger value="manage">Manage Data</TabsTrigger>
        </TabsList>

        <div className="flex gap-4 h-[calc(100vh-220px)]">
          <div
            className={cn(
              "flex flex-col transition-all duration-300 bg-white rounded-lg border shadow-sm",
              isLeftPanelMaximized ? "w-full" : "w-2/5",
              isRightPanelMaximized ? "w-0 hidden" : "flex"
            )}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold">Documents</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLeftPanel}
              >
                {isLeftPanelMaximized ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <TabsContent value="upload" className="flex-1 p-4">
              <KnowledgeBaseUpload />
            </TabsContent>
            <TabsContent value="view" className="flex-1 p-4">
              <KnowledgeBaseView />
            </TabsContent>
            <TabsContent value="edit" className="flex-1 p-4">
              <KnowledgeBaseEdit />
            </TabsContent>
            <TabsContent value="manage" className="flex-1 p-4">
              <KnowledgeBaseManage />
            </TabsContent>
          </div>

          <div
            className={cn(
              "flex flex-col transition-all duration-300 bg-white rounded-lg border shadow-sm",
              isRightPanelMaximized ? "w-full" : "w-3/5",
              isLeftPanelMaximized ? "w-0 hidden" : "flex"
            )}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold">Preview</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleRightPanel}
              >
                {isRightPanelMaximized ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground">Select a document to preview its content</p>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
