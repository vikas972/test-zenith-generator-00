
import { useState, useEffect } from "react";
import { RequirementBundle } from "../../types";
import { ImportBundleItem } from "./ImportBundleItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface ImportStatusPanelProps {
  importedBundles: RequirementBundle[];
  onSelectBundle: (bundleId: string | null) => void;
  selectedBundleId: string | null;
}

export const ImportStatusPanel = ({ 
  importedBundles, 
  onSelectBundle, 
  selectedBundleId 
}: ImportStatusPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [visibleBundles, setVisibleBundles] = useState<RequirementBundle[]>([]);

  // Update visible bundles when imported bundles change
  useEffect(() => {
    // Only show bundles that are importing or imported
    const filteredBundles = importedBundles.filter(
      bundle => bundle.status === "importing" || bundle.status === "imported"
    );
    setVisibleBundles(filteredBundles);
  }, [importedBundles]);

  if (visibleBundles.length === 0) {
    return null;
  }

  // Calculate statistics for the status summary
  const importingCount = visibleBundles.filter(b => b.status === "importing").length;
  const importedCount = visibleBundles.filter(b => b.status === "imported").length;
  const totalFiles = visibleBundles.reduce((acc, bundle) => acc + bundle.files.length, 0);
  const importedFiles = visibleBundles.reduce((acc, bundle) => 
    acc + bundle.files.filter(f => f.status === "imported").length, 0);

  return (
    <div className="mt-8 transition-all">
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-xl font-semibold">
              Import Status ({visibleBundles.length})
            </CardTitle>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4 text-blue-500" />
                <span>Importing: {importingCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Imported: {importedCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4 text-gray-500" />
                <span>Files: {importedFiles}/{totalFiles}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        
        {isExpanded && (
          <CardContent>
            <div className="space-y-4">
              <Accordion type="multiple" className="space-y-4">
                {visibleBundles.map(bundle => {
                  // Determine if bundle can be selected (all files imported)
                  const isComplete = bundle.status === "imported";
                  const isSelected = selectedBundleId === bundle.id;
                  
                  return (
                    <AccordionItem 
                      key={bundle.id} 
                      value={bundle.id}
                      className="border rounded-lg overflow-hidden shadow-sm"
                    >
                      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                        <AccordionTrigger className="py-0 hover:no-underline">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              id={`select-bundle-${bundle.id}`}
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  onSelectBundle(bundle.id);
                                } else {
                                  onSelectBundle(null);
                                }
                              }}
                              disabled={!isComplete}
                              className="h-4 w-4"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="text-left">
                              <div className="font-medium">{bundle.name}</div>
                              <div className="text-xs text-gray-500">
                                Created: {bundle.createdAt.toLocaleDateString()} • 
                                {isComplete ? " Imported" : " Importing"} •
                                {bundle.files.length} files
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <ImportBundleStatus bundle={bundle} />
                        </div>
                      </div>
                      <AccordionContent className="pt-0 pb-0">
                        <div className="border-t p-3 bg-white">
                          <ImportBundleFiles bundle={bundle} />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

// Extract bundle status badge component
const ImportBundleStatus = ({ bundle }: { bundle: RequirementBundle }) => {
  // Calculate import progress percentage
  const getImportProgress = () => {
    if (bundle.status === "imported") return 100;
    
    const totalFiles = bundle.files.length;
    if (totalFiles === 0) return 0;
    
    const importedFiles = bundle.files.filter(f => f.status === "imported").length;
    return Math.round((importedFiles / totalFiles) * 100);
  };

  const progress = getImportProgress();
  let statusClass = "";
  let statusText = "";

  if (bundle.status === "imported") {
    statusClass = "bg-green-100 text-green-600 border-green-200";
    statusText = "Imported";
  } else if (bundle.status === "importing") {
    statusClass = "bg-blue-100 text-blue-600 border-blue-200";
    statusText = `Importing (${progress}%)`;
  }

  return (
    <div className={`text-xs px-2 py-1 rounded-full ${statusClass} border`}>
      {statusText}
    </div>
  );
};

// Extract bundle files component
const ImportBundleFiles = ({ bundle }: { bundle: RequirementBundle }) => {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium mb-2">Files ({bundle.files.length})</div>
      {bundle.files.map(file => (
        <ImportFileItem key={file.id} file={file} />
      ))}
    </div>
  );
};
