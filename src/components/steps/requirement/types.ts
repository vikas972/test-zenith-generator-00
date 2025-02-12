
export interface FlowStep {
  id: string;
  description: string;
  expectedOutcome: string;
}

export interface Flow {
  id: string;
  description: string;
  expectedOutcome?: string;
  steps?: FlowStep[];
  type?: 'primary' | 'alternative' | 'exception';
}

export interface BusinessRuleCategory {
  name: string;
  rules: BusinessRule[];
}

export interface BusinessRule {
  id: string;
  description: string;
  category?: string;
  validationCriteria?: string;
  parameters?: { name: string; value: string }[];
  dependencies?: string[];
}

export interface DataElementValidation {
  rule: string;
  message: string;
}

export interface DataElement {
  id: string;
  name: string;
  type: string;
  required: boolean;
  format?: string;
  validations?: DataElementValidation[];
  dependencies?: string[];
  constraints?: string[];
}

export interface IntegrationPoint {
  id: string;
  system: string;
  type: 'sync' | 'async' | 'batch';
  description: string;
  expectedBehavior: string;
}

export interface ExpectedBehavior {
  id: string;
  type: 'success' | 'error';
  condition: string;
  response: string;
}

export interface MissingInfo {
  id: string;
  category: "flows" | "business_rules" | "data_elements" | "integration_points" | "expected_behaviors";
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
  integrationPoints?: IntegrationPoint[];
  expectedBehaviors?: ExpectedBehavior[];
  missingInfo: MissingInfo[];
  status: "completed" | "needs_review" | "in_progress";
  confidence: number;
  source: Source;
}
