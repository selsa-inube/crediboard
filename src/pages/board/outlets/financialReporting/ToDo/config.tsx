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
  changeSuccess: {
    title: "Cambio realizado",
    description: "El cambio se realizó con éxito.",
    appearance: "success",
  },
};

export const buttonText = "Enviar";

export const txtLabels = {
  title: "Confirmar la decisión",
  buttonText: "Enviar",
  secondaryButtonText: "Cancelar",
  inputLabel: "Justificación",
  inputPlaceholder: "Describa el motivo de su decisión.",
};

export const txtLabelsNoData = {
  title: "No se encontraron tareas",
  description: "Parece que no hay tareas disponibles para mostrar.",
  buttonDescription: "volver a intentar",
  route: "/retry-path",
};

export const txtFlags = {
  titleSuccess: "¡Proceso exitoso!",
  descriptionSuccess: `La tarea se ha ejecutado de manera correcta. Nueva tarea asignada.`,

  titleWarning: "Error al registrar la decisión",
  descriptionWarning: `Hubo un problema con el proceso. Código: `,

  titleDanger: "Error inesperado",
  descriptionDanger:
    "Ocurrió un error al registrar la tarea. Intente nuevamente más tarde.",

  duration: 5000,
};

export const txtOthersOptions = {
  optionClose: "Cerrar",
  txtDecision: "Decisión",
  txtNoSelect: "No se seleccionó una decisión disponible.",
};
