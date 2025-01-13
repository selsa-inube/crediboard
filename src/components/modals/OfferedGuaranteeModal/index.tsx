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

import { CardBorrower } from "@components/cards/CardBorrower";
import { mockGuaranteeBorrower } from "@mocks/guarantee/offeredguarantee.mock";

import { Mortgage } from "./Mortgage";
import { Pledge } from "./Pledge";
import { Bail } from "./bail";
import { dataGuarantee, dataTabs } from "./config";
import {
  ScrollableContainer,
  StyledContainer,
  StyledContainerClose,
} from "./styles";

export interface IOfferedGuaranteeModalProps {
  isMobile: boolean;
  handleClose: () => void;
  portalId?: string;
}

export function OfferedGuaranteeModal(props: IOfferedGuaranteeModalProps) {
  const { isMobile, handleClose, portalId } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
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
          width={isMobile ? "300px" : "620px"}
          height="536px"
        >
          <Stack>
            <Stack
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Text type="headline" size="small">
                {dataGuarantee.title}
              </Text>
              <StyledContainerClose onClick={handleClose}>
                <Stack>
                  <Text type="body" size="large">
                    {dataGuarantee.close}
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
          {currentTab === "borrower" && (
            <ScrollableContainer>
              {mockGuaranteeBorrower.map((borrower, index) => (
                <Stack justifyContent="center" margin="8px 0px">
                  <CardBorrower
                    key={index}
                    title={`${dataGuarantee.borrower} ${index + 1}`}
                    name={borrower.name}
                    lastName={borrower.lastName}
                    email={borrower.email}
                    income={borrower.income}
                    obligations={borrower.obligations}
                    showIcons={false}
                  />
                </Stack>
              ))}
            </ScrollableContainer>
          )}
          {currentTab === "mortgage" && <Mortgage isMobile={isMobile} />}
          {currentTab === "pledge" && <Pledge isMobile={isMobile} />}
          {currentTab === "bail" && <Bail />}
          <Divider />
          <Stack justifyContent="end">
            <Button onClick={handleClose}>{dataGuarantee.close}</Button>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
