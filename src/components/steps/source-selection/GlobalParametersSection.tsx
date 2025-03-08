
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GlobalParameters, 
  PRODUCT_OPTIONS, 
  COUNTRIES, 
  CUSTOMERS 
} from "./types";
import { BasicParameters } from "./components/BasicParameters";
import { RegionalParameters } from "./components/RegionalParameters";
import { CustomerParameters } from "./components/CustomerParameters";

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

  // Update available sub-products when product changes
  useEffect(() => {
    if (parameters.product) {
      const productOption = PRODUCT_OPTIONS.find(p => p.value === parameters.product);
      setAvailableSubProducts(productOption?.subProducts || []);
      
      // Clear sub-product if changing product
      if (!productOption?.subProducts.some(sp => sp.value === parameters.subProduct)) {
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
    <Card className="mb-8 shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Global Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <BasicParameters 
            parameters={parameters}
            availableSubProducts={availableSubProducts}
            onParametersChange={onParametersChange}
          />
          
          {parameters.requirementType === "K2" && (
            <RegionalParameters
              parameters={parameters}
              availableCountries={availableCountries}
              onParametersChange={onParametersChange}
            />
          )}
          
          {parameters.requirementType === "K3" && (
            <RegionalParameters
              parameters={parameters}
              availableCountries={availableCountries}
              onParametersChange={onParametersChange}
            />
          )}
          
          {parameters.requirementType === "K4" && (
            <>
              <RegionalParameters
                parameters={parameters}
                availableCountries={availableCountries}
                onParametersChange={onParametersChange}
              />
              
              <CustomerParameters
                parameters={parameters}
                availableCustomers={availableCustomers}
                onParametersChange={onParametersChange}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
