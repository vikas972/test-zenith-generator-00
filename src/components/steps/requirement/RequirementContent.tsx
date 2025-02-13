
import { CardContent } from "@/components/ui/card";
import { type Requirement } from "./types";
import { FlowsSection } from "./sections/FlowsSection";
import { BusinessRulesSection } from "./sections/BusinessRulesSection";
import { DataElementsSection } from "./sections/DataElementsSection";
import { IntegrationPointsSection } from "./sections/IntegrationPointsSection";
import { ExpectedBehaviorsSection } from "./sections/ExpectedBehaviorsSection";

interface RequirementContentProps {
  requirement: Requirement;
}

export const RequirementContent = ({ requirement }: RequirementContentProps) => {
  return (
    <CardContent>
      <div className="space-y-8">
        <FlowsSection
          flows={requirement.flows}
          onAddFlow={(flow) => {
            requirement.flows.push(flow);
          }}
          onUpdateFlow={(flowId, updatedFlow) => {
            requirement.flows = requirement.flows.map(f =>
              f.id === flowId ? updatedFlow : f
            );
          }}
        />

        <BusinessRulesSection
          rules={requirement.businessRules}
          onAddRule={(rule) => {
            requirement.businessRules.push(rule);
          }}
          onUpdateRule={(ruleId, updatedRule) => {
            requirement.businessRules = requirement.businessRules.map(r =>
              r.id === ruleId ? updatedRule : r
            );
          }}
        />

        <DataElementsSection
          elements={requirement.dataElements}
          onAddElement={(element) => {
            requirement.dataElements.push(element);
          }}
          onUpdateElement={(elementId, updatedElement) => {
            requirement.dataElements = requirement.dataElements.map(e =>
              e.id === elementId ? updatedElement : e
            );
          }}
        />

        <IntegrationPointsSection
          integrationPoints={requirement.integrationPoints || []}
          onAddIntegrationPoint={(point) => {
            if (!requirement.integrationPoints) requirement.integrationPoints = [];
            requirement.integrationPoints.push(point);
          }}
          onUpdateIntegrationPoint={(pointId, updatedPoint) => {
            if (requirement.integrationPoints) {
              requirement.integrationPoints = requirement.integrationPoints.map(p =>
                p.id === pointId ? updatedPoint : p
              );
            }
          }}
        />

        <ExpectedBehaviorsSection
          behaviors={requirement.expectedBehaviors || []}
          onAddBehavior={(behavior) => {
            if (!requirement.expectedBehaviors) requirement.expectedBehaviors = [];
            requirement.expectedBehaviors.push(behavior);
          }}
          onUpdateBehavior={(behaviorId, updatedBehavior) => {
            if (requirement.expectedBehaviors) {
              requirement.expectedBehaviors = requirement.expectedBehaviors.map(b =>
                b.id === behaviorId ? updatedBehavior : b
              );
            }
          }}
        />
      </div>
    </CardContent>
  );
};
