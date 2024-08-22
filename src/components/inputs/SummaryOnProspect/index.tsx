import React from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Container, IconWrapper } from "./styles";

interface ObligationCardProps {
  title: string;
  amount: string;
}

const ObligationCard: React.FC<ObligationCardProps> = ({ title, amount }) => {
  return (
    <Container>
      <Stack direction="column" margin="4px" padding="0px 10px">
        <Text size="small" padding="0px 0px 3px" >
          {title}
        </Text>
        <Text size="large" appearance="dark">
          {amount}
        </Text>
      </Stack>
      <IconWrapper>
        <Icon
          appearance="primary"
          icon={<MdOutlineEdit />}
          cursorHover={true}
          size="24px"
        />
      </IconWrapper>
    </Container>
  );
};

export default ObligationCard;
