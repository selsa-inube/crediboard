import { MdWarningAmber } from "react-icons/md";

import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Fieldset } from "@components/data/Fieldset";

interface IUnfulfilledRequirementsProps {
  title: string;
  requirement: string;
  causeNoncompliance: string;
  isMobile: boolean;
}

export const UnfulfilledRequirements = (
  props: IUnfulfilledRequirementsProps
) => {
  const { title, requirement, causeNoncompliance } = props;
  return (
    <Fieldset title={title}>
      <Stack direction="column" gap="16px" padding="0 16px">
        <Stack direction="column" gap="4px">
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="body" size="large">
              Requisito:
            </Text>
            <Icon icon={<MdWarningAmber />} appearance="warning" size="24px" />
          </Stack>
          <Divider />
          <Text appearance="gray" size="medium" type="body">
            {requirement}
          </Text>
        </Stack>
        <Stack direction="column" gap="4px">
          <Text>Causa de incumplimiento:</Text>
          <Divider />
          <Text appearance="gray" size="medium">
            {causeNoncompliance}
          </Text>
        </Stack>
      </Stack>
    </Fieldset>
  );
};
