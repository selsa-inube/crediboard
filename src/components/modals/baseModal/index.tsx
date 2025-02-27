import { createPortal } from "react-dom";
import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { MdClear } from "react-icons/md";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";

import { validationMessages } from "@validations/validationMessages";

import { StyledContainer, StyledContainerClose } from "./styles";
import { dataBaseModal } from "./config";

export interface IBaseModalProps {
  handleNext: () => void;
  title: string;
  nextButton: string;
  children: JSX.Element | JSX.Element[];
  handleBack?: () => void;
  width?: string;
  height?: string;
  disabledNext?: boolean;
  iconBeforeNext?: React.JSX.Element;
  iconAfterNext?: React.JSX.Element;
  backButton?: string;
  finalDivider?: boolean;
  portalId?: string;
}

export function BaseModal(props: IBaseModalProps) {
  const {
    handleNext,
    title,
    nextButton,
    children,
    handleBack,
    width,
    height,
    disabledNext,
    iconBeforeNext,
    iconAfterNext,
    backButton,
    finalDivider,
    portalId = "portal",
  } = props;

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
          width={width}
          height={height}
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text size="small" type="headline">
              {title}
            </Text>
            <StyledContainerClose onClick={handleBack}>
              <Stack alignItems="center" gap="8px">
                <Text type="body" size="large">
                  {dataBaseModal.close}
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
          <Stack direction="column">{children}</Stack>
          {finalDivider && <Divider />}
          <Stack justifyContent="end" gap="20px">
            {backButton && (
              <Button onClick={handleBack} variant="outlined" appearance="gray">
                {backButton}
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={disabledNext}
              iconAfter={iconAfterNext}
              iconBefore={iconBeforeNext}
            >
              {nextButton}
            </Button>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
