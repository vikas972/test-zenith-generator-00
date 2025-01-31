import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle, ChevronRight } from "lucide-react";

export const ScenarioGeneration = () => {
  const [scenarios] = useState([
    {
      id: 1,
      name: "User Authentication Flow",
      coverage: 85,
      requirements: ["AUTH-001", "AUTH-002", "AUTH-003"],
      details: "Complete login and registration flow validation",
      status: "Generated",
    },
    {
      id: 2,
      name: "Payment Processing",
      coverage: 92,
      requirements: ["PAY-001", "PAY-002"],
      details: "Credit card and PayPal payment processing scenarios",
      status: "In Progress",
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Generated Scenarios</h2>
        <Button>
          Generate More
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">{scenario.name}</h3>
                  <p className="text-sm text-gray-600">{scenario.status}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-primary">
                  {scenario.coverage}%
                </div>
                <div className="text-sm text-gray-600">Coverage</div>
              </div>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="details">
                <AccordionTrigger>View Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-gray-600">{scenario.details}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Requirements</h4>
                      <div className="flex flex-wrap gap-2">
                        {scenario.requirements.map((req) => (
                          <span
                            key={req}
                            className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    {scenario.coverage < 90 && (
                      <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-md">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm">
                          Coverage is below recommended threshold (90%)
                        </span>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};