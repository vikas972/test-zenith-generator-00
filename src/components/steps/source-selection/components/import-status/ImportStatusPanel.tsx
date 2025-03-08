
import { useState, useEffect } from "react";
import { RequirementBundle } from "../../types";
import { ImportBundleItem } from "./ImportBundleItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

interface ImportStatusPanelProps {
  importedBundles: RequirementBundle[];
}

export const ImportStatusPanel = ({ importedBundles }: ImportStatusPanelProps) => {
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
              {visibleBundles.map(bundle => (
                <ImportBundleItem key={bundle.id} bundle={bundle} />
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
