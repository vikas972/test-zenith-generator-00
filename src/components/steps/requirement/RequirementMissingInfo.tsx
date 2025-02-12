
import { type Requirement } from "./types";
import { AlertCircle } from "lucide-react";

interface RequirementMissingInfoProps {
  requirement: Requirement;
}

export const RequirementMissingInfo = ({
  requirement,
}: RequirementMissingInfoProps) => {
  if (!requirement.missingInfo?.length) return null;

  const categories = ["flows", "business_rules", "data_elements"] as const;

  return (
    <div className="mt-4 p-4 bg-yellow-50 rounded-md">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-yellow-800">Missing Information</h4>
          <div className="mt-2 space-y-4">
            {categories.map(category => {
              const categoryItems = requirement.missingInfo.filter(
                info => info.category === category
              );
              if (categoryItems.length === 0) return null;

              return (
                <div key={category}>
                  <h5 className="text-sm font-medium text-yellow-700 mb-2">
                    {category.split("_").map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(" ")}
                  </h5>
                  <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5">
                    {categoryItems.map((info) => (
                      <li key={info.id}>{info.description}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
