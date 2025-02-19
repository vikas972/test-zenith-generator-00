
import { type Requirement } from "./types";
import { CheckCircle, AlertCircle, RefreshCw, XCircle } from "lucide-react";

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "complete":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "needs_review":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case "in_progress":
      return <RefreshCw className="h-4 w-4 text-blue-500" />;
    case "rejected":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

export const getStatusDescription = (status: string) => {
  switch (status) {
    case "complete":
      return "All required information is present and validated";
    case "needs_review":
      return "Some information needs verification or clarification";
    case "in_progress":
      return "Currently being analyzed and parsed";
    case "rejected":
      return "Information is incorrect or conflicts with other requirements";
    default:
      return "";
  }
};

export const getStatusVariant = (status: string) => {
  switch (status) {
    case "complete":
      return "default";
    case "needs_review":
      return "warning";
    case "in_progress":
      return "secondary";
    case "rejected":
      return "destructive";
    default:
      return "default";
  }
};

export const createNewRequirement = (requirementsLength: number): Requirement => ({
  id: `${Date.now()}`,
  requirementId: `REQ-${(requirementsLength + 1).toString().padStart(3, '0')}`,
  functionalArea: "New Requirement",
  description: "Enter requirement description",
  actors: [],
  flows: [],
  businessRules: [],
  dataElements: [],
  integrationPoints: [],
  expectedBehaviors: [],
  missingInfo: [],
  status: "in_progress",
  confidence: 0,
  source: {
    paragraph: 1,
    page: 1,
    text: "",
    startIndex: 0,
    endIndex: 0
  }
});
