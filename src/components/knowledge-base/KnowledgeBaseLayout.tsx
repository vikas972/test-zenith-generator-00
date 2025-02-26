
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Database, Settings } from "lucide-react"
import { Header } from "@/components/Header"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

export const KnowledgeBaseLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-semibold">Knowledge Base Management</h1>
          
          <div className="flex gap-4">
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
            <TabsList>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="data-management" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Data Management
              </TabsTrigger>
              <TabsTrigger value="relationships" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Relationships
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="documents">
              <div className="bg-white rounded-lg">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={30}>
                    <div className="h-[600px] p-4 border-r">
                      Left Panel Content
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={70}>
                    <div className="h-[600px] p-4">
                      Right Panel Content
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </TabsContent>
            
            <TabsContent value="data-management">
              <div className="p-4 bg-white rounded-lg">Data Management content</div>
            </TabsContent>
            
            <TabsContent value="relationships">
              <div className="p-4 bg-white rounded-lg">Relationships content</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
