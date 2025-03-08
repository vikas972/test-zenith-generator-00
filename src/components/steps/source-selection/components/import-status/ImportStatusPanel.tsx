
import { useState, useEffect } from "react";
import { RequirementBundle } from "../../types";
import { ImportBundleItem } from "./ImportBundleItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

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

  return (
    <div className="mt-8 transition-all">
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xl font-semibold">
            Import Status ({visibleBundles.length})
          </CardTitle>
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
