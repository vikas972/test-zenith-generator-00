
export interface Product {
  id: string
  name: string
  description: string
}

export interface Domain {
  id: string
  name: string
  description: string
}

export interface Screen {
  id: string
  product_id: string
  domain_id: string
  name: string
  description: string
}

export interface ScreenElement {
  id: string
  screen_id: string
  name: string
  type: string
  description: string
}

export interface ElementRule {
  id: string
  screen_element_id: string
  description: string
  rule_type: string
  condition: string
}

export interface Flow {
  id: string
  product_id: string
  domain_id: string
  start_screen_id: string
  end_screen_id: string
  action: string
  type: string
  description: string
}

export interface ProductDomainRule {
  id: string
  product_id: string
  domain_id: string
  description: string
  rule_type: string
}

export interface Functionality {
  id: string
  product_id: string
  domain_id: string
  name: string
  description: string
}

export interface KBDocument {
  id: string
  product_id: string
  domain_id: string
  name: string
  format: string
  upload_date: Date
}

export interface KBExtractedData {
  id: string
  kb_document_id: string
  extracted_type: string
  extracted_value: string
  confidence_score: number
}

export interface Relationship {
  id: string
  parent_type: string
  parent_id: string
  child_type: string
  child_id: string
}
