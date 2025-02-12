
import { CardContent } from "@/components/ui/card";
import { type Requirement } from "./types";
import { FlowsSection } from "./content/FlowsSection";
import { BusinessRulesSection } from "./content/BusinessRulesSection";
import { DataElementsSection } from "./content/DataElementsSection";
import { IntegrationPointsSection } from "./content/IntegrationPointsSection";
import { ExpectedBehaviorsSection } from "./content/ExpectedBehaviorsSection";

interface RequirementContentProps {
  requirement: Requirement;
}

export const RequirementContent = ({ requirement }: RequirementContentProps) => {
  const primaryFlows = requirement.flows.filter(f => f.type === 'primary');
  const alternativeFlows = requirement.flows.filter(f => f.type === 'alternative');
  const exceptionFlows = requirement.flows.filter(f => f.type === 'exception');

  return (
    <CardContent>
      <div className="space-y-6">
        <FlowsSection
          flows={requirement.flows}
          primaryFlows={primaryFlows}
          alternativeFlows={alternativeFlows}
          exceptionFlows={exceptionFlows}
          onAddFlow={(type, flow) => {
            requirement.flows.push({ ...flow, type });
          }}
          onEditFlow={(type, flowId, newDescription) => {
            requirement.flows = requirement.flows.map(flow =>
              flow.id === flowId ? { ...flow, description: newDescription, type } : flow
            );
          }}
        />

        <BusinessRulesSection
          rules={requirement.businessRules}
          onAddRule={(category) => {
            requirement.businessRules.push({
              id: `br${requirement.businessRules.length + 1}`,
              description: "New business rule",
              category,
              validationCriteria: "",
              parameters: [],
              dependencies: []
            });
          }}
        />

        <DataElementsSection
          elements={requirement.dataElements}
          onAddElement={() => {
            requirement.dataElements.push({
              id: `de${requirement.dataElements.length + 1}`,
              name: "New Element",
              type: "string",
              required: false,
              format: "",
              validations: [],
              dependencies: [],
              constraints: []
            });
          }}
        />

        <IntegrationPointsSection
          integrationPoints={requirement.integrationPoints || []}
          onAddIntegrationPoint={() => {
            if (!requirement.integrationPoints) {
              requirement.integrationPoints = [];
            }
            requirement.integrationPoints.push({
              id: `ip${requirement.integrationPoints.length + 1}`,
              system: "New System",
              type: "sync",
              description: "Integration description",
              expectedBehavior: "Expected behavior"
            });
          }}
        />

        <ExpectedBehaviorsSection
          behaviors={requirement.expectedBehaviors || []}
          onAddBehavior={() => {
            if (!requirement.expectedBehaviors) {
              requirement.expectedBehaviors = [];
            }
            requirement.expectedBehaviors.push({
              id: `eb${requirement.expectedBehaviors.length + 1}`,
              type: "success",
              condition: "New condition",
              response: "System response"
            });
          }}
        />
      </div>
    </CardContent>
  );
};
