import { useState } from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";

import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { Tabs } from "@inubekit/tabs";
import { Button } from "@inubekit/button";
import { Fieldset } from "@components/data/Fieldset";
import { validationMessages } from "@validations/validationMessages";

import { dataDisbursement, dataTabs } from "./config";
import { StyledContainer, StyledContainerClose } from "./styles";
import { DisbursementInternal } from "./Internal";
import { DisbursementExternal } from "./External";
import { DisbursementCheckEntity } from "./CheckEntity";
import { DisbursementChequeManagement } from "./ChequeManagement";
import { DisbursementCash } from "./Cash";

export interface IDisbursementModalProps {
  isMobile: boolean;
  handleClose: () => void;
  portalId?: string;
}

export function DisbursementModal(
  props: IDisbursementModalProps
): JSX.Element | null {
  const { isMobile, handleClose, portalId } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  const [currentTab, setCurrentTab] = useState(dataTabs[0].id);
  const onChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          gap="16px"
          padding="24px"
          width={isMobile ? "300px" : "700px"}
          height="700px"
        >
          <Stack
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Text type="headline" size="small">
              {dataDisbursement.title}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack>
                <Text type="body" size="large">
                  {dataDisbursement.close}
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
          <Stack>
            <Tabs
              scroll={isMobile}
              selectedTab={currentTab}
              tabs={dataTabs}
              onChange={onChange}
            />
          </Stack>
          <Fieldset heightFieldset="469px">
            <>
              {currentTab === "Internal" && <DisbursementInternal />}
              {currentTab === "External" && <DisbursementExternal />}
              {currentTab === "CheckEntity" && <DisbursementCheckEntity />}
              {currentTab === "ChequeManagement" && (
                <DisbursementChequeManagement />
              )}
              {currentTab === "Cash" && <DisbursementCash />}
            </>
          </Fieldset>
          <Divider />
          <Stack justifyContent="end">
            <Button onClick={handleClose}>{dataDisbursement.close}</Button>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
