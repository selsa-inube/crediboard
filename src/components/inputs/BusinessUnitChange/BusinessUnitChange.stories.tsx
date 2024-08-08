import { Meta } from "@storybook/react";

import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange"
import { clientsDataMock } from "@src/mocks/login/clients.mock";


const meta: Meta<typeof BusinessUnitChange> =  {
    title: 'components/inputs/BusinessUnitChange',
    component: BusinessUnitChange,
  };

const Default = () => {
    return(
        <BusinessUnitChange clients={clientsDataMock}/>
    )
    
}

export { Default }
export default meta;