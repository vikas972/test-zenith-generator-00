
export const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default";
    case "needs_review":
      return "destructive";
    default:
      return "secondary";
  }
};

export const formatRequirementId = (index: number) => {
  return `REQ-${(index + 1).toString().padStart(3, '0')}`;
};

export const createNewRequirement = (requirementsLength: number): Requirement => ({
  id: `${Date.now()}`,
  requirementId: formatRequirementId(requirementsLength),
  functionalArea: "New Requirement",
  description: "Enter requirement description",
  actors: [],
  flows: [],
  businessRules: [],
  dataElements: [],
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
