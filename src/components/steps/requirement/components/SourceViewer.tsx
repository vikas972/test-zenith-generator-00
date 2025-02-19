
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SourceViewerProps {
  content: string;
  isMaximized: boolean;
  isHidden: boolean;
  onToggleMaximize: () => void;
}

export const SourceViewer = ({
  content,
  isMaximized,
  isHidden,
  onToggleMaximize,
}: SourceViewerProps) => {
  return (
    <div 
      className={cn(
        "border-l flex flex-col bg-gray-50 transition-all duration-300",
        isMaximized ? "w-full" : "w-1/3",
        isHidden ? "hidden" : "flex"
      )}
    >
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h2 className="text-lg font-semibold">Source Document</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMaximize}
        >
          {isMaximized ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <div
          id="source-content"
          className="prose prose-sm max-w-none whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};
