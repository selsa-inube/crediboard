import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Blanket } from "@inubekit/blanket";
import { Divider } from "@inubekit/divider";
import { Button } from "@inubekit/button";

import { UnfulfilledRequirements } from "@components/cards/UnfulfilledRequirements";
import { mockRequirementsNotMet } from "@mocks/requirements-not-met/requirementsnotmet.mock";
import { validationMessages } from "@validations/validationMessages";

import { dataRequirementsNotMet } from "./config";
import {
  ScrollableContainer,
  StyledContainer,
  StyledContainerClose,
} from "./styles";

export interface IRequirementsModalProps {
  handleClose: () => void;
  portalId?: string;
}

export function RequirementsModal(props: IRequirementsModalProps) {
  const { portalId, handleClose } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          gap="24px"
          width="402px"
          height="652px"
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text size="small" type="headline">
              {dataRequirementsNotMet.title}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text type="body" size="large">
                  {dataRequirementsNotMet.close}
                </Text>
                <Icon
                  icon={<MdClear />}
                  size="24px"
                  cursorHover
                  appearance="dark"
                />
              </Stack>
            </StyledContainerClose>
          </Stack>
          <Divider />
          <ScrollableContainer>
            {mockRequirementsNotMet.map((requirementData, index) => (
              <UnfulfilledRequirements
                key={index}
                requirement={requirementData.requirement}
                causeNonCompliance={requirementData.causeNonCompliance}
              />
            ))}
          </ScrollableContainer>
          <Divider />
          <Stack justifyContent="end">
            <Button onClick={handleClose}>
              {dataRequirementsNotMet.close}
            </Button>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
