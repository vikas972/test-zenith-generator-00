
export interface Flow {
  id: string;
  description: string;
  type: "primary" | "alternative" | "exception";
  steps?: {
    id: string;
    description: string;
    expectedOutcome: string;
  }[];
  errorHandling?: string;
}

export interface BusinessRule {
  id: string;
  description: string;
  category: "authentication" | "security" | "system" | "other";
  validationCriteria?: string;
  parameters?: string;
  dependencies?: string[];
}

export interface DataElement {
  id: string;
  name: string;
  type: string;
  required: boolean;
  format?: string;
  validationRules?: string[];
  dependencies?: string[];
  constraints?: string[];
}

export interface IntegrationPoint {
  id: string;
  system: string;
  type: string;
  expectedBehavior: string;
}

export interface ExpectedBehavior {
  id: string;
  type: "success" | "error" | "system";
  condition: string;
  response: string;
}

export interface MissingInfo {
  id: string;
  category: "flows" | "business_rules" | "data_elements";
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
  flows: Flow[];
  businessRules: BusinessRule[];
  dataElements: DataElement[];
  integrationPoints: IntegrationPoint[];
  expectedBehaviors: ExpectedBehavior[];
  missingInfo: MissingInfo[];
  status: "completed" | "needs_review" | "in_progress";
  confidence: number;
  source: Source;
}
