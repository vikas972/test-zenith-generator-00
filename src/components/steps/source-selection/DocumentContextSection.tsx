
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DocumentContext, UploadedFile } from "./types";

interface DocumentContextSectionProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  selectedFile: string | null;
  uploadedFiles: UploadedFile[];
  documentContext: DocumentContext;
  onContextUpdate: (field: keyof DocumentContext, value: any) => void;
  onReset: () => void;
  onImport: () => void;
}

export const DocumentContextSection = ({
  isExpanded,
  onToggleExpand,
  selectedFile,
  uploadedFiles,
  documentContext,
  onContextUpdate,
  onReset,
  onImport,
}: DocumentContextSectionProps) => {
  return (
    <Card className="mb-8 shadow-sm border-gray-200">
      <CardHeader 
        className={`flex flex-row items-center justify-between space-y-0 pb-2 ${!isExpanded ? 'border-b-0' : ''}`}
        onClick={onToggleExpand}
        style={{ cursor: 'pointer' }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold">Document Context</CardTitle>
            {selectedFile && (
              <span className="text-sm text-gray-500">
                Selected: {uploadedFiles.find(f => f.id === selectedFile)?.name}
              </span>
            )}
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-6 pt-6 border-t border-gray-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select
                onValueChange={(value) => onContextUpdate("documentType", value)}
                value={documentContext.documentType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brd">Business Requirements Document</SelectItem>
                  <SelectItem value="srs">Software Requirements Specification</SelectItem>
                  <SelectItem value="userStories">User Stories</SelectItem>
                  <SelectItem value="technicalSpec">Technical Specification</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentFormat">Document Format</Label>
              <Select
                onValueChange={(value) => onContextUpdate("documentFormat", value)}
                value={documentContext.documentFormat}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ieee830">IEEE 830</SelectItem>
                  <SelectItem value="agile">Agile User Stories</SelectItem>
                  <SelectItem value="gherkin">Gherkin</SelectItem>
                  <SelectItem value="custom">Custom Format</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessDomain">Business Domain</Label>
              <Select
                onValueChange={(value) => onContextUpdate("businessDomain", value)}
                value={documentContext.businessDomain}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="payments">Payments</SelectItem>
                  <SelectItem value="tradeFinance">Trade Finance</SelectItem>
                  <SelectItem value="supplyChain">Supply Chain Management</SelectItem>
                  <SelectItem value="cashManagement">Cash Management</SelectItem>
                  <SelectItem value="forex">Foreign Exchange</SelectItem>
                  <SelectItem value="lending">Corporate Lending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="agentContext">Additional Context for SPA Agent</Label>
              <Textarea 
                placeholder="Provide any additional context that will help the SPA agent generate more accurate parsed output..."
                value={documentContext.agentContext}
                onChange={(e) => onContextUpdate("agentContext", e.target.value)}
                className="h-24"
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-semibold mb-4">Output Preferences</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="requirementFormat">Requirement ID Format</Label>
                <Input 
                  placeholder="e.g., REQ-XXX"
                  value={documentContext.outputPreferences.requirementFormat}
                  onChange={(e) => onContextUpdate("outputPreferences", {
                    ...documentContext.outputPreferences,
                    requirementFormat: e.target.value
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="validationGranularity">Validation Detail Level</Label>
                <Select
                  onValueChange={(value) => onContextUpdate("outputPreferences", {
                    ...documentContext.outputPreferences,
                    validationGranularity: value
                  })}
                  value={documentContext.outputPreferences.validationGranularity}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="namingConvention">Naming Convention</Label>
                <Select
                  onValueChange={(value) => onContextUpdate("outputPreferences", {
                    ...documentContext.outputPreferences,
                    namingConvention: value
                  })}
                  value={documentContext.outputPreferences.namingConvention}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="camelCase">camelCase</SelectItem>
                    <SelectItem value="PascalCase">PascalCase</SelectItem>
                    <SelectItem value="snake_case">snake_case</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={onReset}
              disabled={!selectedFile}
            >
              Reset to Defaults
            </Button>
            <Button
              onClick={onImport}
              disabled={!selectedFile}
            >
              Import File
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
