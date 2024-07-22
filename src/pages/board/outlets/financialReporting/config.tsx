import { MdAddCircleOutline } from "react-icons/md";

import { IOptionButtons } from "@components/modals/Listmodal";

export const optionButtons: IOptionButtons = {
  label: "Adjuntar archivo",
  variant: "none",
  icon: <MdAddCircleOutline />,
  fullwidth: false,
  onClick: () => console.log("Adjuntar archivo"),
};

export const configDataAttachments = [
  {
    id: "1",
    name: "Adjunto 1",
  },
  {
    id: "2",
    name: "Comprobante de nómina",
  },
  {
    id: "3",
    name: "Copia de cédula de ciudadanía",
  },
  {
    id: "4",
    name: "Registro civil Maria José Morales",
  },
  {
    id: "5",
    name: "Certificado de ingresos y retenciones",
  },
  {
    id: "6",
    name: "Certificado laboral",
  },
  {
    id: "7",
    name: "Certificados de estudio",
  },
  {
    id: "8",
    name: "Certificado de cámara de comercio",
  },
  {
    id: "9",
    name: "Certificado de antecedentes disciplinarios",
  },
  {
    id: "10",
    name: "Certificado de antecedentes judiciales",
  },
  {
    id: "11",
    name: "Certificado de antecedentes fiscales",
  },
  {
    id: "12",
    name: "Certificado de antecedentes policiales",
  },
  {
    id: "13",
    name: "Certificado de antecedentes penales",
  },
  {
    id: "14",
    name: "Certificado de antecedentes de tránsito",
  },
  {
    id: "15",
    name: "Certificado de antecedentes de contraloría",
  },
  {
    id: "16",
    name: "Certificado de antecedentes de procuraduría",
  },
  {
    id: "17",
    name: "Certificado de antecedentes de fiscalía",
  },
];
