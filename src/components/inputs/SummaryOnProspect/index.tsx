import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Container, IconWrapper } from "./styles";
import { ListModal } from "@components/modals/ListModal"; 

export interface ObligationCardProps {
  items: { title: string; amount: string }[];
  showIcon?: boolean;
}

function ObligationCard({ items, showIcon = true }: ObligationCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleIconClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Container>
        {items.map((item, index) => (
          <Stack key={index} direction="column" margin="4px" padding="0px 10px">
            <Text size="small" padding="0px 0px 3px">
              {item.title}
            </Text>
            <Text size="large" weight="bold" appearance="dark">
              {item.amount}
            </Text>
          </Stack>
        ))}
        {showIcon && (
          <IconWrapper>
            <Icon
              appearance="primary"
              icon={<MdOutlineEdit />}
              cursorHover
              size="24px"
              onClick={handleIconClick}
            />
          </IconWrapper>
        )}
      </Container>

      {isModalOpen && (
        <ListModal
          title="Detalles de la obligación"
          handleClose={handleCloseModal}
          buttonLabel="Cerrar"
          content="Aquí puedes ver los detalles adicionales."
        />
      )}
    </>
  );
}

export default ObligationCard;
