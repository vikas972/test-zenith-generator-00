
import { useState } from "react";
import { GlobalParameters } from "../types";

export const useGlobalParameters = () => {
  const [globalParameters, setGlobalParameters] = useState<GlobalParameters>({
    product: "DTB",
    subProduct: "CBX",
    domain: "PAYMENTS",
    requirementType: "",
    region: "",
    country: "",
    customer: ""
  });

  const handleGlobalParametersChange = (params: GlobalParameters) => {
    setGlobalParameters(params);
  };

  return {
    globalParameters,
    handleGlobalParametersChange
  };
};
