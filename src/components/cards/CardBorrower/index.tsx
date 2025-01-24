import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import {
  MdOutlineAttachMoney,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlinePerson,
  MdOutlineRemoveRedEye,
} from "react-icons/md";

import { StyledContainer } from "./styles";
import { newBorrowedDAta } from "./config";

export interface ICardBorrowerProps {
  title: string;
  name: string;
  lastName: string;
  email: string;
  income: string;
  obligations: string;
  showIcons?: boolean;
}

export function CardBorrower(props: ICardBorrowerProps) {
  const {
    title,
    name,
    lastName,
    email,
    income,
    obligations,
    showIcons = true,
  } = props;

  return (
    <StyledContainer showIcons={showIcons}>
      <Stack direction="column" padding="10px 16px" gap="12px">
        <Stack gap="12px">
          <Icon icon={<MdOutlinePerson />} appearance="gray" size="24px" />
          <Text type="title" size="medium" weight="bold" appearance="gray">
            {title}
          </Text>
        </Stack>
        <Divider dashed />
        <Stack direction="column" gap="8px">
          <Stack direction="column" gap="4px">
            <Text type="label" weight="bold" size="medium" appearance="gray">
              {newBorrowedDAta.names}
            </Text>
            <Text type="body" size="large">
              {name}
            </Text>
          </Stack>
          <Stack direction="column" gap="4px">
            <Text type="label" weight="bold" size="medium" appearance="gray">
              {newBorrowedDAta.lastNames}
            </Text>
            <Text type="body" size="large">
              {lastName}
            </Text>
          </Stack>
          <Stack direction="column" gap="4px">
            <Text type="label" weight="bold" size="medium" appearance="gray">
              {newBorrowedDAta.email}
            </Text>
            <Text type="body" size="large">
              {email}
            </Text>
          </Stack>
          <Stack direction="column" gap="4px" justifyContent="center">
            <Text type="label" weight="bold" size="medium" appearance="gray">
              {newBorrowedDAta.income}
            </Text>
            <Stack alignItems="center">
              <Icon
                icon={<MdOutlineAttachMoney />}
                appearance={"success"}
                size="18px"
              />
              <Text type="body" size="large">
                {income}
              </Text>
            </Stack>
          </Stack>
          <Stack direction="column" gap="4px" justifyContent="center">
            <Text type="label" weight="bold" size="medium" appearance="gray">
              {newBorrowedDAta.obligations}
            </Text>
            <Stack alignItems="center">
              <Icon
                icon={<MdOutlineAttachMoney />}
                appearance={"success"}
                size="18px"
              />
              <Text type="body" size="large">
                {obligations}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        {showIcons && (
          <Stack direction="column" gap="12px">
            <Divider dashed />
            <Stack gap="10px" justifyContent="flex-end">
              <Icon
                icon={<MdOutlineRemoveRedEye />}
                appearance={"primary"}
                size="20px"
                cursorHover
              />
              <Icon
                icon={<MdOutlineEdit />}
                appearance={"primary"}
                size="20px"
                cursorHover
              />
              <Icon
                icon={<MdOutlineDelete />}
                appearance={"primary"}
                size="20px"
                cursorHover
              />
            </Stack>
          </Stack>
        )}
      </Stack>
    </StyledContainer>
  );
}
