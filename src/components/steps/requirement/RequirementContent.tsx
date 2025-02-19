
import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { List, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Requirement } from "./types";
import { toast } from "sonner";
import { FlowsSection } from "./sections/FlowsSection";
import { BusinessRulesSection } from "./sections/BusinessRulesSection";

interface RequirementContentProps {
  requirement: Requirement;
}

export const RequirementContent = ({ requirement }: RequirementContentProps) => {
  const [isFlowDialogOpen, setIsFlowDialogOpen] = useState(false);
  const [isBusinessRuleDialogOpen, setIsBusinessRuleDialogOpen] = useState(false);
  const [isDataElementDialogOpen, setIsDataElementDialogOpen] = useState(false);
  const [newFlow, setNewFlow] = useState({ description: "", type: "primary" });
  const [newBusinessRule, setNewBusinessRule] = useState({ description: "", category: "general" });
  const [newDataElement, setNewDataElement] = useState({ name: "", type: "", required: false });

  const handleAddFlow = () => {
    // Add flow logic here
    toast.success("Flow added successfully");
    setIsFlowDialogOpen(false);
  };

  const handleAddBusinessRule = () => {
    // Add business rule logic here
    toast.success("Business rule added successfully");
    setIsBusinessRuleDialogOpen(false);
  };

  const handleAddDataElement = () => {
    // Add data element logic here
    toast.success("Data element added successfully");
    setIsDataElementDialogOpen(false);
  };

  return (
    <CardContent>
      <div className="space-y-6">
        <FlowsSection 
          flows={requirement.flows} 
          onAddClick={() => setIsFlowDialogOpen(true)} 
        />

        <Dialog open={isFlowDialogOpen} onOpenChange={setIsFlowDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Flow</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="flowDescription">Description</Label>
                <Input
                  id="flowDescription"
                  value={newFlow.description}
                  onChange={(e) => setNewFlow({ ...newFlow, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="flowType">Type</Label>
                <Select
                  value={newFlow.type}
                  onValueChange={(value) => setNewFlow({ ...newFlow, type: value as "primary" | "alternative" | "exception" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="alternative">Alternative</SelectItem>
                    <SelectItem value="exception">Exception</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddFlow}>Add Flow</Button>
            </div>
          </DialogContent>
        </Dialog>

        <BusinessRulesSection 
          rules={requirement.businessRules} 
          onAddClick={() => setIsBusinessRuleDialogOpen(true)} 
        />

        <Dialog open={isBusinessRuleDialogOpen} onOpenChange={setIsBusinessRuleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Business Rule</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ruleDescription">Description</Label>
                <Input
                  id="ruleDescription"
                  value={newBusinessRule.description}
                  onChange={(e) => setNewBusinessRule({ ...newBusinessRule, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ruleCategory">Category</Label>
                <Select
                  value={newBusinessRule.category}
                  onValueChange={(value) => setNewBusinessRule({ ...newBusinessRule, category: value as "authentication" | "security" | "system" | "general" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="authentication">Authentication</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddBusinessRule}>Add Business Rule</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Data Elements Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <List className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Data Elements</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsDataElementDialogOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {requirement.dataElements.map((element) => (
              <div key={element.id} className="p-2 border rounded">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{element.name}</span>
                    <span className="text-gray-500">({element.type})</span>
                    {element.required && (
                      <span className="text-xs text-red-500">Required</span>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      toast({
                        title: "Edit Data Element",
                        description: `Editing element ${element.id}`
                      });
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                {element.format && (
                  <div className="text-sm text-gray-600 ml-4">
                    Format: {element.format}
                  </div>
                )}
                {element.validationRules && element.validationRules.length > 0 && (
                  <div className="text-sm text-gray-600 ml-4">
                    Validation Rules:
                    <ul className="list-disc ml-4">
                      {element.validationRules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Dialog open={isDataElementDialogOpen} onOpenChange={setIsDataElementDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Data Element</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="elementName">Name</Label>
                <Input
                  id="elementName"
                  value={newDataElement.name}
                  onChange={(e) => setNewDataElement({ ...newDataElement, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="elementType">Type</Label>
                <Input
                  id="elementType"
                  value={newDataElement.type}
                  onChange={(e) => setNewDataElement({ ...newDataElement, type: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="elementRequired"
                  checked={newDataElement.required}
                  onChange={(e) => setNewDataElement({ ...newDataElement, required: e.target.checked })}
                />
                <Label htmlFor="elementRequired">Required</Label>
              </div>
              <Button onClick={handleAddDataElement}>Add Data Element</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </CardContent>
  );
};
