import { ArgTypes } from "@storybook/react";
import { ScoreModalProps } from ".."; 

export const scoreModalArgs: Partial<ArgTypes<ScoreModalProps>> = {
  title: {
    control: { type: "text" },
    description: "The title of the modal",
  },
  puntajeTotal: {
    control: { type: "number" },
    description: "Total score displayed in the modal",
  },
  antiguedad: {
    control: { type: "number" },
    description: "Years of seniority",
  },
  riesgoCentral: {
    control: { type: "number" },
    description: "Risk score from the central risk agency",
  },
  estabilidadLaboral: {
    control: { type: "number" },
    description: "Labor stability index",
  },
  EstadoCivil: {
    control: { type: "number" },
    description: "Marital status",
  },
  actividadEconomica: {
    control: { type: "number" },
    description: "Economic activity score",
  },
  ingresoMensual: {
    control: { type: "number" },
    description: "Monthly income",
  },
  maxIndebtedness: {
    control: { type: "text" },
    description: "Maximum indebtedness amount",
  },
};
