
import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Activity, Shield, List, Plus, Pencil, Save, X, Check } from "lucide-react";
import { type Requirement, type Flow, type BusinessRule, type DataElement } from "./types";
import { toast } from "sonner";

interface RequirementContentProps {
  requirement: Requirement;
}

export const RequirementContent = ({ requirement }: RequirementContentProps) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [isFlowDialogOpen, setIsFlowDialogOpen] = useState(false);
  const [isBusinessRuleDialogOpen, setIsBusinessRuleDialogOpen] = useState(false);
  const [isDataElementDialogOpen, setIsDataElementDialogOpen] = useState(false);
  const [newItemValue, setNewItemValue] = useState("");
  const [newDataElement, setNewDataElement] = useState<{ name: string; type: string; required: boolean }>({
    name: "",
    type: "string",
    required: false
  });

  const handleAddFlow = () => {
    if (!newItemValue.trim()) return;
    const newFlow: Flow = {
      id: `f${requirement.flows.length + 1}`,
      description: newItemValue
    };
    requirement.flows.push(newFlow);
    setNewItemValue("");
    setIsFlowDialogOpen(false);
    toast.success("New flow added");
  };

  const handleAddBusinessRule = () => {
    if (!newItemValue.trim()) return;
    const newRule: BusinessRule = {
      id: `br${requirement.businessRules.length + 1}`,
      description: newItemValue
    };
    requirement.businessRules.push(newRule);
    setNewItemValue("");
    setIsBusinessRuleDialogOpen(false);
    toast.success("New business rule added");
  };

  const handleAddDataElement = () => {
    if (!newDataElement.name.trim()) return;
    const newElement: DataElement = {
      id: `de${requirement.dataElements.length + 1}`,
      ...newDataElement
    };
    requirement.dataElements.push(newElement);
    setNewDataElement({ name: "", type: "string", required: false });
    setIsDataElementDialogOpen(false);
    toast.success("New data element added");
  };

  const handleStartEdit = (id: string, value: string) => {
    setEditingItemId(id);
    setEditingValue(value);
  };

  const handleSaveEdit = (type: 'flow' | 'rule' | 'element') => {
    if (!editingItemId) return;

    switch (type) {
      case 'flow':
        requirement.flows = requirement.flows.map(flow =>
          flow.id === editingItemId ? { ...flow, description: editingValue } : flow
        );
        break;
      case 'rule':
        requirement.businessRules = requirement.businessRules.map(rule =>
          rule.id === editingItemId ? { ...rule, description: editingValue } : rule
        );
        break;
      case 'element':
        requirement.dataElements = requirement.dataElements.map(element =>
          element.id === editingItemId ? { ...element, name: editingValue } : element
        );
        break;
    }

    setEditingItemId(null);
    setEditingValue("");
    toast.success("Changes saved");
  };

  return (
    <CardContent>
      <div className="space-y-6">
        {/* Functional Flows */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Functional Flows</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsFlowDialogOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {requirement.flows.map((flow) => (
              <div key={flow.id} className="text-sm flex items-center gap-2 group">
                {editingItemId === flow.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="sm" variant="ghost" onClick={() => handleSaveEdit('flow')}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingItemId(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{flow.description}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100"
                      onClick={() => handleStartEdit(flow.id, flow.description)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            ))}
            {requirement.missingInfo
              .filter(info => info.category === "flows")
              .map(info => (
                <div key={info.id} className="flex items-center gap-2 p-2 border border-yellow-200 bg-yellow-50 rounded-md">
                  <div className="flex-1">
                    <span className="text-sm text-yellow-700">{info.description}</span>
                    <span className="text-xs text-yellow-600 ml-2">(Recommended)</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-yellow-100"
                    onClick={() => {
                      const newFlow: Flow = {
                        id: `f${requirement.flows.length + 1}`,
                        description: info.description
                      };
                      requirement.flows.push(newFlow);
                      requirement.missingInfo = requirement.missingInfo.filter(mi => mi.id !== info.id);
                      toast.success("Flow added from recommendation");
                    }}
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                </div>
              ))}
          </div>
        </div>

        {/* Business Rules */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <h3 className="text-sm font-semibold">Business Rules</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsBusinessRuleDialogOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {requirement.businessRules.map((rule) => (
              <div key={rule.id} className="text-sm flex items-center gap-2 group">
                {editingItemId === rule.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="sm" variant="ghost" onClick={() => handleSaveEdit('rule')}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingItemId(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="flex-1">{rule.description}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100"
                      onClick={() => handleStartEdit(rule.id, rule.description)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            ))}
            {requirement.missingInfo
              .filter(info => info.category === "business_rules")
              .map(info => (
                <div key={info.id} className="flex items-center gap-2 p-2 border border-yellow-200 bg-yellow-50 rounded-md">
                  <div className="flex-1">
                    <span className="text-sm text-yellow-700">{info.description}</span>
                    <span className="text-xs text-yellow-600 ml-2">(Recommended)</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-yellow-100"
                    onClick={() => {
                      const newRule: BusinessRule = {
                        id: `br${requirement.businessRules.length + 1}`,
                        description: info.description
                      };
                      requirement.businessRules.push(newRule);
                      requirement.missingInfo = requirement.missingInfo.filter(mi => mi.id !== info.id);
                      toast.success("Business rule added from recommendation");
                    }}
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                </div>
              ))}
          </div>
        </div>

        {/* Data Elements */}
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
              <div key={element.id} className="text-sm flex items-center gap-2 group">
                {editingItemId === element.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="sm" variant="ghost" onClick={() => handleSaveEdit('element')}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingItemId(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="font-medium">{element.name}</span>
                    <span className="text-gray-500">({element.type})</span>
                    {element.required && (
                      <span className="text-xs text-red-500">Required</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100"
                      onClick={() => handleStartEdit(element.id, element.name)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            ))}
            {requirement.missingInfo
              .filter(info => info.category === "data_elements")
              .map(info => (
                <div key={info.id} className="flex items-center gap-2 p-2 border border-yellow-200 bg-yellow-50 rounded-md">
                  <div className="flex-1">
                    <span className="text-sm text-yellow-700">{info.description}</span>
                    <span className="text-xs text-yellow-600 ml-2">(Recommended)</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-yellow-100"
                    onClick={() => {
                      setNewDataElement({
                        name: info.description,
                        type: "string",
                        required: false
                      });
                      setIsDataElementDialogOpen(true);
                      requirement.missingInfo = requirement.missingInfo.filter(mi => mi.id !== info.id);
                      toast.success("Data element suggestion accepted");
                    }}
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                </div>
              ))}
          </div>
        </div>

        {/* Missing Information */}
        {requirement.missingInfo.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-md">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Missing Information</h4>
                <div className="mt-2 space-y-4">
                  {["flows", "business_rules", "data_elements"].map(category => {
                    const categoryItems = requirement.missingInfo.filter(
                      info => info.category === category
                    );
                    if (categoryItems.length === 0) return null;

                    return (
                      <div key={category}>
                        <h5 className="text-sm font-medium text-yellow-700 mb-2">
                          {category.split("_").map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(" ")}
                        </h5>
                        <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5">
                          {categoryItems.map((info) => (
                            <li key={info.id}>{info.description}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Flow Dialog */}
        <Dialog open={isFlowDialogOpen} onOpenChange={setIsFlowDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Flow</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="Enter flow description"
                value={newItemValue}
                onChange={(e) => setNewItemValue(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFlowDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddFlow}>Add Flow</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Business Rule Dialog */}
        <Dialog open={isBusinessRuleDialogOpen} onOpenChange={setIsBusinessRuleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Business Rule</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="Enter business rule description"
                value={newItemValue}
                onChange={(e) => setNewItemValue(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBusinessRuleDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddBusinessRule}>Add Rule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Data Element Dialog */}
        <Dialog open={isDataElementDialogOpen} onOpenChange={setIsDataElementDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Data Element</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <Input
                placeholder="Element name"
                value={newDataElement.name}
                onChange={(e) => setNewDataElement(prev => ({ ...prev, name: e.target.value }))}
              />
              <select
                className="w-full border rounded-md p-2"
                value={newDataElement.type}
                onChange={(e) => setNewDataElement(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="date">Date</option>
              </select>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newDataElement.required}
                  onChange={(e) => setNewDataElement(prev => ({ ...prev, required: e.target.checked }))}
                />
                <label>Required</label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDataElementDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddDataElement}>Add Element</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </CardContent>
  );
};
