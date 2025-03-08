
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  GlobalParameters, 
  PRODUCT_OPTIONS, 
  DOMAINS, 
  REQUIREMENT_TYPES, 
  REGIONS, 
  COUNTRIES, 
  CUSTOMERS 
} from "./types";

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

  // Handle requirement type change to reset dependent fields
  const handleRequirementTypeChange = (value: string) => {
    const newParams: GlobalParameters = {
      ...parameters,
      requirementType: value,
      region: "",
      country: "",
      customer: ""
    };
    onParametersChange(newParams);
  };

  return (
    <Card className="mb-8 shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Global Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Select
              value={parameters.product}
              onValueChange={(value) => onParametersChange({ ...parameters, product: value, subProduct: "" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_OPTIONS.map(product => (
                  <SelectItem key={product.value} value={product.value}>
                    {product.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subProduct">Sub-Product</Label>
            <Select
              value={parameters.subProduct}
              onValueChange={(value) => onParametersChange({ ...parameters, subProduct: value })}
              disabled={!parameters.product || availableSubProducts.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sub-product" />
              </SelectTrigger>
              <SelectContent>
                {availableSubProducts.map(subProduct => (
                  <SelectItem key={subProduct.value} value={subProduct.value}>
                    {subProduct.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <Select
              value={parameters.domain}
              onValueChange={(value) => onParametersChange({ ...parameters, domain: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent>
                {DOMAINS.map(domain => (
                  <SelectItem key={domain.value} value={domain.value}>
                    {domain.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirementType">Requirement Type</Label>
            <Select
              value={parameters.requirementType}
              onValueChange={handleRequirementTypeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select requirement type" />
              </SelectTrigger>
              <SelectContent>
                {REQUIREMENT_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {parameters.requirementType === "K2" && (
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select
                value={parameters.region}
                onValueChange={(value) => onParametersChange({ ...parameters, region: value, country: "", customer: "" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map(region => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {parameters.requirementType === "K3" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select
                  value={parameters.region}
                  onValueChange={(value) => onParametersChange({ ...parameters, region: value, country: "", customer: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map(region => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={parameters.country}
                  onValueChange={(value) => onParametersChange({ ...parameters, country: value, customer: "" })}
                  disabled={!parameters.region || availableCountries.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCountries.map(country => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          
          {parameters.requirementType === "K4" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select
                  value={parameters.region}
                  onValueChange={(value) => onParametersChange({ ...parameters, region: value, country: "", customer: "" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGIONS.map(region => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={parameters.country}
                  onValueChange={(value) => onParametersChange({ ...parameters, country: value, customer: "" })}
                  disabled={!parameters.region || availableCountries.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCountries.map(country => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <Select
                  value={parameters.customer}
                  onValueChange={(value) => onParametersChange({ ...parameters, customer: value })}
                  disabled={!parameters.country || availableCustomers.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCustomers.map(customer => (
                      <SelectItem key={customer.value} value={customer.value}>
                        {customer.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
