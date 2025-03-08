
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface ParameterSelectProps {
  id: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  compact?: boolean;
}

export const ParameterSelect = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  compact = false
}: ParameterSelectProps) => {
  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      <Label htmlFor={id} className={compact ? "text-xs text-gray-600 font-medium block truncate" : ""}>
        {label}
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger 
          id={id} 
          className={compact ? "h-8 text-sm" : ""}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
