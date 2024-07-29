import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Text } from "@inube/design-system";
import { MdClose } from "react-icons/md";
import { StyledInfo } from "./styles";

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
    <StyledInfo>
      <Stack padding="10px 20px">
        <Icon icon={<MdClose />} appearance="dark" size="24px" onClick={onClose} />
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Icon
                icon={item.icon}
                appearance={item.appearance || "primary"}
                size={item.size}
                shape={item.shape}
                variant={item.variant}
                spacing="none"
              />
              <Text>{item.text}</Text>
            </li>
          ))}
        </ul>
      </Stack>
    </StyledInfo>
  );
};
