export const disbursemenTabs = {
  internal: { id: "internalAccount", disabled: false, label: "Cuenta interna" },
  external: { id: "externalAccount", disabled: false, label: "Cuenta externa" },
  check: { id: "entityCheck", disabled: false, label: "Cheque entidad" },
  management: {
    id: "managementCheck",
    disabled: false,
    label: "Cheque de gerencia",
  },
  cash: { id: "cash", disabled: false, label: "Dinero en efectivo" },
};

export const disbursementGeneral = {
  label: "Valor a girar con esta forma de desembolso",
  place: "Ej: 1.000.000",
  labelCheck:
    "El valor a girar con esta forma de desembolso es igual al saldo pendiente por desembolsar.",
  labelToggle: "¿El desembolso es a nombre propio?",
  optionToggleYes: "SI",
  optionToggleNo: "NO",
};

export const disbursemenOptionAccount = {
  labelAccount: "Cuenta para desembolsar el dinero",
  labelName: "Nombre",
  placeName: "Ej: Maria Camila",
  labelLastName: "Apellidos",
  placeLastName: "Ej: Hernández Guerrero",
  labelSex: "Sexo biológico",
  labelDocumentType: "Tipo de documento",
  labelDocumentNumber: "Número de documento",
  placeDocumentNumber: "Ej: 1015744898",
  labelBirthdate: "fecha de nacimiento",
  labelphone: "Teléfono de contacto",
  placephone: "Ej: 3103217765",
  labelMail: "Correo electrónico",
  placeMail: "Ej: micorreo@mail.com",
  labelCity: "Ciudad de residencia",
  labelBank: "Banco",
  labelAccountType: "Tipo de cuenta",
  labelAccountNumber: "Número de cuenta",
  placeAccountNumber: "Ej: 1040 2200 3582",
  observation: "Observaciones",
  placeObservation: "Cosas extra que deben tenerse en cuenta.",
  placeOption: "Seleccione una opción",
};
