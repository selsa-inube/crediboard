import { Meta } from "@storybook/react";
import { IncomeModal } from ".";


const meta: Meta<typeof IncomeModal> =  {
    title: 'components/modals/IncomeModal',
    component: IncomeModal,
  };

const Default = () => {
    return(
        <IncomeModal/>
    )
    
}

export { Default }
export default meta;