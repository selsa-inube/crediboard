import {
  MdClose,
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";

import { StyledContainer, StyledLi, StyledUl, StyledActions } from "./styles";
import { IAction, IAppearances } from "./type";



interface ActionModalProps {
  onClose: () => void;
  onClickDetails: () => void;
  onClickEdit: () => void;
  onClickEliminate: () => void;
}

export function ActionModal(props: ActionModalProps) {
  const { onClose, onClickDetails, onClickEdit, onClickEliminate } = props;
  const actions: IAction[] = [
    {
      icon: <MdOutlineRemoveRedEye />,
      appearance: IAppearances.dark,
      label: "Ver detalles",
      onClick: onClickDetails,
    },
    {
      icon: <MdOutlineEdit />,
      appearance: IAppearances.primary,
      label: "Editar",
      onClick: onClickEdit,
    },
    {
      icon: <MdDeleteOutline />,
      appearance: IAppearances.danger,
      label: "Eliminar",
      onClick: onClickEliminate,
    },
  ];
  return (
    <StyledContainer>
      <StyledActions>
        <Stack padding="10px 15px" width="132px">
          <Icon
            icon={<MdClose />}
            appearance="dark"
            size="24px"
            onClick={onClose}
            cursorHover
          />
          <StyledUl>
            {actions.map((item, index) => (
              <StyledLi key={index} onClick={item.onClick}>
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
