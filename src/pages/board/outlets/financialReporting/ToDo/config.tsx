import { MdOutlineModeEditOutline } from "react-icons/md";

export const infoIcon = {
  icon: <MdOutlineModeEditOutline />,
  onClick: () => console.log("info"),
};

export const errorMessagge =
  "Ups, algo salió mal. No se puede cargar la información. Intente nuevamente más tarde.";

export interface FlagMessage {
  title: string;
  description: string;
  appearance: "success" | "danger";
}

export const flagMessages: Record<string, FlagMessage> = {
  success: {
    title: "Enviado",
    description: "Los datos han sido enviados exitosamente.",
    appearance: "success",
  },
  error: {
    title: "Rechazo Confirmado ",
    description: "El rechazo se ha realizado correctamente",
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

export const buttonText = "Enviar";