
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { TestCase } from "./types";

interface TestCaseCardProps {
  testCase: TestCase;
  isExpanded: boolean;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onToggle: () => void;
  onScenarioClick: (scenarioId: string) => void;
  onRequirementClick: (requirementId: string) => void;
}

export const TestCaseCard = ({
  testCase,
  isExpanded,
  isSelected,
  onSelect,
  onToggle,
  onScenarioClick,
  onRequirementClick,
}: TestCaseCardProps) => {
  return (
    <Card
      className={cn(
        "mb-4 transition-all",
        isSelected && "border-primary"
      )}
    >
      <CardHeader className="p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{testCase.id}</span>
              <span className="text-gray-500">-</span>
              <span>{testCase.title}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onScenarioClick(testCase.scenarioId);
                }}
              >
                {testCase.scenarioId}
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onRequirementClick(testCase.requirementId);
                }}
              >
                {testCase.requirementId}
              </Badge>
              <Badge variant={testCase.priority === 'high' ? 'destructive' : 'secondary'}>
                {testCase.priority}
              </Badge>
              <Badge variant={testCase.status === 'completed' ? 'default' : 'secondary'}>
                {testCase.status}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="gap-2"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="px-4 pb-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-sm font-medium">Description</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-gray-600">{testCase.description}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="preconditions">
              <AccordionTrigger className="text-sm font-medium">Pre-conditions</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {testCase.preconditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="test-data">
              <AccordionTrigger className="text-sm font-medium">Test Data</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {testCase.testData.map((data, index) => (
                    <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600 font-medium">{data.field}:</span>
                      <span>{data.value}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="test-steps" className="border-b">
              <AccordionTrigger className="text-sm font-medium">Test Steps</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {testCase.testSteps.map((step, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded">
                      <div className="font-medium text-sm mb-2">Step {index + 1}: {step.step}</div>
                      <div className="text-sm space-y-1 ml-4">
                        <div className="text-gray-600">Input: {step.input}</div>
                        <div className="text-gray-600">Expected: {step.expected}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="expected-results">
              <AccordionTrigger className="text-sm font-medium">Expected Results</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {testCase.expectedResults.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="postconditions">
              <AccordionTrigger className="text-sm font-medium">Post-conditions</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {testCase.postconditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      )}
    </Card>
  );
};
