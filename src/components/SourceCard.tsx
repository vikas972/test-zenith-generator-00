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
        "p-8 rounded-xl border-2 cursor-pointer transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1",
        "backdrop-blur-sm relative overflow-hidden group",
        selected
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
          : "border-gray-200 bg-white hover:border-primary/50"
      )}
    >
      {/* Background gradient effect */}
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-300",
        "bg-gradient-to-br from-primary/5 to-transparent",
        selected ? "opacity-100" : "group-hover:opacity-50"
      )} />
      
      <div className="relative flex items-start space-x-4">
        <div className={cn(
          "p-3 rounded-lg transition-all duration-300",
          selected
            ? "text-primary bg-primary/10"
            : "text-gray-400 bg-gray-50 group-hover:bg-primary/5 group-hover:text-primary"
        )}>
          {icon}
        </div>
        <div>
          <h3 className={cn(
            "font-semibold text-lg mb-1 transition-colors duration-300",
            selected ? "text-primary" : "text-gray-700 group-hover:text-primary"
          )}>
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};