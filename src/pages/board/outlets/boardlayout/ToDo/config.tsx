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

export const optionsSelectGestorComercial = [
  {
    id: "gestor1",
    label: "Gestor 1",
    disabled: false,
  },
  {
    id: "gestor2",
    label: "Gestor 2",
    disabled: false,
  },
  {
    id: "gestor3",
    label: "Gestor 3",
    disabled: false,
  },
];

export const optionsSelectAnalista = [
  {
    id: "analista1",
    label: "Analista 1",
    disabled: false,
  },
  {
    id: "analista2",
    label: "Analista 2",
    disabled: false,
  },
  {
    id: "analista3",
    label: "Analista 3",
    disabled: false,
  },
];
