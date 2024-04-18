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

export type { Requests, DmEtapasPrs, DmTareasPrs, DmConceptos, DmDecisions };
