import { MdAddCircleOutline } from "react-icons/md";

import { IOptionButtons } from "@components/modals/Listmodal";

export const handleConfirmReject = (
  values: { textarea: string },
  setFlagMessage: (message: {
    title: string;
    description: string;
    appearance: "success" | "danger";
  }) => void,
  setShowFlagMessage: (state: boolean) => void,
  setShowRejectModal: (state: boolean) => void
) => {
  const text = values.textarea;

  if (text) {
    setFlagMessage({
      title: "Rechazo Confirmado",
      description: "El rechazo se ha realizado correctamente",
      appearance: "success",
    });
  }

  setShowFlagMessage(true);
  setShowRejectModal(false);
};

export const handleConfirmCancel = (
  values: { textarea: string },
  setFlagMessage: (message: {
    title: string;
    description: string;
    appearance: "success" | "danger";
  }) => void,
  setShowFlagMessage: (state: boolean) => void,
  setShowCancelModal: (state: boolean) => void
) => {
  const text = values.textarea;

  if (text) {
    setFlagMessage({
      title: "Anulación Confirmada",
      description: "La anulación se ha realizado correctamente",
      appearance: "success",
    });
  }

  setShowFlagMessage(true);
  setShowCancelModal(false);
};

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

export const optionsPrintFormat = [
  {
    id: "pdf",
    label: "Pdf",
    disabled: false,
  },
  {
    id: "image",
    label: "Imagen",
    disabled: false,
  },
];
