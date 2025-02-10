
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity,
  Edit,
  RefreshCw,
  History,
  Shield,
  List
} from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { RequirementFlows } from "./RequirementFlows";
import { RequirementBusinessRules } from "./RequirementBusinessRules";
import { RequirementValidations } from "./RequirementValidations";
import { RequirementMissingInfo } from "./RequirementMissingInfo";
import { type Requirement } from "./types";

interface RequirementContentProps {
  requirement: Requirement;
  editingRequirement: Requirement | null;
  onEditRequirement: (requirement: Requirement, e: React.MouseEvent) => void;
  onSaveRequirement: (e: React.MouseEvent) => void;
  setEditingRequirement: (requirement: Requirement | null) => void;
  handleRerunForRequirement: (requirementId: string) => void;
  setIsHistoryOpen: (isOpen: boolean) => void;
}

export const RequirementContent = ({
  requirement,
  editingRequirement,
  onEditRequirement,
  onSaveRequirement,
  setEditingRequirement,
  handleRerunForRequirement,
  setIsHistoryOpen,
}: RequirementContentProps) => {
  return (
    <CardContent>
      <Accordion type="single" collapsible>
        <AccordionItem value="flows" onClick={(e) => e.stopPropagation()}>
          <AccordionTrigger className="text-sm font-medium">
            <Activity className="h-4 w-4 mr-2" />
            Functional Flows
          </AccordionTrigger>
          <AccordionContent>
            <RequirementFlows
              requirement={requirement}
              editingRequirement={editingRequirement}
              setEditingRequirement={setEditingRequirement}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rules" onClick={(e) => e.stopPropagation()}>
          <AccordionTrigger className="text-sm font-medium">
            <Shield className="h-4 w-4 mr-2" />
            Business Rules
          </AccordionTrigger>
          <AccordionContent>
            <RequirementBusinessRules
              requirement={requirement}
              editingRequirement={editingRequirement}
              setEditingRequirement={setEditingRequirement}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="validations" onClick={(e) => e.stopPropagation()}>
          <AccordionTrigger className="text-sm font-medium">
            <List className="h-4 w-4 mr-2" />
            Validations & Data Elements
          </AccordionTrigger>
          <AccordionContent>
            <RequirementValidations
              requirement={requirement}
              editingRequirement={editingRequirement}
              setEditingRequirement={setEditingRequirement}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <RequirementMissingInfo requirement={requirement} />

      <div className="mt-4 flex justify-end gap-2">
        {editingRequirement?.id === requirement.id ? (
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
                onSaveRequirement(e);
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
              onClick={(e) => onEditRequirement(requirement, e)}
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
                handleRerunForRequirement(requirement.id);
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
  );
};
