import { Icon } from "@inubekit/icon";
import { Text } from "@inube/design-system";
import { StyledLi } from "./styles";
import { InfoItem } from './index'; 

interface InfoItemComponentProps {
  item: InfoItem;
}

export const InfoItemComponent: React.FC<InfoItemComponentProps> = ({ item }) => {
  const size = item.shape === "circle" ? "16px" : "20px";
  const variant = item.shape === "circle" ? "filled" : "outlined";

  return (
    <StyledLi>
      <Icon
        icon={item.icon}
        appearance={item.appearance || "primary"}
        size={size}
        shape={item.shape}
        variant={variant}
        spacing="narrow"
      />
      <Text size="medium">{item.text}</Text>
    </StyledLi>
  );
};
