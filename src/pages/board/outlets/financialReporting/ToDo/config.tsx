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
