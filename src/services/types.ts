interface Requests {
  k_Prospe: number;
  n_Prospe: string;
  f_Prospe: string;
  v_Monto: number;
  k_Idterc: number;
  k_Desdin: string;
  i_Estprs: DmEtapasPrs;
  n_Desdin: string;
  aanumnit: string;
  nnasocia: string;
  n_Descr_Etapa: string;
  n_Descr_Tarea: string;
}

interface IStaff {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
}

interface PinnedRequest {
  requestId: number;
  isPinned: "Y" | "N";
}

interface IToDo {
  credit_request_state_id: string;
  task_to_be_done: string;
  account_manager_name: string;
  analyst_name: string;
  decisions: { id: string; label: string }[];
}
interface IRiskScoring {
  total_score: number;
  minimum_score: number;
  seniority: number;
  seniority_score: number;
  risk_center: number;
  risk_center_score: number;
  job_stability_index: number;
  job_stability_index_score: number;
  marital_status: string;
  marital_status_score: number;
  economic_activity: string;
  economic_activity_score: number;
}

type DmEtapasPrs =
  | "CUMPLIMIENTO_REQUISITOS"
  | "FORMALIZACION_GARANTIAS"
  | "GESTION_COMERCIAL"
  | "TRAMITADA"
  | "TRAMITE_DESEMBOLSO"
  | "VERIFICACION_APROBACION";

type DmTareasPrs =
  | "ASESORAR_CLIENTE"
  | "CONFIRMAR_APROBACION"
  | "CONFIRMAR_DESEMBOLSO"
  | "GARANTIZAR_SOPORTES_POS"
  | "VALIDAR_REQUISITOS"
  | "VALIDAR_SOPORTES_JURIDICOS"
  | "INTERFACE_CARTERA";

type DmConceptos =
  | "APROBAR_SOLICITUD"
  | "AUTOMATICA"
  | "GESTION_COMERCIAL"
  | "ANALISIS_RIESGO"
  | "RECHAZAR_SOLICITUD"
  | "SIN_CONCEPTO"
  | "APROBACION_HUMANA"
  | "RECHAZO_HUMANO";

type DmDecisions =
  | "ANALISIS_RIESGO"
  | "ANULAR_SOLICITUD"
  | "APROBAR_SOLICITUD"
  | "CANCELAR_SOLICITUD"
  | "CONFIRMACION_CLIENTE"
  | "DESEMBOLSO_DECLINADO"
  | "DESEMBOLSO_REALIZADO"
  | "GESTION_COMERCIAL"
  | "RECHAZAR_SOLICITUD"
  | "SOPORTES_INVALIDOS"
  | "SOPORTES_POS_NO_RECIBIDOS"
  | "SOPORTES_POS_RECIBIDOS"
  | "SOPORTES_VALIDOS"
  | "VIABILIZAR_SOLICITUD"
  | "CREAR_OBLIGACIONES_DE_CARTERA"
  | "DECLINAR_OBLIGACIONES_DE_CARTERA";

interface TraceType {
  trace_id: string;
  trace_value: string;
  credit_request_id: string;
  use_case: string;
  user_id: string;
  execution_date: string;
  justification?: string;
  decision_taken_by_user?: string;
  trace_type?: string;
  read_novelty?: string;
}

export type {
  Requests,
  IStaff,
  IToDo,
  IRiskScoring,
  DmEtapasPrs,
  DmTareasPrs,
  DmConceptos,
  DmDecisions,
  PinnedRequest,
  TraceType,
};

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

export interface approval_by_credit_request_Mock {
  approval_id: string;
  credit_request_id: string;
  approver_id: string;
  approver_name: string;
  concept: string;
  error: boolean;
}

export interface Idocument {
  credit_request_id: string;
  document_id: string;
  document_managment_unique_reference: string;
  abbreviated_name: string;
}

export interface Ierror_issued {
  credit_request_id: string;
  error_issued_id: string;
  action_id: string;
  error_date: string;
  error_description: string;
  user_id: string;
  user_name: string;
  read: string;
}

export interface credit {
  credit_request_id: string;
  labor_stability: {
    company_seniority: number;
    labor_stability_index: number;
    max_labor_stability_index: number;
    estimated_severance: number;
  };
}

interface Prospect {
  credit_products: CreditProduct[];
}

interface CreditProduct {
  loan_amount: number;
  loan_term: number;
  insurance_rate: number;
  insurance_type: string;
  line_of_credit_id: string;
  rate_type: string;
  interest_rate: number;
  quota: number;
  payment_channel_for_principal: string;
  first_payment_cycle_for_principal: string;
  payment_channel_for_interest: string;
  first_payment_cycle_for_interest: number;
}

export interface ProspectsResponse {
  credit_request_id: string;
  prospect: Prospect;
}
