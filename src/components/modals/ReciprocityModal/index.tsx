import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";

import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { useMediaQuery } from "@inubekit/hooks";
import { Divider } from "@inubekit/divider";
import { Button } from "@inubekit/button";
import { currencyFormat } from "@src/utils/formatData/currency";

import { StyledContainerClose, StyledContainer } from "./styles";
import { dataReciprocity } from "./config";

export interface ReciprocityModalProps {
  handleClose: () => void;
  portalId?: string;
  balanceOfContributions: number;
  accordingToRegulation: number;
  assignedQuota: number;
}

export function ReciprocityModal(props: ReciprocityModalProps) {
  const {
    portalId,
    handleClose,
    balanceOfContributions,
    accordingToRegulation,
    assignedQuota,
  } = props;

  const isMobile = useMediaQuery("(max-width:880px)");

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          gap="24px"
          width={!isMobile ? "500px" : "287px"}
        >
          <Stack justifyContent="space-between" alignItems="center" gap="15px">
            <Text size="small" type="headline">
              {dataReciprocity.maxReciprocityQuota}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text>{dataReciprocity.close}</Text>
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
          <Stack direction="column" justifyContent="space-between" gap="12px">
            <Stack justifyContent="space-between">
              <Text type="label" size="large" weight="bold">
                {dataReciprocity.contributionsBalance}
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                <Text type="body" size="medium">
                  {currencyFormat(balanceOfContributions, false)}
                </Text>
              </Stack>
            </Stack>
            <Stack justifyContent="space-between">
              <Text type="label" size="large" weight="bold">
                {dataReciprocity.timesPossible}
              </Text>
              <Stack>
                <Text type="body" size="medium">
                  {currencyFormat(accordingToRegulation, false)}
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Stack alignItems="center" direction="column" gap="8px">
            <Text
              appearance="primary"
              weight="bold"
              type="headline"
              size="large"
            >
              ${currencyFormat(assignedQuota, false)}
            </Text>
            <Stack>
              <Text appearance="gray" size="small" textAlign="center">
                {dataReciprocity.assignedQuota}
              </Text>
            </Stack>
          </Stack>
          <Divider />
          <Stack justifyContent="end">
            <Button
              children={dataReciprocity.close}
              appearance="primary"
              onClick={handleClose}
              fullwidth={isMobile}
            />
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
