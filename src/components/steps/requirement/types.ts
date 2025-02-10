
export interface Requirement {
  id: string;
  requirementId: string;
  functionalArea: string;
  actors: string;
  flows: string[];
  businessRules: string[];
  validations: string[];
  dataElements: { name: string; type: string; required: boolean }[];
  status: "complete" | "needs_review" | "in_progress" | "rejected";
  missingInfo?: string[];
  dependencies?: string[];
  source: {
    paragraph: number;
    page: number;
    text: string;
    startIndex: number;
    endIndex: number;
  };
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  coverage: number;
  requirements: string[];
  details: string;
  status: string;
  conditions: string[];
  confidenceScore: number;
}
