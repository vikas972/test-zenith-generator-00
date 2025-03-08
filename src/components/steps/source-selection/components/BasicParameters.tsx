
import { GlobalParameters, PRODUCT_OPTIONS, DOMAINS, REQUIREMENT_TYPES } from "../types";
import { ParameterSelect } from "./ParameterSelect";

interface BasicParametersProps {
  parameters: GlobalParameters;
  availableSubProducts: {value: string; label: string}[];
  onParametersChange: (params: GlobalParameters) => void;
}

export const BasicParameters = ({
  parameters,
  availableSubProducts,
  onParametersChange
}: BasicParametersProps) => {
  return (
    <>
      <ParameterSelect
        id="product"
        label="Product"
        value={parameters.product}
        options={PRODUCT_OPTIONS}
        onChange={(value) => onParametersChange({ ...parameters, product: value, subProduct: "" })}
      />
      
      <ParameterSelect
        id="subProduct"
        label="Sub-Product"
        value={parameters.subProduct}
        options={availableSubProducts}
        onChange={(value) => onParametersChange({ ...parameters, subProduct: value })}
        disabled={!parameters.product || availableSubProducts.length === 0}
      />
      
      <ParameterSelect
        id="domain"
        label="Domain"
        value={parameters.domain}
        options={DOMAINS}
        onChange={(value) => onParametersChange({ ...parameters, domain: value })}
      />
      
      <ParameterSelect
        id="requirementType"
        label="Requirement Type"
        value={parameters.requirementType}
        options={REQUIREMENT_TYPES}
        onChange={(value) => onParametersChange({
          ...parameters,
          requirementType: value,
          region: "",
          country: "",
          customer: ""
        })}
      />
    </>
  );
};
