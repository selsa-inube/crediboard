export interface payroll_discount_authorization {
  credit_request_id: string;
  payroll_discount_authorization_id: string;
  description_use: string;
  abbreviated_name: string;
  credit_product_id: string;
  borrower_id: string;
  state: string;
  obligation_unique_code: string;
  document_unique_code: string;
  image_unique_code: string;
}

export interface promissory_note {
  credit_request_id: string;
  promissory_note_id: string;
  description_use: string;
  abbreviated_name: string;
  credit_product_id: string;
  state: string;
  obligation_unique_code: string;
  document_unique_code: string;
  image_unique_code: string;
}
