import { Fieldset } from "@components/data/Fieldset";
import { MdOutlineSend } from "react-icons/md";
import { Icon, inube, Stack, Textfield } from "@inube/design-system";
import { LuPaperclip } from "react-icons/lu";
import { ManagementContainer, ChatContent } from "./styles";
import { Message } from "@components/Chat";  

export const Management: React.FC = () => {
  return (
    <Fieldset title="Gestión" heigthFieldset="340px" aspectRatio="1">
      <ManagementContainer>
        <ChatContent>
          <Message type="received">Buenas tardes señores</Message>
          <Message type="sent">
            Buenas tardes, gracias por comunicarse con nosotros en un gusto
            atenderlo, cómo le puedo colaborar?
          </Message>
          <Message type="received">
            Quiero conocer el estado de mi solicitud
          </Message>
          <Message type="sent">¿Cómo estás?</Message>
          <Message type="received">Hola</Message>
          <Message type="sent">¿Cómo estás?</Message>
          <Message type="received">Hola</Message>
          <Message type="sent">¿Cómo estás?</Message>
        </ChatContent>
        <Stack direction="row" gap={inube.spacing.s200} alignItems="center">
          <Icon
            appearance="primary"
            cursorHover
            size="36px"
            icon={<LuPaperclip />}
          />
          <Textfield
            id="text"
            placeholder="Ej.: Escriba su mensaje"
            fullwidth="100%"
          />
          <Icon
            appearance="primary"
            cursorHover
            size="36px"
            icon={<MdOutlineSend />}
          />
        </Stack>
      </ManagementContainer>
    </Fieldset>
  );
};
