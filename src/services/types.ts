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

export type {
  Requests,
  IStaff,
  DmEtapasPrs,
  DmTareasPrs,
  DmConceptos,
  DmDecisions,
  PinnedRequest,
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
