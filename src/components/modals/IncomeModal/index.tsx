import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { Blanket } from "@inubekit/blanket";
import { useFlag } from "@inubekit/flag";

import { SourceIncome } from "@pages/prospect/components/SourceIncome";
import { validationMessages } from "@validations/validationMessages";

import { StyledContainer, StyledContainerClose } from "./styles";
import { dataIncomeModal } from "./config";

interface IncomeModalProps {
  handleClose: () => void;
  portalId?: string;
}

export function IncomeModal(props: IncomeModalProps) {
  const { handleClose, portalId } = props;

  const isMobile = useMediaQuery("(max-width:880px)");

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }
  const { addFlag } = useFlag();

  const handleSubmit = () => {
    handleClose();
    addFlag({
      title: `${dataIncomeModal.flagTittle}`,
      description: `${dataIncomeModal.flagDescription}`,
      appearance: "success",
      duration: 5000,
    });
  };

  return createPortal(
    <Blanket>
      <StyledContainer $smallScreen={isMobile}>
        <Stack
          direction="column"
          padding="16px 24px"
          gap="16px"
          width={isMobile ? "auto" : "1002px"}
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text size="small" type="headline">
              {dataIncomeModal.title}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text>{dataIncomeModal.close}</Text>
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
          <SourceIncome ShowSupport={false} />
          <Divider />
          <Stack
            padding="10px 0px"
            justifyContent="end"
            alignItems={!isMobile ? "end" : "end"}
            direction={!isMobile ? "row" : "column"}
            gap="20px"
          >
            <Stack
              justifyContent="end"
              gap="15px"
              margin={!isMobile ? "none" : "15px 0px"}
              width={!isMobile ? "auto" : "100%"}
            >
              <Button
                children="Cerrar"
                appearance="gray"
                variant="outlined"
                onClick={handleClose}
              />
              <Button children="Guardar" onClick={handleSubmit} />
            </Stack>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}

export type { IncomeModalProps };
