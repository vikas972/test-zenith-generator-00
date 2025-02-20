
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { FlowType } from "../types";

interface FlowConditionProps {
  flowType: FlowType;
  flowIndex: number;
  subflowIndex: number;
  name: string;
  coverage: string;
  expectedResults: string;
  editingState: {
    flowIndex: number;
    subflowIndex: number;
    field: string | null;
    value: string;
  } | null;
  onEdit: (flowIndex: number, subflowIndex: number, field: string, value: string) => void;
  onDelete: (flowIndex: number, subflowIndex: number) => void;
  onAddEntry: (flowIndex: number, subflowIndex: number) => void;
  onDeleteEntry?: (flowIndex: number, subflowIndex: number, entryIndex: number) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditingChange: (value: string) => void;
  entries?: Array<{ description: string }>;
}

const getFlowTypeIcon = (type: FlowType) => {
  switch (type) {
    case "primary":
      return "→";
    case "alternate":
      return "⤷";
    case "negative":
      return "⚠";
    case "exception":
      return "⚡";
    default:
      return "•";
  }
};

export const FlowCondition = ({
  flowType,
  flowIndex,
  subflowIndex,
  name,
  coverage,
  expectedResults,
  editingState,
  onEdit,
  onDelete,
  onAddEntry,
  onDeleteEntry,
  onSaveEdit,
  onCancelEdit,
  onEditingChange,
  entries = [],
}: FlowConditionProps) => {
  const handleDeleteEntry = (entryIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteEntry?.(flowIndex, subflowIndex, entryIndex);
  };

  return (
    <div className="text-sm border rounded-md p-3">
      <div className="flex items-start gap-2">
        <span className="text-gray-400 mt-1">{getFlowTypeIcon(flowType)}</span>
        <div className="space-y-1 flex-1">
          <div className="flex items-start justify-between">
            <div className="font-medium">
              {editingState?.flowIndex === flowIndex &&
              editingState?.subflowIndex === subflowIndex &&
              editingState?.field === "name" ? (
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <Input
                    value={editingState.value}
                    onChange={(e) => onEditingChange(e.target.value)}
                    className="w-[200px]"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    onSaveEdit();
                  }}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    onCancelEdit();
                  }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                name
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddEntry(flowIndex, subflowIndex);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(flowIndex, subflowIndex, "name", name);
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(flowIndex, subflowIndex);
                }}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between text-gray-600 border-b pb-2">
              <div>
                {editingState?.flowIndex === flowIndex &&
                editingState?.subflowIndex === subflowIndex &&
                editingState?.field === "coverage" ? (
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Textarea
                      value={editingState.value}
                      onChange={(e) => onEditingChange(e.target.value)}
                      className="w-[400px]"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      onSaveEdit();
                    }}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      onCancelEdit();
                    }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>Coverage: {coverage}</>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(flowIndex, subflowIndex, "coverage", coverage);
                  }}
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <div>
                {editingState?.flowIndex === flowIndex &&
                editingState?.subflowIndex === subflowIndex &&
                editingState?.field === "expectedResults" ? (
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <Textarea
                      value={editingState.value}
                      onChange={(e) => onEditingChange(e.target.value)}
                      className="w-[400px]"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      onSaveEdit();
                    }}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      onCancelEdit();
                    }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>Expected Results: {expectedResults}</>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(flowIndex, subflowIndex, "expectedResults", expectedResults);
                  }}
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            {entries.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Entries:</h4>
                <div className="space-y-2">
                  {entries.map((entry, entryIndex) => (
                    <div key={entryIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>{entry.description}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleDeleteEntry(entryIndex, e)}
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
