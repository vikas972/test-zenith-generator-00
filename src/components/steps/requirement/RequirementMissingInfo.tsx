
import { type Requirement } from "./types";
import { AlertCircle } from "lucide-react";

interface RequirementMissingInfoProps {
  requirement: Requirement;
}

export const RequirementMissingInfo = ({
  requirement,
}: RequirementMissingInfoProps) => {
  if (!requirement.missingInfo?.length) return null;

  return (
    <div className="mt-4 p-4 bg-yellow-50 rounded-md">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-yellow-800">Missing Information</h4>
          <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5">
            {requirement.missingInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
