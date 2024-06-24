import { Fieldset } from "@components/data/Fieldset";
import { MdOutlineSend } from "react-icons/md";
import { Icon } from "@inubekit/icon"
import { Stack } from "@inubekit/Stack";
import { Textfield } from "@inubekit/textfield";
import { LuPaperclip } from "react-icons/lu";
import { ManagementContainer } from './styles';
 
 
 
 
export const Management = () => {
    const handleSendClick = () => {
        console.log('Prueba');
    };
 
 
    return (
          <Fieldset title="Gestión" heigthFieldset="340px" aspectRatio="1">
          <ManagementContainer>
          <Stack direction="row" gap="8px" alignItems="center" >
            <Icon
                appearance="primary"
                cursorHover
                size="36px"
                icon={<LuPaperclip  />}
            />
            < Textfield id="text" placeholder="Ej.: Escriba su mensaje" fullwidth />
            <button onClick={handleSendClick}>
                <Icon
                    appearance="primary"
                    cursorHover
                    size="36px"
                    icon={<MdOutlineSend />}
                />
            </button>
          </ Stack>
          </ManagementContainer>
          </Fieldset>
 
    )
}