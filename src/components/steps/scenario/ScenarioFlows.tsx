
import { type TestScenarioFlow, type FlowType } from "./types";

interface ScenarioFlowsProps {
  flows: TestScenarioFlow[];
}

const getFlowTypeIcon = (type: FlowType) => {
  switch (type) {
    case "primary":
      return "→";
    case "alternate":
      return "⤷";
    case "negative":
      return "⚠";
    case "exception":
      return "⚡";
    default:
      return "•";
  }
};

export const ScenarioFlows = ({ flows }: ScenarioFlowsProps) => {
  return (
    <div className="mt-4 space-y-4">
      {flows.map((flow, index) => (
        <div key={index} className="space-y-2">
          <h4 className="font-medium">
            {index + 1}. {flow.type.charAt(0).toUpperCase() + flow.type.slice(1)} Flow
          </h4>
          <div className="text-sm text-gray-600 ml-4">
            Description: {flow.description}
          </div>
          <div className="space-y-2 ml-6">
            {flow.subflows.map((subflow, subIndex) => (
              <div key={subIndex} className="text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400">{getFlowTypeIcon(flow.type)}</span>
                  <div className="space-y-1">
                    <div className="font-medium">{subflow.name}</div>
                    <div className="text-gray-600">Coverage: {subflow.coverage}</div>
                    <div className="text-gray-600">Expected Results: {subflow.expectedResults}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
