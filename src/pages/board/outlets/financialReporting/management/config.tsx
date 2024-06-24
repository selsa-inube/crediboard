// src/config.tsx
import { Textfield } from "@inubekit/textfield";
import { MdOutlineSend } from "react-icons/md";
import { Icon } from "@inube/design-system";
import { LuPaperclip } from "react-icons/lu";

export const chatManagement = [
    {
        id: "Multimedia",
        actionName: "Multimedia",
        content: () => {
            <Icon
                appearance="primary"
                cursorHover
                size="24px"
                icon={<LuPaperclip />}
            />
        }
    },
    {
        id: "Barra texto",
        actionName: "Barra texto",
        content: () => {
            <Textfield id="text" placeholder="Ej.: Escriba su mensaje" />
        }
    },
    {
        id: "Enviar",
        actionName: "Enviar",
        content: () => {
            <Icon
                appearance="primary"
                cursorHover
                size="24px"
                icon={<MdOutlineSend />}
            />
        }
    }
]
