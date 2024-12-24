import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Divider } from "@inubekit/divider";
import { StyledContainer } from "./styles";
import { newBorrowedDAta } from "./config";
import { Icon } from "@inubekit/icon";
import {
  MdOutlineAttachMoney,
  MdOutlineDelete,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";

export interface ICardNewBorrowerProps {
  title: string;
  name: string;
  lastName: string;
  email: string;
  income: string;
  obligations: string;
}

export function CardBorrower(props: ICardNewBorrowerProps) {
  const { title, name, lastName, email, income, obligations } = props;

  return (
    <StyledContainer>
      <Stack direction="column" padding="10px 16px">
        <Stack direction="row" margin="5px 0 10px 0">
          <Icon
            icon={<FaRegUser />}
            appearance="gray"
            size="15px"
            cursorHover
            spacing="narrow"
            shape="rectangle"
          />
          <Text
            type="label"
            size="large"
            weight="bold"
            appearance="gray"
            margin="0 0 0 8px"
          >
            {title}
          </Text>
        </Stack>
        <Divider dashed />
        <Text appearance="gray" size="small" margin="10px 0 7px 0">
          {newBorrowedDAta.names}
        </Text>
        <Text type="body" size="large">
          {name}
        </Text>
        <Text appearance="gray" size="small" margin="10px 0 7px 0">
          {newBorrowedDAta.lastNames}
        </Text>
        <Text type="body" size="large">
          {lastName}
        </Text>
        <Text appearance="gray" size="small" margin="10px 0 7px 0">
          {newBorrowedDAta.email}
        </Text>
        <Text type="label" size="large" weight="bold">
          {email}
        </Text>
        <Text appearance="gray" size="small" margin="10px 0 7px 0">
          {newBorrowedDAta.income}
        </Text>
        <Stack>
          <Icon
            icon={<MdOutlineAttachMoney />}
            appearance={"success"}
            size="17px"
          />
          <Text type="label" size="large" weight="bold">
            {income}
          </Text>
        </Stack>
        <Text appearance="gray" size="small" margin="10px 0 7px 0">
          {newBorrowedDAta.obligations}
        </Text>
        <Stack>
          <Icon
            icon={<MdOutlineAttachMoney />}
            appearance={"success"}
            size="17px"
          />
          <Text type="label" size="large" weight="bold" margin="0 0 10px 0">
            {obligations}
          </Text>
        </Stack>
        <Divider dashed />
        <Stack gap="10px" justifyContent="flex-end" padding="15px 0px">
          <Icon
            icon={<IoEyeOutline />}
            appearance="dark"
            size="20px"
            cursorHover
          />

          <Icon
            icon={<MdOutlineModeEditOutline />}
            appearance={"dark"}
            size="20px"
            cursorHover
          />
          <Icon
            icon={<MdOutlineDelete />}
            appearance={"dark"}
            size="20px"
            cursorHover
          />
        </Stack>
      </Stack>
    </StyledContainer>
  );
}
