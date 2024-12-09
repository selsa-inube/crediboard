import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import {
  MdClose,
  MdDeleteOutline,
  MdOutlineEdit,
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
  handleEdit: () => void;
  handleView: () => void;
  handleDelete: () => void;
}

const actions: Action[] = [
  {
    icon: <MdOutlineRemoveRedEye />,
    appearance: "dark",
    label: "Ver detalles",
  },
  { icon: <MdOutlineEdit />, appearance: "dark", label: "Editar" },
  { icon: <MdDeleteOutline />, appearance: "danger", label: "Eliminar" },
];

export function ActionModal(props: ActionModalProps) {
  const { onClose, handleEdit, handleView, handleDelete } = props;

  return (
    <StyledContainer>
      <StyledActions>
        <Stack padding="10px 15px" width="150px">
          <StyledContainerClose>
            <Icon
              icon={<MdClose />}
              appearance="dark"
              size="24px"
              onClick={onClose}
            />
          </StyledContainerClose>
          <StyledUl>
            {actions.map((item, index) => (
              <StyledLi
                key={index}
                onClick={() => {
                  if (item.label === "Ver detalles" && handleView) {
                    handleView();
                  } else if (item.label === "Editar" && handleEdit) {
                    handleEdit();
                  } else if (item.label === "Eliminar" && handleDelete) {
                    handleDelete();
                  }
                }}
              >
                <Icon
                  icon={item.icon}
                  appearance={item.appearance}
                  size="20px"
                />
                <Text type="body" size="medium">
                  {item.label}
                </Text>
              </StyledLi>
            ))}
          </StyledUl>
        </Stack>
      </StyledActions>
    </StyledContainer>
  );
}
