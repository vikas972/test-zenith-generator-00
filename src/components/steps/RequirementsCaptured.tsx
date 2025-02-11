import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Edit,
  Save,
  AlertCircle,
  Check,
  X,
  List,
  Shield,
  Activity,
  RefreshCw,
  MapPin,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface RequirementsCapturedProps {
  selectedFile: {
    id: string;
    name: string;
    uploadTime: Date;
  } | null;
}

interface Flow {
  id: string;
  description: string;
}

interface BusinessRule {
  id: string;
  description: string;
}

interface DataElement {
  id: string;
  name: string;
  type: string;
  required: boolean;
  validation?: string;
}

interface Requirement {
  id: string;
  requirementId: string;
  functionalArea: string;
  description: string;
  actors: string[];
  flows: Flow[];
  businessRules: BusinessRule[];
  dataElements: DataElement[];
  missingInfo: string[];
  status: "completed" | "needs_review" | "in_progress";
  confidence: number;
  source: {
    paragraph: number;
    page: number;
    text: string;
    startIndex: number;
    endIndex: number;
  };
}

export const RequirementsCaptured = ({ selectedFile }: RequirementsCapturedProps) => {
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "1",
      requirementId: "REQ-001",
      functionalArea: "User Authentication",
      description: "The system shall provide secure authentication mechanisms",
      actors: ["End User", "System"],
      flows: [
        { id: "f1", description: "User enters credentials" },
        { id: "f2", description: "System validates credentials" },
      ],
      businessRules: [
        { id: "br1", description: "Password must be at least 8 characters" },
        { id: "br2", description: "Account locks after 3 failed attempts" },
      ],
      dataElements: [
        { id: "de1", name: "Username", type: "string", required: true },
        { id: "de2", name: "Password", type: "string", required: true },
      ],
      missingInfo: ["Password reset flow", "2FA requirements"],
      status: "needs_review",
      confidence: 0.85,
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
      description: "Administrators shall be able to manage user accounts",
      actors: ["Admin", "System"],
      flows: [
        { id: "f3", description: "Admin creates new user account" },
        { id: "f4", description: "Admin modifies user permissions" },
      ],
      businessRules: [
        { id: "br3", description: "Only admins can modify user roles" },
        { id: "br4", description: "User email must be unique" },
      ],
      dataElements: [
        { id: "de3", name: "Email", type: "string", required: true },
        { id: "de4", name: "Role", type: "enum", required: true },
      ],
      missingInfo: ["Role hierarchy definition", "Permission matrix"],
      status: "in_progress",
      confidence: 0.75,
      source: {
        paragraph: 3,
        page: 1,
        text: "Administrators shall have the ability to create, modify, and delete user accounts with appropriate access controls.",
        startIndex: 200,
        endIndex: 300
      }
    },
    {
      id: "3",
      requirementId: "REQ-003",
      functionalArea: "Password Recovery",
      description: "System shall provide password recovery mechanism",
      actors: ["User", "System", "Email Service"],
      flows: [
        { id: "f5", description: "User requests password reset" },
        { id: "f6", description: "System sends recovery email" },
      ],
      businessRules: [
        { id: "br5", description: "Reset links expire after 24 hours" },
        { id: "br6", description: "New password must be different from last 3" },
      ],
      dataElements: [
        { id: "de5", name: "ResetToken", type: "string", required: true },
        { id: "de6", name: "ExpiryTime", type: "datetime", required: true },
      ],
      missingInfo: ["Rate limiting rules", "Recovery email template"],
      status: "completed",
      confidence: 0.95,
      source: {
        paragraph: 4,
        page: 2,
        text: "The system must implement a secure password recovery mechanism with time-limited reset tokens.",
        startIndex: 350,
        endIndex: 450
      }
    },
    {
      id: "4",
      requirementId: "REQ-004",
      functionalArea: "Session Management",
      description: "System shall manage user sessions securely",
      actors: ["User", "System"],
      flows: [
        { id: "f7", description: "System creates session on login" },
        { id: "f8", description: "System invalidates session on logout" },
      ],
      businessRules: [
        { id: "br7", description: "Sessions expire after 30 minutes of inactivity" },
        { id: "br8", description: "Maximum 5 concurrent sessions per user" },
      ],
      dataElements: [
        { id: "de7", name: "SessionID", type: "string", required: true },
        { id: "de8", name: "LastActivity", type: "timestamp", required: true },
      ],
      missingInfo: ["Session revival mechanism", "Multi-device handling"],
      status: "needs_review",
      confidence: 0.80,
      source: {
        paragraph: 5,
        page: 2,
        text: "User sessions must be managed securely with proper timeout and concurrent session controls.",
        startIndex: 500,
        endIndex: 600
      }
    }
  ]);

  const [expandedRequirement, setExpandedRequirement] = useState<string | null>(null);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [editingRequirement, setEditingRequirement] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<{
    type: "flow" | "rule" | "data" | "missing";
    requirementId: string;
    elementId?: string;
  } | null>(null);

  const [sourceContent, setSourceContent] = useState<string>(`
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    
    REQ-001: User Authentication
    The system shall provide secure user authentication mechanisms including password validation and account lockout policies.
    
    REQ-002: User Management
    Administrators shall be able to create, modify, and delete user accounts with appropriate access controls.
  `);

  const handleRequirementClick = (requirement: Requirement) => {
    setExpandedRequirement(expandedRequirement === requirement.id ? null : requirement.id);
    
    // Highlight source text
    const sourceElement = document.getElementById('source-content');
    if (sourceElement) {
      const text = sourceElement.innerHTML;
      const highlightedText = text.slice(0, requirement.source.startIndex) +
        `<mark class="bg-yellow-100">${text.slice(requirement.source.startIndex, requirement.source.endIndex)}</mark>` +
        text.slice(requirement.source.endIndex);
      sourceElement.innerHTML = highlightedText;
    }
  };

  const handleAddNewRequirement = () => {
    const newRequirement: Requirement = {
      id: `${Date.now()}`,
      requirementId: `REQ-${requirements.length + 1}`.padStart(3, '0'),
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
    };
    setRequirements([...requirements, newRequirement]);
    setExpandedRequirement(newRequirement.id);
    setEditingRequirement(newRequirement.id);
    toast.success("New requirement added");
  };

  const handleEditRequirement = (requirement: Requirement, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(requirement.id);
  };

  const handleSaveRequirement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(null);
    toast.success("Changes saved successfully");
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(null);
  };

  const handleRegenerateSelected = () => {
    if (selectedRequirements.length === 0) {
      toast.error("Please select at least one requirement to regenerate");
      return;
    }
    toast.success(`Regenerating ${selectedRequirements.length} requirements`);
  };

  const handleAddElement = (type: "flow" | "rule" | "data" | "missing", requirementId: string) => {
    setSelectedElement({ type, requirementId });
  };

  const handleEditElement = (
    type: "flow" | "rule" | "data" | "missing",
    requirementId: string,
    elementId: string
  ) => {
    setSelectedElement({ type, requirementId, elementId });
  };

  const handleSaveElement = (formData: any) => {
    if (!selectedElement) return;

    const { type, requirementId, elementId } = selectedElement;
    setRequirements((prevReqs) =>
      prevReqs.map((req) => {
        if (req.id !== requirementId) return req;

        const updatedReq = { ...req };
        if (elementId) {
          // Edit existing element
          switch (type) {
            case "flow":
              updatedReq.flows = req.flows.map((f) =>
                f.id === elementId ? { ...f, ...formData } : f
              );
              break;
            case "rule":
              updatedReq.businessRules = req.businessRules.map((r) =>
                r.id === elementId ? { ...r, ...formData } : r
              );
              break;
            case "data":
              updatedReq.dataElements = req.dataElements.map((d) =>
                d.id === elementId ? { ...d, ...formData } : d
              );
              break;
            case "missing":
              updatedReq.missingInfo = req.missingInfo.map((m, i) =>
                i === parseInt(elementId) ? formData.description : m
              );
              break;
          }
        } else {
          // Add new element
          switch (type) {
            case "flow":
              updatedReq.flows.push({
                id: `f${Date.now()}`,
                description: formData.description,
              });
              break;
            case "rule":
              updatedReq.businessRules.push({
                id: `br${Date.now()}`,
                description: formData.description,
              });
              break;
            case "data":
              updatedReq.dataElements.push({
                id: `de${Date.now()}`,
                ...formData,
              });
              break;
            case "missing":
              updatedReq.missingInfo.push(formData.description);
              break;
          }
        }
        return updatedReq;
      })
    );

    setSelectedElement(null);
    toast.success("Changes saved successfully");
  };

  const renderElementDialog = () => {
    if (!selectedElement) return null;

    const { type, requirementId, elementId } = selectedElement;
    const requirement = requirements.find((r) => r.id === requirementId);
    if (!requirement) return null;

    let element;
    let title;

    switch (type) {
      case "flow":
        element = elementId
          ? requirement.flows.find((f) => f.id === elementId)
          : null;
        title = `${elementId ? "Edit" : "Add"} Functional Flow`;
        break;
      case "rule":
        element = elementId
          ? requirement.businessRules.find((r) => r.id === elementId)
          : null;
        title = `${elementId ? "Edit" : "Add"} Business Rule`;
        break;
      case "data":
        element = elementId
          ? requirement.dataElements.find((d) => d.id === elementId)
          : null;
        title = `${elementId ? "Edit" : "Add"} Data Element`;
        break;
      case "missing":
        element = elementId
          ? { description: requirement.missingInfo[parseInt(elementId)] }
          : null;
        title = `${elementId ? "Edit" : "Add"} Missing Information`;
        break;
    }

    return (
      <Dialog open={true} onOpenChange={() => setSelectedElement(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data: any = {};
              formData.forEach((value, key) => {
                data[key] = value;
              });
              handleSaveElement(data);
            }}
            className="space-y-4"
          >
            {type === "data" ? (
              <>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={element?.name || ""}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    name="type"
                    defaultValue={element?.type || ""}
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="required"
                    name="required"
                    defaultChecked={element?.required}
                  />
                  <Label htmlFor="required">Required</Label>
                </div>
                <div>
                  <Label htmlFor="validation">Validation Rules</Label>
                  <Input
                    id="validation"
                    name="validation"
                    defaultValue={element?.validation || ""}
                  />
                </div>
              </>
            ) : (
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={element?.description || ""}
                  required
                />
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedElement(null)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  const renderRequirement = (requirement: Requirement) => {
    const isEditing = editingRequirement === requirement.id;
    const isExpanded = expandedRequirement === requirement.id;

    return (
      <Card key={requirement.id} className="mb-4">
        <CardHeader 
          className="py-3 cursor-pointer hover:bg-gray-50"
          onClick={() => handleRequirementClick(requirement)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedRequirements.includes(requirement.id)}
                onCheckedChange={(checked) => {
                  setSelectedRequirements(prev =>
                    checked
                      ? [...prev, requirement.id]
                      : prev.filter(id => id !== requirement.id)
                  );
                }}
                onClick={(e) => e.stopPropagation()}
              />
              <div className="flex items-center gap-2">
                <Badge variant="outline">{requirement.requirementId}</Badge>
                {isEditing ? (
                  <Input
                    value={requirement.functionalArea}
                    onChange={(e) =>
                      setRequirements((prevReqs) =>
                        prevReqs.map((r) =>
                          r.id === requirement.id
                            ? { ...r, functionalArea: e.target.value }
                            : r
                        )
                      )
                    }
                    className="w-64"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <CardTitle className="text-lg">{requirement.functionalArea}</CardTitle>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin className="h-4 w-4" />
                <span className="text-xs">
                  Page {requirement.source.page}, ¶{requirement.source.paragraph}
                </span>
              </div>
              <Badge
                variant={
                  requirement.status === "completed"
                    ? "default"
                    : requirement.status === "needs_review"
                    ? "destructive"
                    : "secondary"
                }
              >
                {requirement.status.replace("_", " ")}
              </Badge>
              {isEditing ? (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSaveRequirement}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => handleEditRequirement(requirement, e)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          </div>
        </CardHeader>
        
        {isExpanded && (
          <CardContent>
            <div className="space-y-6">
              {/* Functional Flows */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Functional Flows
                  </h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAddElement("flow", requirement.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {requirement.flows.map((flow) => (
                    <div
                      key={flow.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm">{flow.description}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleEditElement("flow", requirement.id, flow.id)
                        }
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Rules */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Business Rules
                  </h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAddElement("rule", requirement.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {requirement.businessRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm">{rule.description}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleEditElement("rule", requirement.id, rule.id)
                        }
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Elements */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Data Elements & Validations
                  </h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAddElement("data", requirement.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {requirement.dataElements.map((element) => (
                    <div
                      key={element.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{element.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {element.type}
                        </Badge>
                        {element.required && (
                          <Badge variant="secondary" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleEditElement("data", requirement.id, element.id)
                        }
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Information */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    Missing Information
                  </h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAddElement("missing", requirement.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {requirement.missingInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-yellow-50 rounded"
                    >
                      <span className="text-sm text-yellow-800">{info}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          handleEditElement("missing", requirement.id, String(index))
                        }
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div className="flex-1 flex flex-col h-full">
        <div className="px-6 py-6 bg-white border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Requirements Captured
              </h1>
              <p className="text-gray-500">
                Review and edit captured requirements from{" "}
                {selectedFile ? selectedFile.name : "the uploaded document"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddNewRequirement}>
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
              <Button 
                onClick={handleRegenerateSelected}
                disabled={selectedRequirements.length === 0}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate Selected
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-6 py-4">
          <div className="space-y-4">
            {requirements.map((requirement) => renderRequirement(requirement))}
          </div>
        </div>
      </div>

      <div className="w-1/3 border-l flex flex-col bg-gray-50">
        <div className="p-4 border-b bg-white">
          <h2 className="text-lg font-semibold">Source Document</h2>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <div
            id="source-content"
            className="prose prose-sm max-w-none whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: sourceContent }}
          />
        </div>
      </div>

      {renderElementDialog()}
    </div>
  );
};
