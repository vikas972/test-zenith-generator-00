
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { FlowType } from "../types";
import { EditableField } from "./flow-condition/EditableField";
import { FlowEntries } from "./flow-condition/FlowEntries";
import { FlowActions } from "./flow-condition/FlowActions";
import { getFlowTypeIcon } from "./flow-condition/utils";

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
  const isEditing = (field: string) =>
    editingState?.flowIndex === flowIndex &&
    editingState?.subflowIndex === subflowIndex &&
    editingState?.field === field;

  const handleDeleteEntry = (entryIndex: number) => {
    onDeleteEntry?.(flowIndex, subflowIndex, entryIndex);
  };

  return (
    <div className="text-sm border rounded-md p-3">
      <div className="flex items-start gap-2">
        <span className="text-gray-400 mt-1">{getFlowTypeIcon(flowType)}</span>
        <div className="space-y-1 flex-1">
          <div className="flex items-start justify-between">
            <div className="font-medium">
              <EditableField
                isEditing={isEditing("name")}
                value={name}
                editedValue={editingState?.value || ""}
                width="w-[200px]"
                onEdit={() => onEdit(flowIndex, subflowIndex, "name", name)}
                onSave={onSaveEdit}
                onCancel={onCancelEdit}
                onChange={onEditingChange}
              />
            </div>
            <FlowActions
              onAdd={(e) => {
                e.stopPropagation();
                onAddEntry(flowIndex, subflowIndex);
              }}
              onEdit={(e) => {
                e.stopPropagation();
                onEdit(flowIndex, subflowIndex, "name", name);
              }}
              onDelete={(e) => {
                e.stopPropagation();
                onDelete(flowIndex, subflowIndex);
              }}
            />
          </div>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between text-gray-600 border-b pb-2">
              <div>
                <EditableField
                  isEditing={isEditing("coverage")}
                  value={coverage}
                  editedValue={editingState?.value || ""}
                  label="Coverage"
                  isTextArea
                  width="w-[400px]"
                  onEdit={() => onEdit(flowIndex, subflowIndex, "coverage", coverage)}
                  onSave={onSaveEdit}
                  onCancel={onCancelEdit}
                  onChange={onEditingChange}
                />
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
                <EditableField
                  isEditing={isEditing("expectedResults")}
                  value={expectedResults}
                  editedValue={editingState?.value || ""}
                  label="Expected Results"
                  isTextArea
                  width="w-[400px]"
                  onEdit={() => onEdit(flowIndex, subflowIndex, "expectedResults", expectedResults)}
                  onSave={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                  onChange={onEditingChange}
                />
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
            <FlowEntries
              entries={entries}
              onDeleteEntry={handleDeleteEntry}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
