import { Fieldset } from "@components/data/Fieldset";
import { MdOutlineSend } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/Stack";
import { Textfield } from "@inubekit/textfield";
import { LuPaperclip } from "react-icons/lu";
import { ManagementContainer,ChatContent } from "./styles";
import { Message } from "@src/components/messages";

export const Management: React.FC = () => {
  const handleSendClick = () => {
    console.log("Prueba");
  };

  return (
    <Fieldset title="Gestión" heigthFieldset="340px" aspectRatio="1">
      <ManagementContainer>
        <ChatContent>
          <Message type="received" timestamp={Date.now() - 3600000}>
            Buenas tardes señores
          </Message>
          <Message type="sent" timestamp={Date.now()}>
            Buenas tardes, gracias por comunicarse con nosotros en un gusto
            atenderlo, cómo le puedo colaborar?
          </Message>
          <Message type="received" timestamp={Date.now() - 1800000}>
            Quiero conocer el estado de mi solicitud
          </Message>
          <Message type="received" timestamp={Date.now() - 3600000}>
            Buenas tardes señores
          </Message>
          <Message type="sent" timestamp={Date.now()}>
            Buenas tardes, gracias por comunicarse con nosotros en un gusto
            atenderlo, cómo le puedo colaborar?
          </Message>
          <Message type="received" timestamp={Date.now() - 1800000}>
            Quiero conocer el estado de mi solicitud
          </Message>
        </ChatContent>
        <Stack direction="row" gap="8px" alignItems="center">
          <Icon
            appearance="primary"
            cursorHover
            size="36px"
            icon={<LuPaperclip />}
          />
          <Textfield
            id="text"
            placeholder="Ej.: Escriba su mensaje"
            fullwidth
          />
          <button onClick={handleSendClick}>
            <Icon
              appearance="primary"
              cursorHover
              size="36px"
              icon={<MdOutlineSend />}
            />
          </button>
        </Stack>
      </ManagementContainer>
    </Fieldset>
  );
};
