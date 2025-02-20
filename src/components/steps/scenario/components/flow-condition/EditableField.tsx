
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, X } from "lucide-react";

interface EditableFieldProps {
  isEditing: boolean;
  value: string;
  editedValue: string;
  label?: string;
  isTextArea?: boolean;
  width?: string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
}

export const EditableField = ({
  isEditing,
  value,
  editedValue,
  label,
  isTextArea = false,
  width = "w-[200px]",
  onEdit,
  onSave,
  onCancel,
  onChange,
}: EditableFieldProps) => {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {isTextArea ? (
          <Textarea
            value={editedValue}
            onChange={(e) => onChange(e.target.value)}
            className={width}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <Input
            value={editedValue}
            onChange={(e) => onChange(e.target.value)}
            className={width}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <Button variant="ghost" size="sm" onClick={(e) => {
          e.stopPropagation();
          onSave();
        }}>
          <Save className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={(e) => {
          e.stopPropagation();
          onCancel();
        }}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <>
      {label && `${label}: `}{value}
    </>
  );
};
