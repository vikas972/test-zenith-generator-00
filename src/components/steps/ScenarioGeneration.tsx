import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  FileText,
  AlertCircle,
  ChevronRight,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
  Database,
  Calendar,
  RefreshCw,
  Save,
  Search,
  Filter,
  History,
  ExternalLink,
  BookOpen,
  Shield,
  Activity,
  List,
} from "lucide-react";

interface Requirement {
  id: string;
  requirementId: string;
  functionalArea: string;
  actors: string;
  flows: string[];
  businessRules: string[];
  validations: string[];
  dataElements: { name: string; type: string; required: boolean }[];
  status: "complete" | "needs_review" | "in_progress" | "rejected";
  missingInfo?: string[];
  dependencies?: string[];
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

interface ScenarioGenerationProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("requirements");
  const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "1",
      requirementId: "REQ-001",
      functionalArea: "Authentication",
      actors: "End User",
      flows: [
        "User provides credentials",
        "System validates input",
        "System grants access",
      ],
      businessRules: [
        "Password must be at least 8 characters",
        "Account locks after 3 failed attempts",
      ],
      validations: [
        "Email format validation",
        "Password complexity check",
      ],
      dataElements: [
        { name: "Email", type: "string", required: true },
        { name: "Password", type: "string", required: true },
      ],
      status: "complete",
      missingInfo: ["Password reset process details"],
      dependencies: ["REQ-002"],
    },
    {
      id: "2",
      requirementId: "REQ-002",
      functionalArea: "User Management",
      actors: "Admin",
      flows: ["User Creation", "User Deletion", "User Modification"],
      businessRules: ["Email verification required", "Admin approval needed"],
      validations: ["Email format validation", "Role-based access control"],
      dataElements: [
        { name: "UserID", type: "string", required: true },
        { name: "Role", type: "string", required: true },
      ],
      status: "needs_review",
      missingInfo: ["Approval workflow details"],
      dependencies: ["REQ-003"],
    },
    {
      id: "3",
      requirementId: "REQ-003",
      functionalArea: "Payment Processing",
      actors: "Customer",
      flows: ["Initiate Payment", "Process Payment", "Confirm Payment"],
      businessRules: [
        "Transaction limit of $1000",
        "CVV verification required",
      ],
      validations: ["Credit card number validation", "Expiry date validation"],
      dataElements: [
        { name: "CardNumber", type: "string", required: true },
        { name: "CVV", type: "string", required: true },
      ],
      status: "in_progress",
      missingInfo: ["Fraud detection mechanism"],
      dependencies: ["REQ-004"],
    },
    {
      id: "4",
      requirementId: "REQ-004",
      functionalArea: "Reporting",
      actors: "Manager",
      flows: ["Generate Report", "View Report", "Export Report"],
      businessRules: ["Reports must be generated daily", "Data retention policy"],
      validations: ["Data integrity check", "Access control"],
      dataElements: [
        { name: "ReportID", type: "string", required: true },
        { name: "DateGenerated", type: "date", required: true },
      ],
      status: "rejected",
      missingInfo: ["Report format details"],
      dependencies: [],
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

  const handleEditRequirement = (requirement: Requirement) => {
    setEditingRequirement(requirement);
  };

  const handleSaveRequirement = () => {
    if (editingRequirement) {
      setRequirements(requirements.map(req => 
        req.id === editingRequirement.id ? editingRequirement : req
      ));
      setEditingRequirement(null);
      toast({
        title: "Requirement Updated",
        description: "The requirement has been successfully updated and will be used to improve our parsing model.",
      });
    }
  };

  const handleRerunForRequirement = (requirementId: string) => {
    toast({
      title: "Regenerating Scenarios",
      description: `Regenerating scenarios for requirement ${requirementId}...`,
    });
  };

  const handleRerunSelected = () => {
    if (selectedRequirements.length === 0) {
      toast({
        title: "No Requirements Selected",
        description: "Please select at least one requirement to regenerate scenarios.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Regenerating Scenarios",
      description: `Regenerating scenarios for ${selectedRequirements.length} requirements...`,
    });
  };

  const handleRerunAll = () => {
    toast({
      title: "Regenerating All Scenarios",
      description: "Regenerating scenarios for all requirements...",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "needs_review":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "in_progress":
        return <RefreshCw className="h-4 w-4 text-blue-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const renderRequirementCard = (req: Requirement) => (
    <Card key={req.id} className="mb-4 border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">
              {req.requirementId}: {req.functionalArea}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(req.status)}
            <Badge variant="outline">{req.status.replace('_', ' ')}</Badge>
          </div>
        </div>
        <CardDescription>
          Actor: {req.actors}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="flows">
            <AccordionTrigger className="text-sm font-medium">
              <Activity className="h-4 w-4 mr-2" />
              Functional Flows
            </AccordionTrigger>
            <AccordionContent>
              <ul className="ml-6 space-y-2">
                {req.flows.map((flow, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                      {index + 1}
                    </div>
                    {flow}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rules">
            <AccordionTrigger className="text-sm font-medium">
              <Shield className="h-4 w-4 mr-2" />
              Business Rules
            </AccordionTrigger>
            <AccordionContent>
              <ul className="ml-6 list-disc space-y-1">
                {req.businessRules.map((rule, index) => (
                  <li key={index} className="text-sm">{rule}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="validations">
            <AccordionTrigger className="text-sm font-medium">
              <List className="h-4 w-4 mr-2" />
              Validations & Data Elements
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-sm">Validations</h4>
                  <ul className="ml-6 list-disc space-y-1">
                    {req.validations.map((validation, index) => (
                      <li key={index} className="text-sm">{validation}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-sm">Data Elements</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {req.dataElements.map((element, index) => (
                      <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                        <span className="font-medium">{element.name}</span>
                        <div className="text-xs text-gray-500">
                          Type: {element.type}
                          {element.required && " • Required"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {req.missingInfo && req.missingInfo.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-md">
            <div className="flex items-center gap-2 text-yellow-800 font-medium text-sm mb-2">
              <AlertCircle className="h-4 w-4" />
              Missing Information
            </div>
            <ul className="space-y-2">
              {req.missingInfo.map((info, index) => (
                <li key={index} className="text-sm text-yellow-800">
                  {info}
                  <div className="mt-1">
                    <Button variant="outline" size="sm" className="mr-2">
                      Accept Suggestion
                    </Button>
                    <Button variant="outline" size="sm" className="mr-2">
                      Modify
                    </Button>
                    <Button variant="outline" size="sm">
                      Reject
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {req.dependencies && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3" />
                Dependencies: {req.dependencies.join(", ")}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditRequirement(req)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRerunForRequirement(req.id)}
              className="text-primary hover:text-primary-hover hover:bg-primary/10"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Regenerate
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsHistoryOpen(true)}
              className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            >
              <History className="h-4 w-4 mr-1" />
              History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedFile && (
        <div className="bg-white shadow-sm mb-6 rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Source File:</span>
                  <span className="font-medium text-gray-900">{selectedFile.name}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Uploaded on {selectedFile.uploadTime.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    ID: {selectedFile.id}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="requirements" className="w-full" onValueChange={setCurrentTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="requirements">Captured Requirements</TabsTrigger>
          <TabsTrigger value="scenarios">Test Scenarios Generated</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">Parsed Requirements</h2>
                <p className="text-sm text-gray-500">
                  {requirements.length} requirements • {
                    requirements.filter(r => r.status === "complete").length
                  } Complete
                </p>
              </div>
              <div className="flex gap-2">
                {selectedRequirements.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleRerunSelected}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerate Selected ({selectedRequirements.length})
                  </Button>
                )}
                <Button onClick={handleRerunAll}>
                  Regenerate All
                  <RefreshCw className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search requirements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {requirements.map(renderRequirementCard)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scenarios">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Test Scenario Generation</h2>
            <Button onClick={handleRerunAll}>
              Generate More
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
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
                      {/*getCoverageIcon(scenario.coverage)*/}
                      <span className={`text-lg font-semibold` /*getCoverageColor(scenario.coverage)*/}>
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

      <Dialog >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-gray-600">{}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Test Conditions</h4>
              <ul className="list-disc list-inside space-y-1">
                {/*selectedScenario?.conditions.map((condition, index) => (
                  <li key={index} className="text-gray-600">{condition}</li>
                ))*/}
              </ul>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Coverage Score</div>
                <div className={`text-lg font-semibold` /*getCoverageColor(selectedScenario?.coverage || 0)*/}>
                  {}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Confidence Score</div>
                <div className="text-lg font-semibold text-primary">
                  {/*selectedScenario?.confidenceScore.toFixed(2)*/}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
