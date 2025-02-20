
export interface BusinessRequirement {
  id: string;
  description: string;
}

export interface BusinessRule {
  id: string;
  description: string;
  category: "authentication" | "security" | "system" | "general";
}

export interface DataElement {
  id: string;
  name: string;
  type: string;
  required: boolean;
  specifications?: string[];
}

export interface MissingInfo {
  id: string;
  category: "business_requirements" | "business_rules" | "data_elements" | "integration_points" | "expected_behaviors";
  description: string;
}

export interface Source {
  paragraph: number;
  page: number;
  text: string;
  startIndex: number;
  endIndex: number;
}

export interface Requirement {
  id: string;
  requirementId: string;
  functionalArea: string;
  description: string;
  actors: string[];
  businessRequirements: BusinessRequirement[];
  businessRules: BusinessRule[];
  dataElements: DataElement[];
  integrationPoints: never[];
  expectedBehaviors: never[];
  missingInfo: MissingInfo[];
  status: "completed" | "needs_review" | "in_progress";
  confidence: number;
  source: Source;
}
