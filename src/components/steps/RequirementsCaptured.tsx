
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
    },
  ]);

  const [editingRequirement, setEditingRequirement] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<{
    type: "flow" | "rule" | "data" | "missing";
    requirementId: string;
    elementId?: string;
  } | null>(null);

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

    return (
      <Card key={requirement.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
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
                />
              ) : (
                <CardTitle className="text-lg">{requirement.functionalArea}</CardTitle>
              )}
            </div>
            <div className="flex items-center gap-2">
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
                    onClick={() => setEditingRequirement(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingRequirement(null);
                      toast.success("Changes saved successfully");
                    }}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingRequirement(requirement.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
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
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Requirements Captured
          </h1>
          <p className="text-gray-500 mt-1">
            Review and edit captured requirements from{" "}
            {selectedFile ? selectedFile.name : "the uploaded document"}
          </p>
        </div>
        <Button onClick={() => toast.success("Requirements regenerated")}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="space-y-6">
          {requirements.map((requirement) => renderRequirement(requirement))}
        </div>
      </ScrollArea>

      {renderElementDialog()}
    </div>
  );
};
