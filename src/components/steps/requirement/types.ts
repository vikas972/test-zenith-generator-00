
export interface Flow {
  id: string;
  description: string;
}

export interface BusinessRule {
  id: string;
  description: string;
}

export interface DataElement {
  id: string;
  name: string;
  type: string;
  required: boolean;
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
  missingInfo: MissingInfo[];
  status: "completed" | "needs_review" | "in_progress";
  confidence: number;
  source: Source;
}
