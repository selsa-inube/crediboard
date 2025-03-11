import { MdWarningAmber } from "react-icons/md";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";

import { Fieldset } from "@components/data/Fieldset";

import LabelData from "./Config/config";

interface IUnfulfilledRequirementsProps {
  requirement: string;
  causeNonCompliance: string;
  title?: string;
  isMobile?: boolean;
}

export const UnfulfilledRequirements = (
  props: IUnfulfilledRequirementsProps
) => {
  const { title, requirement, causeNonCompliance, isMobile } = props;
  return (
    <Fieldset title={title} isMobile={isMobile}>
      <Stack direction="column" gap="16px" padding="0 16px">
        <Stack direction="column" gap="4px">
          <Stack justifyContent="space-between" alignItems="center">
            <Text>{LabelData.requirement}</Text>
            <Icon icon={<MdWarningAmber />} appearance="warning" size="24px" />
          </Stack>
          <Divider />
          <Text appearance="gray" size="medium" type="body">
            {requirement}
          </Text>
        </Stack>
        <Stack direction="column" gap="4px">
          <Text>{LabelData.causeNonCompliance}</Text>
          <Divider />
          <Text appearance="gray" size="medium">
            {causeNonCompliance}
          </Text>
        </Stack>
      </Stack>
    </Fieldset>
  );
};
