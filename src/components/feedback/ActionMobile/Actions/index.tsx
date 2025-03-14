import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { MdClose } from "react-icons/md";

import {
  StyledContainer,
  StyledLi,
  StyledUl,
  StyledActions,
  StyledContainerClose,
} from "./styles";
import { dataActions } from "./types";

interface ActionModalProps {
  handleDelete: () => void;
  handleEdit: () => void;
  handleView: () => void;
  onClose?: () => void;
}

export function ActionModal(props: ActionModalProps) {
  const { handleDelete, handleEdit, handleView, onClose } = props;

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
            {dataActions.map((item, index) => (
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
