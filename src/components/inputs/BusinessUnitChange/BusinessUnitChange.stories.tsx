import { Meta } from "@storybook/react";
import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange"


const meta: Meta<typeof BusinessUnitChange> =  {
    title: 'components/inputs/BusinessUnitChange',
    component: BusinessUnitChange,
  };

const Default = () => {
    return(
        <BusinessUnitChange/>
    )
    
}

export { Default }
export default meta;