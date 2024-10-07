import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import {
  MdClose,
  MdOutlineRemoveRedEye,
} from "react-icons/md";

import {
  StyledContainer,
  StyledLi,
  StyledUl,
  StyledActions,
  StyledContainerClose,
} from "./styles";

interface Action {
  icon: React.ReactNode;
  appearance:
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "help"
    | "dark"
    | "gray"
    | "light";
  label: string;
}

interface ActionModalProps {
  onClose?: () => void;
  onClick?: () => void;
}

const actions: Action[] = [
  {
    icon: <MdOutlineRemoveRedEye />,
    appearance: "dark",
    label: "Medios de Pago",
  },

];

export function ActionModal({ onClose, onClick }: ActionModalProps) {
  return (
    <StyledContainer>
      <StyledActions>
        <Stack padding="10px 15px" width="190px">
          <StyledContainerClose>
            <Icon
              icon={<MdClose />}
              appearance="dark"
              size="24px"
              onClick={onClose}
              cursorHover
            />
          </StyledContainerClose>
          <StyledUl>
            {actions.map((item, index) => (
              <StyledLi key={index} onClick={onClick}>
                <Icon icon={item.icon} appearance={item.appearance} />
                <Text size="medium">{item.label}</Text>
              </StyledLi>
            ))}
          </StyledUl>
        </Stack>
      </StyledActions>
    </StyledContainer>
  );
}
