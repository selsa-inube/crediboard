import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Text } from "@inube/design-system";
import { MdClose } from "react-icons/md";
import { StyledContainer, StyledUl, StyledLi } from "./styles";

export interface InfoItem {
  icon: JSX.Element;
  text: string;
  appearance?: "primary" | "success" | "warning" | "danger" | "help" | "dark" | "gray" | "light";
  shape?: "circle" | "rectangle";
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
          {items.map((item, index) => {
            const size = item.shape === "circle" ? "20px" : "28px";
            const variant = item.shape === "circle" ? "filled" : "none";

            return (
              <StyledLi key={index}>
                <Icon
                  icon={item.icon}
                  appearance={item.appearance || "primary"}
                  size={size}
                  shape={item.shape}
                  variant={variant}
                  spacing="none"
                />
                <Text>{item.text}</Text>
              </StyledLi>
            );
          })}
        </StyledUl>
      </Stack>
    </StyledContainer>
  );
};
