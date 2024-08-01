import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Text } from "@inube/design-system";
import { MdClose } from "react-icons/md";
import { StyledContainer, StyledUl, StyledLi } from "./styles";

export interface InfoItem {
  icon: JSX.Element;
  text: string;
  appearance?: "primary" | "success" | "warning" | "danger" | "help" | "dark" | "gray" | "light";
  size?: string;
  shape?: "circle" | "rectangle";
  variant?: "none" | "filled" | "outlined";
}

interface InfoModalProps {
  onClose?: () => void;
  items: InfoItem[];
}

export const InfoModal = ({ onClose, items }: InfoModalProps) => {
  return (
    <StyledContainer>
      <Stack padding="10px 20px">
        <Icon icon={<MdClose />} appearance="dark" size="24px" onClick={onClose} />
        <StyledUl>
          {items.map((item, index) => (
            <StyledLi key={index}>
              <Icon
                icon={item.icon}
                appearance={item.appearance || "primary"}
                size={item.size}
                shape={item.shape}
                variant={item.variant}
                spacing="none"
              />
              <Text>{item.text}</Text>
            </StyledLi>
          ))}
        </StyledUl>
      </Stack>
    </StyledContainer>
  );
};
