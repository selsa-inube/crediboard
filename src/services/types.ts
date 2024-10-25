import { Schedule, GracePeriodType, BorrowerProperties } from "@services/enums";
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
  decisions: { id: string; label: string; value: string }[];
}

interface IKeyRiskScoring {
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

interface IRiskScoring {
  credit_request_id: string;
  risk_scoring: IKeyRiskScoring;
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
  execution_date: string | number;
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

export interface Ipayment_capacity {
  credit_request_id: string;
  payment_capacity: {
    available_value: number;
    base_income: number;
    percentage_used: number;
  };
}
export interface Icredit_behavior {
  credit_request_id: string;
  credit_behavior: {
    core_risk_score: number;
    central_risk_score_date: number;
    number_of_internal_arrears: number;
    maximum_number_of_installments_in_arrears: number;
  };
}

export interface Iuncovered_wallet {
  credit_request_id: string;
  uncovered_wallet: {
    overdraft_factor: number;
    discovered_value: number;
    reciprocity: number;
  };
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

export interface IErrorService {
  id: string;
  message: string | Error;
}

export interface IProspect {
  prospect_id: string;
  public_code: string;
  state: string;
  loan_amount: number;
  installment_limit: number;
  term_limit: number;
  timestamp: string;
  selected_payment_schedule: Schedule;
  selected_rate_type: string;
  payment_method: string;
  grace_period: number;
  grace_period_type: (typeof GracePeriodType)[keyof typeof GracePeriodType];
  borrower: IBorrower[];
  consolidated_credit: IConsolidatedCredit[];
  credit_product: ICreditProductProspect[];
  outlay: IOutlay[];
}

export interface IConsolidatedCredit {
  consolidated_amount: number;
  consolidated_amount_type: string;
  estimated_date_of_consolidation: string;
  credit_id: string;
  line_of_credit_description: string;
  borrower_id: string;
  consolidated_credit_schema: string;
  monthly_salary?: number;
  other_monthly_payments?: number;
  pension_allowances?: number;
  leases?: number;
  dividends_or_shares?: number;
  financial_returns?: number;
  average_monthly_profit?: number;
  monthly_fees?: number;
}

export interface IExtraordinaryInstallment {
  installment_amount: number;
  installment_date: string;
  payment_channel_code: string;
}

export interface ICreditProductProspect {
  abbreviated_name: string;
  credit_product_code: string;
  loan_amount: number;
  line_of_credit_code: string;
  line_of_credit_abbreviated_name: string;
  interest_rate: number;
  fixed_points: number;
  loan_term: number;
  schedule: Schedule;
  ordinary_installment_for_principal?: IOrdinaryInstallmentsForPrincipal;
  ordinary_installment_for_interest: IInstallmentsForInterest;
  extraordinary_installment: IExtraordinaryInstallment;
  acquired_cash_flow: IAcquiredCashFlow;
}

export interface IIncome {
  debtor_id: string;
  debtor: string,
  monthly_salary: number,
  other_monthly_payments: number,
  pension_allowances: number,
  leases: number,
  dividends_or_shares: number,
  financial_returns: number,
  average_monthly_profit: number,
  monthly_fees: number,
}

export interface IBorrowerProperty {
  property_name: (typeof BorrowerProperties)[keyof typeof BorrowerProperties];
  property_value: string;
}

export interface IOutlay {
  abreviated_name: string;
  date: string;
  amount: number;
}

export interface IBorrower {
  borrower_name: string;
  borrower_type: string;
  borrower_identification_type: string;
  borrower_identification_number: string;
  borrower_property: IBorrowerProperty[];
}

export interface IOrdinaryInstallmentsForPrincipal {
  term: number;
  number_of_installments: number;
  schedule: Schedule;
  installment_amount_for_capital: number;
  installment_amount: number;
  gradient_rate: number;
  gradient_value: number;
  gradient_schedule: string;
  first_gradient_date: string;
  payment_channel_code: string;
}

export interface IInstallmentsForInterest {
  schedule: Schedule;
  payment_channel_code: string;
}

export interface IAcquiredCashFlow {
  amount: string;
  date: string;
  payment_channel_unique_code: string;
  flow_number: number;
}

type ItemValidation = {
  [key: string]: "Y" | "N" | "";
};

export interface CreditRequest {
  credit_request_id: string;
  system_validations: ItemValidation;
  documentary_requirements: ItemValidation;
  human_validations: ItemValidation;
}

export interface IRiskScoringRangeRequered {
  seniority_score: number;
  risk_center_score: number;
  job_stability_index_score: number;
  marital_status_score: number;
  economic_activity_score: number;
}

export interface IExtraordinaryPayment {
  id: string;
  datePayment: string;
  value: number;
  paymentMethod: string;
}