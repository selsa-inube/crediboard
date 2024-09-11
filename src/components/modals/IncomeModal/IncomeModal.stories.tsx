import { Meta } from "@storybook/react";
import { IncomeModal } from ".";
import { DebtorData } from "./interface";

const meta: Meta<typeof IncomeModal> =  {
    title: 'components/modals/IncomeModal',
    component: IncomeModal,
  };

const Default = () => {
    const {form, onChange, options} = DebtorData()

    return(
        <IncomeModal form={form} onChange={onChange} options={options} />
    ) 
}

export { Default }
export default meta;