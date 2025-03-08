
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GlobalParameters, 
  PRODUCT_OPTIONS, 
  COUNTRIES, 
  CUSTOMERS,
  DOMAINS,
  REGIONS
} from "./types";
import { ParameterSelect } from "./components/ParameterSelect";

interface GlobalParametersSectionProps {
  parameters: GlobalParameters;
  onParametersChange: (params: GlobalParameters) => void;
}

export const GlobalParametersSection = ({
  parameters,
  onParametersChange
}: GlobalParametersSectionProps) => {
  const [availableSubProducts, setAvailableSubProducts] = useState<{value: string; label: string}[]>([]);
  const [availableCountries, setAvailableCountries] = useState<{value: string; label: string}[]>([]);
  const [availableCustomers, setAvailableCustomers] = useState<{value: string; label: string}[]>([]);

  // Set default values if not already set
  useEffect(() => {
    let updatedParams = { ...parameters };
    let hasChanges = false;

    if (!parameters.product) {
      updatedParams.product = "DTB";
      hasChanges = true;
    }

    if (!parameters.domain) {
      updatedParams.domain = "PAYMENTS";
      hasChanges = true;
    }

    if (hasChanges) {
      onParametersChange(updatedParams);
    }
  }, []);

  // Update available sub-products when product changes
  useEffect(() => {
    if (parameters.product) {
      const productOption = PRODUCT_OPTIONS.find(p => p.value === parameters.product);
      setAvailableSubProducts(productOption?.subProducts || []);
      
      // Set default sub-product if product is DTB and no sub-product is selected
      if (parameters.product === "DTB" && !parameters.subProduct) {
        onParametersChange({
          ...parameters,
          subProduct: "CBX"
        });
      }
      // Clear sub-product if changing product
      else if (!productOption?.subProducts.some(sp => sp.value === parameters.subProduct)) {
        onParametersChange({
          ...parameters,
          subProduct: ""
        });
      }
    } else {
      setAvailableSubProducts([]);
    }
  }, [parameters.product]);

  // Update available countries when region changes
  useEffect(() => {
    if (parameters.region) {
      const countriesForRegion = COUNTRIES[parameters.region as keyof typeof COUNTRIES] || [];
      setAvailableCountries(countriesForRegion);
      
      // Clear country if changing region
      if (!countriesForRegion.some(c => c.value === parameters.country)) {
        onParametersChange({
          ...parameters,
          country: ""
        });
      }
    } else {
      setAvailableCountries([]);
    }
  }, [parameters.region]);

  // Update available customers when country changes
  useEffect(() => {
    if (parameters.country) {
      const customersForCountry = CUSTOMERS[parameters.country as keyof typeof CUSTOMERS] || [];
      setAvailableCustomers(customersForCountry);
      
      // Clear customer if changing country
      if (!customersForCountry.some(c => c.value === parameters.customer)) {
        onParametersChange({
          ...parameters,
          customer: ""
        });
      }
    } else {
      setAvailableCustomers([]);
    }
  }, [parameters.country]);

  return (
    <Card className="mb-6 shadow-sm border-gray-200 w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">User Associations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          {/* Product Selection */}
          <ParameterSelect
            id="product"
            label="Product"
            value={parameters.product}
            options={PRODUCT_OPTIONS}
            onChange={(value) => onParametersChange({ ...parameters, product: value, subProduct: "" })}
            compact={true}
          />
          
          {/* Sub-Product Selection */}
          <ParameterSelect
            id="subProduct"
            label="Sub-Product"
            value={parameters.subProduct}
            options={availableSubProducts}
            onChange={(value) => onParametersChange({ ...parameters, subProduct: value })}
            disabled={!parameters.product || availableSubProducts.length === 0}
            compact={true}
          />
          
          {/* Domain Selection */}
          <ParameterSelect
            id="domain"
            label="Domain"
            value={parameters.domain}
            options={DOMAINS}
            onChange={(value) => onParametersChange({ ...parameters, domain: value })}
            compact={true}
          />
          
          {/* Region Selection (for K2, K3, K4) */}
          {parameters.requirementType && parameters.requirementType !== "K1" && (
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
              compact={true}
            />
          )}
          
          {/* Country Selection (for K3, K4) */}
          {parameters.requirementType && (parameters.requirementType === "K3" || parameters.requirementType === "K4") && (
            <ParameterSelect
              id="country"
              label="Country"
              value={parameters.country || ""}
              options={availableCountries}
              onChange={(value) => onParametersChange({ ...parameters, country: value, customer: "" })}
              disabled={!parameters.region || availableCountries.length === 0}
              compact={true}
            />
          )}
          
          {/* Customer Selection (for K4) */}
          {parameters.requirementType && parameters.requirementType === "K4" && (
            <ParameterSelect
              id="customer"
              label="Customer"
              value={parameters.customer || ""}
              options={availableCustomers}
              onChange={(value) => onParametersChange({ ...parameters, customer: value })}
              disabled={!parameters.country || availableCustomers.length === 0}
              compact={true}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
