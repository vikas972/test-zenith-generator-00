import { useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(testCase.title);
  const [editedPriority, setEditedPriority] = useState(testCase.priority);
  const [editedStatus, setEditedStatus] = useState(testCase.status);

  const handleSaveEdit = () => {
    // Here you would typically call a function passed from the parent to update the test case
    console.log("Saving edited test case:", {
      ...testCase,
      title: editedTitle,
      priority: editedPriority,
      status: editedStatus,
    });
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Here you would typically call a function passed from the parent to delete the test case
    console.log("Deleting test case:", testCase.id);
  };

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
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{testCase.id}</span>
              <span className="text-gray-500">-</span>
              {isEditing ? (
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="h-7"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span>{testCase.title}</span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{testCase.description}</p>
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
              {isEditing ? (
                <>
                  <Select 
                    value={editedPriority} 
                    onValueChange={setEditedPriority}
                    onOpenChange={(e) => e.stopPropagation()}
                  >
                    <SelectTrigger className="h-7 w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={editedStatus} 
                    onValueChange={setEditedStatus}
                    onOpenChange={(e) => e.stopPropagation()}
                  >
                    <SelectTrigger className="h-7 w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="needs_review">Needs Review</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              ) : (
                <>
                  <Badge variant={testCase.priority === 'high' ? 'destructive' : 'secondary'}>
                    {testCase.priority}
                  </Badge>
                  <Badge variant={testCase.status === 'completed' ? 'default' : 'secondary'}>
                    {testCase.status}
                  </Badge>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveEdit();
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={onToggle}
                >
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="px-4 pb-4">
          <Accordion type="single" collapsible className="w-full">
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
