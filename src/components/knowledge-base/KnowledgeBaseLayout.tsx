
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Database, Settings, Minimize2 } from "lucide-react"
import { Header } from "@/components/Header"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"

export const KnowledgeBaseLayout = () => {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Knowledge Base Management</h1>
          </div>
          
          <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <Select defaultValue="dtb">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dtb">DTB</SelectItem>
                <SelectItem value="product-a">Product A</SelectItem>
                <SelectItem value="product-b">Product B</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="payments">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="w-full bg-white border border-gray-100 rounded-lg h-12">
              <TabsTrigger 
                value="documents" 
                className="flex items-center gap-2 h-10 px-6 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-primary"
              >
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger 
                value="data-management" 
                className="flex items-center gap-2 h-10 px-6 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-primary"
              >
                <Database className="h-4 w-4" />
                Data Management
              </TabsTrigger>
              <TabsTrigger 
                value="relationships" 
                className="flex items-center gap-2 h-10 px-6 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-primary"
              >
                <Settings className="h-4 w-4" />
                Relationships
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-4">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel 
                    defaultSize={30} 
                    minSize={20}
                    collapsible={true}
                    collapsedSize={5}
                    collapsed={leftPanelCollapsed}
                  >
                    <div className="h-[700px] border-r border-gray-100">
                      <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Document List</h2>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
                        >
                          <Minimize2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4">
                        List content goes here
                      </div>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel 
                    defaultSize={70} 
                    minSize={30}
                    collapsible={true}
                    collapsedSize={5}
                    collapsed={rightPanelCollapsed}
                  >
                    <div className="h-[700px]">
                      <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Document Preview</h2>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => setRightPanelCollapsed(!rightPanelCollapsed)}
                        >
                          <Minimize2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4">
                        Preview content goes here
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </TabsContent>
            
            <TabsContent value="data-management">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 mt-4">
                Data Management content
              </div>
            </TabsContent>
            
            <TabsContent value="relationships">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 mt-4">
                Relationships content
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
