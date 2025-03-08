
export interface SelectedFile {
  id: string;
  name: string;
  uploadTime: Date;
}

export interface UploadedFile {
  id: string;
  name: string;
  uploadTime: Date;
  status: "parsing" | "completed" | "failed";
}

export interface DocumentContext {
  documentType: string;
  documentFormat: string;
  businessDomain: string;
  agentContext: string;
  outputPreferences: {
    requirementFormat: string;
    validationGranularity: string;
    namingConvention: string;
  };
}

export interface SourceSelectionProps {
  onFileSelect: (file: SelectedFile | null) => void;
}

export interface RequirementFile {
  id: string;
  name: string;
  uploadTime: Date;
  category: "main" | "supporting";
  breakRequirementsBy: "userJourney" | "userStories" | "section" | "paragraph" | "page";
  context: string;
  status: "parsing" | "completed" | "failed";
  file?: File;
}

export interface RequirementBundle {
  id: string;
  name: string;
  createdAt: Date;
  source: string;
  files: RequirementFile[];
  totalFiles: number;
  status: "incomplete" | "parsing" | "completed" | "failed";
}

export interface GlobalParameters {
  product: string;
  subProduct: string;
  domain: string;
  requirementType: string;
  region?: string;
  country?: string;
  customer?: string;
}

export interface ProductOption {
  value: string;
  label: string;
  subProducts: { value: string; label: string }[];
}

export const PRODUCT_OPTIONS: ProductOption[] = [
  {
    value: "DTB",
    label: "DTB",
    subProducts: [
      { value: "CBX", label: "CBX" },
      { value: "CBX_BO", label: "CBX BO" },
      { value: "CS", label: "CS" },
      { value: "CIM", label: "CIM" },
      { value: "MOBILITY", label: "MOBILITY" },
      { value: "PAYMENTS", label: "PAYMENTS" },
      { value: "CNR", label: "CNR" },
      { value: "H2H", label: "H2H" }
    ]
  },
  {
    value: "PAYCASH_CX",
    label: "Paycash CX",
    subProducts: [
      { value: "CBOS_ES", label: "CBOS-ES" },
      { value: "CBOS_PG", label: "CBOS-PG" },
      { value: "CIM", label: "CIM" },
      { value: "CS", label: "CS" },
      { value: "CBX", label: "CBX" },
      { value: "DTB_CNR", label: "DTB-CNR" }
    ]
  },
  {
    value: "CTX",
    label: "CTX",
    subProducts: [
      { value: "CBX_LMS_OLD", label: "CBX-LMS (Old)" },
      { value: "CBX_LMS", label: "CBX-LMS" },
      { value: "LMS_OLD_SWEEPS", label: "LMS (Old)- Sweeps" },
      { value: "LMS_OLD_SWEEPS_NOTIONAL", label: "LMS (Old)- Sweeps Notional Pooling" },
      { value: "LMS_NEW_SWEEPS", label: "LMS (New)- Sweeps" },
      { value: "LMS_NEW_SWEEPS_NOTIONAL", label: "LMS (New) - Sweeps Notional Pooling" },
      { value: "CBX_VAM", label: "CBX-VAM" },
      { value: "VAM", label: "VAM" }
    ]
  },
  {
    value: "ICOLUMBUS",
    label: "iColumbus",
    subProducts: [
      { value: "ESCROW", label: "Escrow" },
      { value: "CBX_TRADE", label: "CBX-Trade" },
      { value: "TRADE_FINANCE", label: "Trade Finance" },
      { value: "SCF", label: "SCF" }
    ]
  }
];

export const DOMAINS = [
  { value: "PAYMENTS", label: "Payments" },
  { value: "TRADE_FINANCE", label: "Trade Finance" },
  { value: "CASH_MANAGEMENT", label: "Cash Management" },
  { value: "SUPPLY_CHAIN", label: "Supply Chain" },
  { value: "CORPORATE_LENDING", label: "Corporate Lending" },
  { value: "FOREX", label: "Foreign Exchange" }
];

export const REQUIREMENT_TYPES = [
  { value: "K1", label: "K1" },
  { value: "K2", label: "K2" },
  { value: "K3", label: "K3" },
  { value: "K4", label: "K4" }
];

export const REGIONS = [
  { value: "APAC", label: "APAC" },
  { value: "EUROPE", label: "Europe" },
  { value: "AMERICAS", label: "Americas" },
  { value: "AFRICA", label: "Africa" },
  { value: "MIDDLE_EAST", label: "Middle East" }
];

export const COUNTRIES = {
  "APAC": [
    { value: "IN", label: "India" },
    { value: "SG", label: "Singapore" },
    { value: "MY", label: "Malaysia" },
    { value: "HK", label: "Hong Kong" }
  ],
  "EUROPE": [
    { value: "GB", label: "United Kingdom" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "IT", label: "Italy" }
  ],
  "AMERICAS": [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "BR", label: "Brazil" },
    { value: "MX", label: "Mexico" }
  ],
  "AFRICA": [
    { value: "ZA", label: "South Africa" },
    { value: "NG", label: "Nigeria" },
    { value: "EG", label: "Egypt" },
    { value: "KE", label: "Kenya" }
  ],
  "MIDDLE_EAST": [
    { value: "AE", label: "UAE" },
    { value: "SA", label: "Saudi Arabia" },
    { value: "QA", label: "Qatar" },
    { value: "BH", label: "Bahrain" }
  ]
};

export const CUSTOMERS = {
  "IN": [{ value: "HDFC", label: "HDFC" }, { value: "ICICI", label: "ICICI" }],
  "AE": [{ value: "ENBD", label: "ENBD" }, { value: "DIB", label: "DIB" }],
  "US": [{ value: "CITI", label: "Citibank" }, { value: "JPMC", label: "JP Morgan Chase" }],
  "GB": [{ value: "HSBC", label: "HSBC" }, { value: "BARCLAYS", label: "Barclays" }]
  // Add more countries and customers as needed
};
