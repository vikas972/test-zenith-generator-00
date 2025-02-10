import { useState } from "react";
import { cn } from "@/lib/utils";
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
  MapPin,
  ZoomIn,
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
  source: {
    paragraph: number;
    page: number;
    text: string;
    startIndex: number;
    endIndex: number;
  };
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
  const [expandedRequirement, setExpandedRequirement] = useState<string | null>(null);
  const [selectedDetailedRequirement, setSelectedDetailedRequirement] = useState<Requirement | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRequirement, setNewRequirement] = useState<Partial<Requirement>>({
    functionalArea: "",
    actors: "",
    flows: [""],
    businessRules: [""],
    validations: [""],
    dataElements: [],
    status: "in_progress"
  });

  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "1",
      requirementId: "REQ-001",
      functionalArea: "User Authentication",
      actors: "End User",
      flows: [
        "User provides credentials",
        "System validates credentials",
        "System grants access"
      ],
      businessRules: [
        "Password must be at least 8 characters",
        "Account locks after 3 failed attempts"
      ],
      validations: [
        "Email format validation",
        "Password complexity check"
      ],
      dataElements: [
        { name: "Email", type: "string", required: true },
        { name: "Password", type: "string", required: true }
      ],
      status: "complete",
      missingInfo: ["Password reset process details"],
      dependencies: ["REQ-005"],
      source: {
        paragraph: 2,
        page: 1,
        text: "The system shall provide secure user authentication mechanisms including password validation and account lockout policies.",
        startIndex: 50,
        endIndex: 150
      }
    },
    {
      id: "2",
      requirementId: "REQ-002",
      functionalArea: "User Management",
      actors: "Administrator",
      flows: [
        "Admin accesses user management",
        "System displays user list",
        "Admin performs user operations"
      ],
      businessRules: [
        "Only admins can manage users",
        "User deletion requires confirmation"
      ],
      validations: [
        "Admin role verification",
        "User data validation"
      ],
      dataElements: [
        { name: "Username", type: "string", required: true },
        { name: "Role", type: "enum", required: true }
      ],
      status: "needs_review",
      source: {
        paragraph: 3,
        page: 1,
        text: "Administrators shall be able to create, modify, and delete user accounts with appropriate access controls.",
        startIndex: 151,
        endIndex: 250
      }
    }
  ]);

  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: "1",
      name: "Basic User Authentication Flow",
      description: "Verify user login with valid credentials",
      coverage: 85,
      requirements: ["REQ-001"],
      details: "Test basic user authentication flow",
      status: "Ready",
      conditions: ["Valid credentials", "Active user account"],
      confidenceScore: 0.9
    },
    {
      id: "2",
      name: "Failed Login Attempts",
      description: "Verify account lockout after multiple failed attempts",
      coverage: 90,
      requirements: ["REQ-001"],
      details: "Test account lockout functionality",
      status: "Ready",
      conditions: ["Invalid credentials", "Multiple attempts"],
      confidenceScore: 0.85
    }
  ]);

  const [sourceContent, setSourceContent] = useState<string>(`
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    
    REQ-001: User Authentication
    The system shall provide secure user authentication mechanisms including password validation and account lockout policies.
    
    REQ-002: User Management
    Administrators shall be able to create, modify, and delete user accounts with appropriate access controls.
    
    REQ-003: Payment Processing
    The system must handle secure payment transactions with proper validation and error handling.
    
    REQ-004: Reporting
    Generate comprehensive reports for system activities and user transactions.
  `);

  const handleCreateRequirement = () => {
    toast({
      title: "Requirement Created",
      description: "New requirement has been successfully created.",
    });
    setIsCreateDialogOpen(false);
    // Here you would typically add the new requirement to your requirements array
  };

  const handleEditRequirement = (requirement: Requirement, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(requirement);
    setExpandedRequirement(requirement.id);
  };

  const handleSaveRequirement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingRequirement) {
      setRequirements(requirements.map(req => 
        req.id === editingRequirement.id ? editingRequirement : req
      ));
      setEditingRequirement(null);
      toast({
        title: "Requirement Updated",
        description: "The requirement has been successfully updated.",
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

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "complete":
        return "All required information is present and validated";
      case "needs_review":
        return "Some information needs verification or clarification";
      case "in_progress":
        return "Currently being analyzed and parsed";
      case "rejected":
        return "Information is incorrect or conflicts with other requirements";
      default:
        return "";
    }
  };

  const handleRequirementClick = (req: Requirement, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRequirement(expandedRequirement === req.id ? null : req.id);
    // Highlight source text
    const sourceElement = document.getElementById('source-content');
    if (sourceElement) {
      const text = sourceElement.innerHTML;
      const highlightedText = text.slice(0, req.source.startIndex) +
        `<mark class="bg-primary/20">${text.slice(req.source.startIndex, req.source.endIndex)}</mark>` +
        text.slice(req.source.endIndex);
      sourceElement.innerHTML = highlightedText;
    }
  };

  const handleDetailedRequirementClick = (req: Requirement) => {
    setSelectedDetailedRequirement(req);
  };

  const renderRequirementList = (req: Requirement) => (
    <div key={req.id}>
      <Card 
        className={cn(
          "mb-2 hover:border-primary cursor-pointer transition-colors",
          expandedRequirement === req.id && "border-primary"
        )}
      >
        <CardHeader 
          className="py-3"
          onClick={(e) => handleRequirementClick(req, e)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <div className="flex flex-col">
                {editingRequirement?.id === req.id ? (
                  <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                    <Input
                      value={editingRequirement.functionalArea}
                      onChange={(e) =>
                        setEditingRequirement({
                          ...editingRequirement,
                          functionalArea: e.target.value,
                        })
                      }
                      placeholder="Functional Area"
                      className="text-sm"
                    />
                    <Input
                      value={editingRequirement.actors}
                      onChange={(e) =>
                        setEditingRequirement({
                          ...editingRequirement,
                          actors: e.target.value,
                        })
                      }
                      placeholder="Actors"
                      className="text-xs"
                    />
                  </div>
                ) : (
                  <>
                    <CardTitle className="text-sm">
                      {req.requirementId}: {req.functionalArea}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Actor: {req.actors}
                    </CardDescription>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-xs text-gray-500">
                  Page {req.source.page}, ¶{req.source.paragraph}
                </span>
              </div>
              {getStatusIcon(req.status)}
              <Badge
                variant="outline"
                className="text-xs group relative"
              >
                {req.status.replace('_', ' ')}
                <span className="invisible group-hover:visible absolute -top-8 left-0 bg-black text-white text-xs p-1 rounded whitespace-nowrap">
                  {getStatusDescription(req.status)}
                </span>
              </Badge>
            </div>
          </div>
        </CardHeader>

        {expandedRequirement === req.id && (
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="flows" onClick={(e) => e.stopPropagation()}>
                <AccordionTrigger className="text-sm font-medium">
                  <Activity className="h-4 w-4 mr-2" />
                  Functional Flows
                </AccordionTrigger>
                <AccordionContent>
                  {editingRequirement?.id === req.id ? (
                    <div className="space-y-2">
                      {editingRequirement.flows.map((flow, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                            {index + 1}
                          </div>
                          <Input
                            value={flow}
                            onChange={(e) => {
                              const newFlows = [...editingRequirement.flows];
                              newFlows[index] = e.target.value;
                              setEditingRequirement({
                                ...editingRequirement,
                                flows: newFlows,
                              });
                            }}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newFlows = editingRequirement.flows.filter((_, i) => i !== index);
                              setEditingRequirement({
                                ...editingRequirement,
                                flows: newFlows,
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingRequirement({
                            ...editingRequirement,
                            flows: [...editingRequirement.flows, ""],
                          });
                        }}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Flow
                      </Button>
                    </div>
                  ) : (
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
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rules" onClick={(e) => e.stopPropagation()}>
                <AccordionTrigger className="text-sm font-medium">
                  <Shield className="h-4 w-4 mr-2" />
                  Business Rules
                </AccordionTrigger>
                <AccordionContent>
                  {editingRequirement?.id === req.id ? (
                    <div className="space-y-2">
                      {editingRequirement.businessRules.map((rule, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={rule}
                            onChange={(e) => {
                              const newRules = [...editingRequirement.businessRules];
                              newRules[index] = e.target.value;
                              setEditingRequirement({
                                ...editingRequirement,
                                businessRules: newRules,
                              });
                            }}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newRules = editingRequirement.businessRules.filter((_, i) => i !== index);
                              setEditingRequirement({
                                ...editingRequirement,
                                businessRules: newRules,
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingRequirement({
                            ...editingRequirement,
                            businessRules: [...editingRequirement.businessRules, ""],
                          });
                        }}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Business Rule
                      </Button>
                    </div>
                  ) : (
                    <ul className="ml-6 list-disc space-y-1">
                      {req.businessRules.map((rule, index) => (
                        <li key={index} className="text-sm">{rule}</li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="validations" onClick={(e) => e.stopPropagation()}>
                <AccordionTrigger className="text-sm font-medium">
                  <List className="h-4 w-4 mr-2" />
                  Validations & Data Elements
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {editingRequirement?.id === req.id ? (
                      <>
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Validations</h4>
                          <div className="space-y-2">
                            {editingRequirement.validations.map((validation, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input
                                  value={validation}
                                  onChange={(e) => {
                                    const newValidations = [...editingRequirement.validations];
                                    newValidations[index] = e.target.value;
                                    setEditingRequirement({
                                      ...editingRequirement,
                                      validations: newValidations,
                                    });
                                  }}
                                  className="flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    const newValidations = editingRequirement.validations.filter((_, i) => i !== index);
                                    setEditingRequirement({
                                      ...editingRequirement,
                                      validations: newValidations,
                                    });
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              onClick={() => {
                                setEditingRequirement({
                                  ...editingRequirement,
                                  validations: [...editingRequirement.validations, ""],
                                });
                              }}
                              className="w-full"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Validation
                            </Button>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-sm">Data Elements</h4>
                          <div className="space-y-2">
                            {editingRequirement.dataElements.map((element, index) => (
                              <div key={index} className="grid grid-cols-3 gap-2">
                                <Input
                                  placeholder="Name"
                                  value={element.name}
                                  onChange={(e) => {
                                    const newElements = [...editingRequirement.dataElements];
                                    newElements[index] = { ...element, name: e.target.value };
                                    setEditingRequirement({
                                      ...editingRequirement,
                                      dataElements: newElements,
                                    });
                                  }}
                                />
                                <Input
                                  placeholder="Type"
                                  value={element.type}
                                  onChange={(e) => {
                                    const newElements = [...editingRequirement.dataElements];
                                    newElements[index] = { ...element, type: e.target.value };
                                    setEditingRequirement({
                                      ...editingRequirement,
                                      dataElements: newElements,
                                    });
                                  }}
                                />
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      const newElements = editingRequirement.dataElements.filter((_, i) => i !== index);
                                      setEditingRequirement({
                                        ...editingRequirement,
                                        dataElements: newElements,
                                      });
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              onClick={() => {
                                setEditingRequirement({
                                  ...editingRequirement,
                                  dataElements: [
                                    ...editingRequirement.dataElements,
                                    { name: "", type: "", required: false },
                                  ],
                                });
                              }}
                              className="w-full"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Data Element
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
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

            <div className="mt-4 flex justify-end gap-2">
              {editingRequirement?.id === req.id ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingRequirement(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveRequirement(e);
                    }}
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleEditRequirement(req, e)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRerunForRequirement(req.id);
                    }}
                    className="text-primary hover:text-primary-hover hover:bg-primary/10"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Regenerate
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsHistoryOpen(true);
                    }}
                    className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                  >
                    <History className="h-4 w-4 mr-1" />
                    History
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );

  const renderDetailedRequirementDialog = () => (
    <Dialog open={!!selectedDetailedRequirement} onOpenChange={() => setSelectedDetailedRequirement(null)}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            {selectedDetailedRequirement?.requirementId}: {selectedDetailedRequirement?.functionalArea}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="flows">
                  <AccordionTrigger 
                    className="text-sm font-medium"
                    onClick={(e) => selectedDetailedRequirement && handleRequirementClick(selectedDetailedRequirement, e)}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Functional Flows
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-6 space-y-2">
                      {selectedDetailedRequirement?.flows.map((flow, index) => (
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
                      {selectedDetailedRequirement?.businessRules.map((rule, index) => (
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
                          {selectedDetailedRequirement?.validations.map((validation, index) => (
                            <li key={index} className="text-sm">{validation}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2 text-sm">Data Elements</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedDetailedRequirement?.dataElements.map((element, index) => (
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

              {selectedDetailedRequirement?.missingInfo && selectedDetailedRequirement.missingInfo.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-md">
                  <div className="flex items-center gap-2 text-yellow-800 font-medium text-sm mb-2">
                    <AlertCircle className="h-4 w-4" />
                    Missing Information
                  </div>
                  <ul className="space-y-2">
                    {selectedDetailedRequirement.missingInfo.map((info, index) => (
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
            </CardContent>
          </Card>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditRequirement(selectedDetailedRequirement!)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRerunForRequirement(selectedDetailedRequirement!.id)}
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
      </DialogContent>
    </Dialog>
  );

  const renderEditDialog = () => (
    <Dialog open={!!editingRequirement} onOpenChange={() => setEditingRequirement(null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Requirement</DialogTitle>
        </DialogHeader>
        {editingRequirement && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="functionalArea" className="text-sm font-medium">
                Functional Area
              </label>
              <Input
                id="functionalArea"
                value={editingRequirement.functionalArea}
                onChange={(e) =>
                  setEditingRequirement({
                    ...editingRequirement,
                    functionalArea: e.target.value,
                  })
                }
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="actors" className="text-sm font-medium">
                Actors
              </label>
              <Input
                id="actors"
                value={editingRequirement.actors}
                onChange={(e) =>
                  setEditingRequirement({
                    ...editingRequirement,
                    actors: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Flows</label>
              {editingRequirement.flows.map((flow, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={flow}
                    onChange={(e) => {
                      const newFlows = [...editingRequirement.flows];
                      newFlows[index] = e.target.value;
                      setEditingRequirement({
                        ...editingRequirement,
                        flows: newFlows,
                      });
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newFlows = editingRequirement.flows.filter((_, i) => i !== index);
                      setEditingRequirement({
                        ...editingRequirement,
                        flows: newFlows,
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  setEditingRequirement({
                    ...editingRequirement,
                    flows: [...editingRequirement.flows, ""],
                  });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Flow
              </Button>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Business Rules</label>
              {editingRequirement.businessRules.map((rule, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={rule}
                    onChange={(e) => {
                      const newRules = [...editingRequirement.businessRules];
                      newRules[index] = e.target.value;
                      setEditingRequirement({
                        ...editingRequirement,
                        businessRules: newRules,
                      });
                    }}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newRules = editingRequirement.businessRules.filter((_, i) => i !== index);
                      setEditingRequirement({
                        ...editingRequirement,
                        businessRules: newRules,
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  setEditingRequirement({
                    ...editingRequirement,
                    businessRules: [...editingRequirement.businessRules, ""],
                  });
                }}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Business Rule
              </Button>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Validations</label>
              {editingRequirement.validations.map((validation, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={validation}
                    onChange={(e) => {
                      const newValidations = [...editingRequirement.validations];
                      newValidations[index] = e.target.value;
                      setEditingRequirement({
                        ...editingRequirement,
                        validations: newValidations,
                      });
                    }}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newValidations = editingRequirement.validations.filter((_, i) => i !== index);
                      setEditingRequirement({
                        ...editingRequirement,
                        validations: newValidations,
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  setEditingRequirement({
                    ...editingRequirement,
                    validations: [...editingRequirement.validations, ""],
                  });
                }}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Validation
              </Button>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Data Elements</label>
              {editingRequirement.dataElements.map((element, index) => (
                <div key={index} className="grid grid-cols-3 gap-2">
                  <Input
                    placeholder="Name"
                    value={element.name}
                    onChange={(e) => {
                      const newElements = [...editingRequirement.dataElements];
                      newElements[index] = { ...element, name: e.target.value };
                      setEditingRequirement({
                        ...editingRequirement,
                        dataElements: newElements,
                      });
                    }}
                  />
                  <Input
                    placeholder="Type"
                    value={element.type}
                    onChange={(e) => {
                      const newElements = [...editingRequirement.dataElements];
                      newElements[index] = { ...element, type: e.target.value };
                      setEditingRequirement({
                        ...editingRequirement,
                        dataElements: newElements,
                      });
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newElements = editingRequirement.dataElements.filter((_, i) => i !== index);
                        setEditingRequirement({
                          ...editingRequirement,
                          dataElements: newElements,
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  setEditingRequirement({
                    ...editingRequirement,
                    dataElements: [
                      ...editingRequirement.dataElements,
                      { name: "", type: "", required: false },
                    ],
                  });
                }}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Data Element
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Requirements & Scenarios
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage and generate test scenarios from requirements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList>
              <TabsTrigger value="requirements" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Requirements
              </TabsTrigger>
              <TabsTrigger value="scenarios" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Generated Scenarios
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requirements" className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search requirements..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Requirement
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRerunSelected}
                    disabled={selectedRequirements.length === 0}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate Selected
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRerunAll}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate All
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {requirements.map((req) => renderRequirementList(req))}
              </div>
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenarios.map((scenario) => (
                  <Card key={scenario.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{scenario.name}</CardTitle>
                      <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Coverage</span>
                          <span className="text-sm">{scenario.coverage}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Status</span>
                          <Badge variant="outline">{scenario.status}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Confidence</span>
                          <span className="text-sm">
                            {(scenario.confidenceScore * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Source Document
              </CardTitle>
              <CardDescription>
                Original requirements document with highlighting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                id="source-content"
                className="prose prose-sm max-w-none h-[calc(100vh-20rem)] overflow-y-auto"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {sourceContent}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {renderDetailedRequirementDialog()}
      {renderEditDialog()}
    </div>
  );
};
