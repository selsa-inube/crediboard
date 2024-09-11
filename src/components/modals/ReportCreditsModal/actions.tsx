import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { MdClose, MdDeleteOutline, MdOutlineEdit, MdOutlineRemoveRedEye } from "react-icons/md";

import { StyledContainer, StyledLi, StyledUl } from "./styles";

interface Action {
    icon: React.ReactNode; 
    appearance: "primary" | "success" | "warning" | "danger" | "help" | "dark" | "gray" | "light";
    label: string;
}

interface ActionModalProps {
    onClose?: () => void;
}
    
const actions: Action[] = [
    { icon: <MdOutlineRemoveRedEye />, appearance: "dark", label: "Ver detalles" },
    { icon: <MdOutlineEdit />, appearance: "primary", label: "Editar" },
    { icon: <MdDeleteOutline />, appearance: "danger", label: "Eliminar" },
];

export function ActionModal({ onClose }: ActionModalProps) {
    return (
        <StyledContainer>
            <Stack padding="10px 20px">
                <Icon icon={<MdClose />} appearance="dark" size="24px" onClick={onClose} />
                <StyledUl>
                    {actions.map((item, index) => (
                        <StyledLi key={index}>
                            <Icon icon={item.icon} appearance={item.appearance} />
                            <Text size="medium">{item.label}</Text>
                        </StyledLi>
                    ))}
                </StyledUl>
            </Stack>
        </StyledContainer>
    );
}
