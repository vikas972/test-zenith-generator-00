import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  FileText,
  AlertCircle,
  ChevronRight,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Requirement {
  id: string;
  requirementId: string;
  functionalArea: string;
  actors: string;
  flows: string;
  businessRules: string;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  coverage: number;
  requirements: string[];
  details: string;
  status: string;
  conditions: string[];
  confidenceScore: number;
}

export const ScenarioGeneration = () => {
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "1",
      requirementId: "REQ-001",
      functionalArea: "Authentication",
      actors: "End User",
      flows: "Login Flow",
      businessRules: "Password must be at least 8 characters",
    },
    {
      id: "2",
      requirementId: "REQ-002",
      functionalArea: "User Management",
      actors: "Admin",
      flows: "User Creation",
      businessRules: "Email verification required",
    },
  ]);

  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: "1",
      name: "User Authentication Flow",
      coverage: 85,
      requirements: ["REQ-001"],
      details: "Complete login and registration flow validation",
      status: "Generated",
      description: "Validates the entire user authentication process",
      conditions: ["Valid credentials", "Invalid credentials", "Password reset"],
      confidenceScore: 0.92,
    },
    {
      id: "2",
      name: "Admin User Management",
      coverage: 92,
      requirements: ["REQ-002"],
      details: "Admin user management scenarios",
      status: "In Progress",
      description: "Tests admin capabilities for user management",
      conditions: ["Create user", "Modify user", "Delete user"],
      confidenceScore: 0.88,
    },
  ]);

  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 90) return "text-green-600";
    if (coverage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getCoverageIcon = (coverage: number) => {
    if (coverage >= 90) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (coverage >= 75) return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Test Scenario Generation</h2>
        <Button>
          Generate More
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="requirements" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="requirements">View Captured Requirements</TabsTrigger>
          <TabsTrigger value="scenarios">Generate Test Scenarios</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Parsed Requirements</h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Requirement
            </Button>
          </div>

          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Requirement ID</TableHead>
                  <TableHead>Functional Area</TableHead>
                  <TableHead>Actors</TableHead>
                  <TableHead>Flows</TableHead>
                  <TableHead>Business Rules</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requirements.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.requirementId}</TableCell>
                    <TableCell>{req.functionalArea}</TableCell>
                    <TableCell>{req.actors}</TableCell>
                    <TableCell>{req.flows}</TableCell>
                    <TableCell>{req.businessRules}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="scenarios">
          <div className="grid gap-6">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-primary/50 transition-colors"
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
                    <div className="flex items-center gap-2">
                      {getCoverageIcon(scenario.coverage)}
                      <span className={`text-lg font-semibold ${getCoverageColor(scenario.coverage)}`}>
                        {scenario.coverage}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">Coverage</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{scenario.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {scenario.requirements.map((req) => (
                    <span
                      key={req}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-sm"
                    >
                      {req}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedScenario(scenario);
                      setIsDetailsOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedScenario?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-gray-600">{selectedScenario?.description}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Test Conditions</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedScenario?.conditions.map((condition, index) => (
                  <li key={index} className="text-gray-600">{condition}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Coverage Score</div>
                <div className={`text-lg font-semibold ${getCoverageColor(selectedScenario?.coverage || 0)}`}>
                  {selectedScenario?.coverage}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Confidence Score</div>
                <div className="text-lg font-semibold text-primary">
                  {selectedScenario?.confidenceScore.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};