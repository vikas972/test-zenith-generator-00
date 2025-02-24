
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KnowledgeBaseUpload } from "./KnowledgeBaseUpload";
import { KnowledgeBaseView } from "./KnowledgeBaseView";
import { KnowledgeBaseManage } from "./KnowledgeBaseManage";
import { Header } from "../Header";
import { useState } from "react";
import { Card } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "../ui/button";

interface Document {
  id: string;
  title: string;
  category: string;
  content?: string;
  lastModified: Date;
}

export const KnowledgeBaseLayout = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isLeftPanelExpanded, setIsLeftPanelExpanded] = useState(true);
  const [isRightPanelExpanded, setIsRightPanelExpanded] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("dtb");
  const [selectedDomain, setSelectedDomain] = useState("payments");

  const products = [
    { label: "DTB", value: "dtb" },
    { label: "Product A", value: "product-a" },
    { label: "Product B", value: "product-b" }
  ];

  const domains = [
    { label: "Payments", value: "payments" },
    { label: "Finance", value: "finance" },
    { label: "Healthcare", value: "healthcare" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-4">
        {/* Context Selection Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Product:</span>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.value} value={product.value}>
                      {product.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Domain:</span>
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain.value} value={domain.value}>
                      {domain.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Left Panel */}
          <div className={`transition-all duration-300 ${isLeftPanelExpanded ? (isRightPanelExpanded ? 'w-2/3' : 'w-full') : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-2 flex justify-end border-b">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (isLeftPanelExpanded) {
                      // If left panel is expanded, hide it
                      setIsLeftPanelExpanded(false);
                    } else {
                      // If left panel is hidden, show it and maximize it
                      setIsLeftPanelExpanded(true);
                      setIsRightPanelExpanded(false);
                    }
                  }}
                >
                  {isLeftPanelExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
              {isLeftPanelExpanded && (
                <Tabs defaultValue="manage" className="space-y-6">
                  <TabsList className="bg-white w-full flex justify-start p-1 gap-1">
                    <TabsTrigger value="manage" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-white">
                      Manage KB
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="manage">
                    <KnowledgeBaseManage 
                      onSelectDocument={setSelectedDocument}
                      selectedProduct={selectedProduct}
                      selectedDomain={selectedDomain}
                    />
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>

          {/* Right Panel - Document Preview */}
          <div className={`transition-all duration-300 ${isRightPanelExpanded ? (isLeftPanelExpanded ? 'w-1/3' : 'w-full') : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-12rem)]">
              <div className="p-2 flex justify-end border-b">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (isRightPanelExpanded) {
                      // If right panel is expanded, hide it
                      setIsRightPanelExpanded(false);
                    } else {
                      // If right panel is hidden, show it and maximize it
                      setIsRightPanelExpanded(true);
                      setIsLeftPanelExpanded(false);
                    }
                  }}
                >
                  {isRightPanelExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
              {isRightPanelExpanded && (
                <div className="p-6">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
