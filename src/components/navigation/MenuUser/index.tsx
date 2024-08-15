import { Avatar } from "@inubekit/avatar";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";

interface MenuUserProps {
  userName: string;
  businessUnit?: string;
  avatar?: boolean;
}

function MenuUser(props: MenuUserProps) {
  const { userName, businessUnit = "Linix", avatar = true } = props;

  return (
    <Stack gap="12px" padding="12px 16px">
      {avatar && (
        <Stack direction="column" justifyContent="center">
          <Avatar />
        </Stack>
      )}
      <Stack direction="column" justifyContent="center">
        <Text size="medium">{userName}</Text>
        <Text size="small" appearance="gray">
          {businessUnit}
        </Text>
      </Stack>
    </Stack>
  );
}

export type { MenuUserProps };
export { MenuUser };
