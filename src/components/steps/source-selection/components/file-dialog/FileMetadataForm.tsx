
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REQUIREMENT_TYPES } from "../../types";

interface FileMetadataFormProps {
  fileName: string;
  setFileName: (name: string) => void;
  fileCategory: "main" | "supporting";
  setFileCategory: (category: "main" | "supporting") => void;
  fileBreakBy: "userJourney" | "userStories" | "section" | "paragraph" | "page";
  setFileBreakBy: (breakBy: "userJourney" | "userStories" | "section" | "paragraph" | "page") => void;
  fileContext: string;
  setFileContext: (context: string) => void;
  requirementType: string;
  setRequirementType: (type: string) => void;
  bundleHasMainFile: boolean;
  region?: string;
  setRegion?: (region: string) => void;
  country?: string;
  setCountry?: (country: string) => void;
  customer?: string;
  setCustomer?: (customer: string) => void;
  regions?: { value: string; label: string }[];
  countries?: { value: string; label: string }[];
  customers?: { value: string; label: string }[];
  showRegion?: boolean;
  showCountry?: boolean;
  showCustomer?: boolean;
}

export const FileMetadataForm = ({
  fileName,
  setFileName,
  fileCategory,
  setFileCategory,
  fileBreakBy,
  setFileBreakBy,
  fileContext,
  setFileContext,
  requirementType,
  setRequirementType,
  bundleHasMainFile,
  region = "",
  setRegion = () => {},
  country = "",
  setCountry = () => {},
  customer = "",
  setCustomer = () => {},
  regions = [],
  countries = [],
  customers = [],
  showRegion = false,
  showCountry = false,
  showCustomer = false
}: FileMetadataFormProps) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-sm">Document Name</Label>
          <Input 
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter document name"
            className="h-9"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-sm">File Category</Label>
          <Select 
            value={fileCategory}
            onValueChange={(value: "main" | "supporting") => setFileCategory(value)}
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="main" disabled={bundleHasMainFile}>Main Requirement Document</SelectItem>
              <SelectItem value="supporting">Supporting Requirement Document</SelectItem>
            </SelectContent>
          </Select>
          {bundleHasMainFile && fileCategory === "supporting" && (
            <p className="text-xs text-amber-600">This bundle already has a main document</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-sm">Requirement Type</Label>
        <Select 
          value={requirementType}
          onValueChange={(value) => setRequirementType(value)}
        >
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {REQUIREMENT_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showRegion && regions && regions.length > 0 && (
        <div className="space-y-1">
          <Label className="text-sm">Region</Label>
          <Select 
            value={region}
            onValueChange={setRegion}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {regions.map((regionOption) => (
                <SelectItem key={regionOption.value} value={regionOption.value}>
                  {regionOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showCountry && countries && countries.length > 0 && (
        <div className="space-y-1">
          <Label className="text-sm">Country</Label>
          <Select 
            value={country}
            onValueChange={setCountry}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {countries.map((countryOption) => (
                <SelectItem key={countryOption.value} value={countryOption.value}>
                  {countryOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showCustomer && customers && customers.length > 0 && (
        <div className="space-y-1">
          <Label className="text-sm">Customer</Label>
          <Select 
            value={customer}
            onValueChange={setCustomer}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {customers.map((customerOption) => (
                <SelectItem key={customerOption.value} value={customerOption.value}>
                  {customerOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-1">
        <Label className="text-sm">Break Requirements By</Label>
        <Select 
          value={fileBreakBy}
          onValueChange={(value: "userJourney" | "userStories" | "section" | "paragraph" | "page") => setFileBreakBy(value)}
        >
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="userJourney">User Journey</SelectItem>
            <SelectItem value="userStories">User Stories</SelectItem>
            <SelectItem value="section">Section</SelectItem>
            <SelectItem value="paragraph">Paragraph</SelectItem>
            <SelectItem value="page">Page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-sm">Additional Context for SPA Agent</Label>
        <Textarea 
          value={fileContext}
          onChange={(e) => setFileContext(e.target.value)}
          placeholder="Provide any additional context that will help the SPA agent process this document..."
          className="h-16 min-h-16 resize-none"
        />
      </div>
    </div>
  );
};
