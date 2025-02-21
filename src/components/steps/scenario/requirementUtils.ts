
export interface Requirement {
  id: string;
  functionalArea: string;
  description: string;
  actors: string[];
  businessRequirements: Array<{ id: string; description: string }>;
  businessRules: Array<{ id: string; description: string; category: string }>;
  dataElements: Array<{
    id: string;
    name: string;
    type: string;
    required: boolean;
    specifications: string[];
  }>;
  status: 'needs_review';
  confidence: number;
}

export const getRequirementDetails = (requirementId: string): Requirement => {
  return {
    id: requirementId,
    functionalArea: "User Authentication",
    description: "System shall provide secure user authentication mechanisms",
    actors: ["End User", "System"],
    businessRequirements: [
      { id: "br1", description: "System shall authenticate users" },
      { id: "br2", description: "System shall validate credentials" },
      { id: "br3", description: "System shall manage sessions" }
    ],
    businessRules: [
      { id: "rule1", description: "Password must be at least 8 characters", category: "security" },
      { id: "rule2", description: "Account locks after 3 failed attempts", category: "security" },
      { id: "rule3", description: "Session expires after 30 minutes", category: "security" }
    ],
    dataElements: [
      { id: "de1", name: "Username", type: "string", required: true, specifications: ["Must be email format"] },
      { id: "de2", name: "Password", type: "string", required: true, specifications: ["Min 8 characters", "1 special character"] }
    ],
    status: "needs_review",
    confidence: 0.85,
  };
};
