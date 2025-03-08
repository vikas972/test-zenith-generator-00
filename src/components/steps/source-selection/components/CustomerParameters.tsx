
import { GlobalParameters } from "../types";
import { ParameterSelect } from "./ParameterSelect";

interface CustomerParametersProps {
  parameters: GlobalParameters;
  availableCustomers: {value: string; label: string}[];
  onParametersChange: (params: GlobalParameters) => void;
}

export const CustomerParameters = ({
  parameters,
  availableCustomers,
  onParametersChange
}: CustomerParametersProps) => {
  return (
    <ParameterSelect
      id="customer"
      label="Customer"
      value={parameters.customer || ""}
      options={availableCustomers}
      onChange={(value) => onParametersChange({ ...parameters, customer: value })}
      disabled={!parameters.country || availableCustomers.length === 0}
    />
  );
};
