import { Icon } from "@inubekit/icon";
import { Text } from "@inubekit/text";
import { StyledMenu, StyledContainerLabel } from "./styles";
import { IOptions } from "./types";

interface MenuPropectProps {
  options: IOptions[];
  onMouseLeave: () => void;
}

export const MenuPropect = (props: MenuPropectProps) => {
  const { options, onMouseLeave } = props;

  return (
    <StyledMenu onMouseLeave={onMouseLeave}>
      {options &&
        options.map((option) => (
          <StyledContainerLabel onClick={option.onClik}>
            <Icon icon={option.icon} appearance="primary" size="24px"></Icon>
            <Text size="small" weight="normal">
              {option.title}
            </Text>
          </StyledContainerLabel>
        ))}
    </StyledMenu>
  );
};
export type { MenuPropectProps };
