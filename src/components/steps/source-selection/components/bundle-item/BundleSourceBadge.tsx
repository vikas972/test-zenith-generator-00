
import { Badge } from "@/components/ui/badge";

interface BundleSourceBadgeProps {
  sourceId: string;
}

export const BundleSourceBadge = ({ sourceId }: BundleSourceBadgeProps) => {
  const getSourceLabel = (sourceId: string) => {
    switch (sourceId) {
      case "jira":
        return "JIRA";
      case "confluence":
        return "Confluence";
      case "local":
        return "Local Files";
      case "database":
        return "Database";
      default:
        return sourceId;
    }
  };

  return (
    <Badge variant="outline" className="ml-1">
      {getSourceLabel(sourceId)}
    </Badge>
  );
};
