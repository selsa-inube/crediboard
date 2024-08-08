import { MdOutlineModeEditOutline } from "react-icons/md";

export const infoIcon = {
  icon: <MdOutlineModeEditOutline />,
  onClick: () => console.log("info"),
};

export const optionSelectDecision = [
  {
    id: "aceptar",
    label: "Aceptar",
    disabled: false,
  },
  {
    id: "rechazar",
    label: "Rechazar",
    disabled: false,
  },
  {
    id: "pendiente",
    label: "Pendiente",
    disabled: false,
  },
];

export interface FlagMessage {
  title: string;
  description: string;
  appearance: "success"  | "danger";
}

export const flagMessages: Record<string, FlagMessage> = {
  success: {
    title: "Enviado",
    description: "Los datos han sido enviados exitosamente.",
    appearance: "success",
  },
  error: {
    title: "Rechazar",
    description: "los datos se han rechazado correctamente",
    appearance: "success",
  },
  pending: {
    title: "Pendiente",
    description: "La decisión está pendiente.",
    appearance: "success",
  },
  default: {
    title: "Acción requerida",
    description: "Seleccione una opción para continuar.",
    appearance: "danger",
  },
  changeSuccess: {
    title: "Cambio realizado",
    description: "El cambio se realizó con éxito.",
    appearance: "success",
  },
};
