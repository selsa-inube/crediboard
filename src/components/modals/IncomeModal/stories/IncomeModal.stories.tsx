import { Meta, StoryObj } from '@storybook/react';
import { IncomeModal, IIncomeModalProps } from '..';

const meta: Meta<typeof IncomeModal> = {
  title: 'Modals/IncomeModal',
  component: IncomeModal,
  argTypes: {
    handleClose: { action: 'handleClose' },
  },
};

export default meta;

type Story = StoryObj<IIncomeModalProps>;

export const Default: Story = {
  render: (args) => <IncomeModal {...args} />,
  args: {
    title: 'Detalle de Ingresos',
    reportedIncomeSources: 1500000,
    reportedFinancialObligations: 500000,
    subsistenceReserve: 200000,
    availableForNewCommitments: 800000,
    maxVacationTerm: 60,
    maxAmount: 20000000,
  },
};
