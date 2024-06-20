import { Fieldset } from "@components/data/Fieldset";
import { MdOutlineSend } from "react-icons/md";
import { Icon, inube, Stack, Textfield } from "@inube/design-system";
import { LuPaperclip } from "react-icons/lu";
import { ManagementContainer } from './styles';

  


export const Management = () => {
    return (

          <Fieldset title="Gestión" heigthFieldset="340px" aspectRatio="1">
          <ManagementContainer>
          <Stack direction="row" gap={inube.spacing.s200} alignItems="center" >
            <Icon
                appearance="primary"
                cursorHover
                size="36px"
                icon={<LuPaperclip  />}
            />
            < Textfield id="text" placeholder="Ej.: Escriba su mensaje" fullwidth ="100%" />
            <Icon
                appearance="primary"
                cursorHover
                size="36px"
                icon={<MdOutlineSend />}
            />
          </ Stack>
          
          </ManagementContainer>
          </Fieldset>

    )
}