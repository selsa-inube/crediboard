import { Meta, StoryObj } from '@storybook/react';
import { useState } from "react";
import { IncomeModal, IIncomeModalProps } from '..';
import { Button } from "@inubekit/button";
import { props } from './props';


const meta: Meta<typeof IncomeModal> = {
  title: 'Modals/IncomeModal',
  component: IncomeModal,
  argTypes: props,
};

export default meta;

type Story = StoryObj<IIncomeModalProps>;
export const Default: Story = (args: IIncomeModalProps) => {
    const [showModal, setShowModal] = useState(false);
  
    return (
      <>
        <Button onClick={() => setShowModal(true)}>Abrir Modal</Button>
        {showModal && (
          <>
            <IncomeModal {...args} handleClose={() => setShowModal(false)} />
          </>
        )}
      </>
    );
  };
  Default.args = {
    title: 'Cupo máx. capacidad de pago',
    reportedIncomeSources: 1500000,
    reportedFinancialObligations: 500000,
    subsistenceReserve: 200000,
    availableForNewCommitments: 800000,
    maxVacationTerm: 60,
  };
