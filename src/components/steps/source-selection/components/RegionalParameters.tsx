
import { GlobalParameters, REGIONS, COUNTRIES } from "../types";
import { ParameterSelect } from "./ParameterSelect";

interface RegionalParametersProps {
  parameters: GlobalParameters;
  availableCountries: {value: string; label: string}[];
  onParametersChange: (params: GlobalParameters) => void;
}

export const RegionalParameters = ({
  parameters,
  availableCountries,
  onParametersChange
}: RegionalParametersProps) => {
  return (
    <>
      <ParameterSelect
        id="region"
        label="Region"
        value={parameters.region || ""}
        options={REGIONS}
        onChange={(value) => onParametersChange({ 
          ...parameters, 
          region: value, 
          country: "", 
          customer: "" 
        })}
      />
      
      {(parameters.requirementType === "K3" || parameters.requirementType === "K4") && (
        <ParameterSelect
          id="country"
          label="Country"
          value={parameters.country || ""}
          options={availableCountries}
          onChange={(value) => onParametersChange({ ...parameters, country: value, customer: "" })}
          disabled={!parameters.region || availableCountries.length === 0}
        />
      )}
    </>
  );
};
