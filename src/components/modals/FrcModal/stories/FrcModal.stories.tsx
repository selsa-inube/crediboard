import { Meta, StoryObj } from '@storybook/react';
import { useState } from "react";
import { Button } from "@inubekit/button";
import { ScoreModal, ScoreModalProps } from '..'; 

const meta: Meta<typeof ScoreModal> = {
  title: 'components/modals/ScoreModal',
  component: ScoreModal,
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'The title of the modal',
    },
    puntajeTotal: {
      control: { type: 'number' },
      description: 'Total score displayed in the modal',
    },
    antiguedad: {
      control: { type: 'number' },
      description: 'Years of seniority',
    },
    riesgoCentral: {
      control: { type: 'number' },
      description: 'Risk score from the central risk agency',
    },
    estabilidadLaboral: {
      control: { type: 'number' },
      description: 'Labor stability index',
    },
    estadoCivil: {
      control: { type: 'text' },
      description: 'Marital status',
    },
    actividadEconomica: {
      control: { type: 'number' },
      description: 'Economic activity score',
    },
    ingresoMensual: {
      control: { type: 'number' },
      description: 'Monthly income',
    },
    maxIndebtedness: {
      control: { type: 'text' },
      description: 'Maximum indebtedness amount',
    },
  },
};

export default meta;

type Story = StoryObj<ScoreModalProps>;

export const Default: Story = (args: ScoreModalProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Open Score Modal</Button>
      {showModal && (
        <ScoreModal
          {...args}
          handleClose={() => setShowModal(false)}
          portalId="portal" 
        />
      )}
    </>
  );
};

Default.args = {
  title: 'Endeudamiento máximo x FRC',
  puntajeTotal: 150,
  antiguedad: 10,
  riesgoCentral: 250,
  estabilidadLaboral: 900,
  estadoCivil: 'Casado',
  actividadEconomica: 150,
  ingresoMensual: 5000000,
  maxIndebtedness: '2000000',
};
