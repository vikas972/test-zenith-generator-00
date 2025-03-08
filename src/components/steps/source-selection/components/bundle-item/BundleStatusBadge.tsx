
import { RequirementBundle } from "../../types";

interface BundleStatusBadgeProps {
  status: RequirementBundle["status"];
}

export const BundleStatusBadge = ({ status }: BundleStatusBadgeProps) => {
  const getBundleStatusColor = (status: RequirementBundle["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "parsing":
        return "bg-yellow-100 text-yellow-800";
      case "incomplete":
        return "bg-gray-100 text-gray-800";
      case "importing":
        return "bg-blue-100 text-blue-800";
      case "imported":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getBundleStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
