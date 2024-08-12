import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Text } from "@inube/design-system";
import { MdCheck, MdClose, MdRemove} from "react-icons/md";
import { StyledContainer, StyledUl, StyledLi } from "./styles";

export interface InfoItem {
  icon: JSX.Element;
  text: string;
  appearance?: "primary" | "success" | "warning" | "danger" | "help" | "dark" | "gray" | "light";
  shape?: "circle" | "rectangle";
}

interface InfoModalProps {
  onClose?: () => void;
  items?: InfoItem[];
}

export const InfoModal = ({ onClose, items = [] }: InfoModalProps) => {
  const defaultItems: InfoItem[] = [
    { icon: <MdCheck />, text: "Cumple", appearance: "success", shape: "circle" },
    { icon: <MdClose />, text: "No Cumple", appearance: "danger", shape: "circle" },
    { icon: <MdRemove />, text: "Sin Evaluar", appearance: "warning", shape: "circle" },
  ];

  const mergedItems = defaultItems.map((defaultItem) => {
    const customItem = items.find(item => item.icon.type === defaultItem.icon.type);
    return customItem ? { ...defaultItem, ...customItem } : defaultItem;
  }).concat(items.filter(item => !defaultItems.some(defaultItem => defaultItem.icon.type === item.icon.type)));

  return (
    <StyledContainer>
      <Stack padding="10px 20px">
        <Icon icon={<MdClose />} appearance="dark" size="24px" onClick={onClose} />
        <StyledUl>
          {mergedItems.map((item, index) => {
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
