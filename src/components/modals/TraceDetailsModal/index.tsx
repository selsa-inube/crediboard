import { createPortal } from "react-dom";
import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { MdClear } from "react-icons/md";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";

import { CardGray } from "@components/cards/CardGray";
import { traceDetailsMock } from "@mocks/financialReporting/trace-details/tracedetails.mock";
import { validationMessages } from "@validations/validationMessages";

import { dataTrace } from "./config";
import { StyledContainer, StyledContainerClose } from "./styles";

export interface ITraceDetailsModalProps {
  handleClose: () => void;
  isMobile: boolean;
  portalId?: string;
}

export function TraceDetailsModal(props: ITraceDetailsModalProps) {
  const { handleClose, isMobile, portalId = "portal" } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  const data = traceDetailsMock[0];

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          gap="24px"
          width={isMobile ? "287px" : "402px"}
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text size="small" type="headline">
              {dataTrace.title}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text type="body" size="large">
                  {dataTrace.close}
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
          <Stack direction="column" gap="16px">
            <CardGray
              label={dataTrace.evaluation}
              placeHolder={data.evaluation}
              apparencePlaceHolder="gray"
            />
            <CardGray
              label={dataTrace.description}
              placeHolder={data.description}
              apparencePlaceHolder="gray"
              height="108px"
            />
          </Stack>
          <Stack justifyContent="end" gap="20px">
            <Button onClick={handleClose}>{dataTrace.understood}</Button>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
