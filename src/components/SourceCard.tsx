import { cn } from "@/lib/utils";

interface SourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export const SourceCard = ({
  title,
  description,
  icon,
  selected,
  onClick,
}: SourceCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-6 rounded-lg border-2 cursor-pointer transition-all",
        "hover:border-primary hover:shadow-lg",
        selected
          ? "border-primary bg-primary/5"
          : "border-gray-200 bg-white"
      )}
    >
      <div className="flex items-center space-x-4">
        <div className="text-primary">{icon}</div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};