const props = {
  rad: {
    control: "number",
    description: "Número de referencia del resumen",
  },
  date: { control: "date", description: "Fecha de la solicitud" },
  name: { control: "text", description: "Nombre del titular" },
  destination: { control: "text", description: "Destino de la solicitud" },
  value: { control: "number", description: "Valor de la solicitud" },
  toDo: {
    control: "text",
    description: "Actividad de ejecución de la solicitud",
  },
};

export { props };
