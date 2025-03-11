import { useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineBeachAccess, MdOutlineShare } from "react-icons/md";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Icon } from "@inubekit/inubekit";
import { Stack } from "@inubekit/inubekit";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";

import { Fieldset } from "@components/data/Fieldset";
import { CreditProspect } from "@pages/prospect/components/CreditProspect";
import { mockEditProspect } from "@mocks/add-prospect/edit-prospect/editprospect.mock";

import { StyledMarginPrint, StyledPrint } from "./styles";
import { dataEditProspect } from "./config";

export function EditProspect() {
  const [showMenu, setShowMenu] = useState(false);

  const isMobile = useMediaQuery("(max-width:880px)");
  const { id } = useParams();

  const data = mockEditProspect[0];

  return (
    <StyledMarginPrint>
    <Stack padding="24px">
      <Stack
        width={isMobile ? "-webkit-fill-available" : "min(100%,1440px)"}
        margin="0 auto"
        direction="column"
        gap="20px"
      >
        <Fieldset>
          <Stack gap="16px" direction="column" padding="4px 16px">
            <Stack justifyContent="space-between" alignItems="center">
              <Stack
                gap={isMobile ? "0" : "8px"}
                direction={isMobile ? "column" : "row"}
              >
                <Text type="title" weight="bold" size="large" appearance="gray">
                  {dataEditProspect.creditProspect}
                </Text>
                <Text type="title" weight="bold" size="large" appearance="gray">
                  #{id}
                </Text>
              </Stack>
              <StyledPrint>
                <Icon
                  icon={<MdOutlineShare />}
                  appearance="primary"
                  size="20px"
                  cursorHover
                />
              </StyledPrint>
            </Stack>
            <Divider dashed />
            <Stack
              justifyContent="space-between"
              alignItems="center"
              direction={isMobile ? "column" : "row"}
              gap="16px"
            >
              <Stack gap="8px" direction="column" alignItems="center">
                <Stack gap="8px">
                  <Icon
                    icon={<MdOutlineBeachAccess />}
                    appearance="dark"
                    size="28px"
                  />
                  <Stack direction="column" alignItems="center" gap="8px">
                    <Text type="title" size="large">
                      {data.choiceDestination}
                    </Text>
                  </Stack>
                </Stack>
                <Text type="body" size="small" appearance="gray">
                  {dataEditProspect.destination}
                </Text>
              </Stack>
              <Stack direction="column" alignItems="center" gap="8px">
                <Text type="title" size="large" textAlign="center">
                  {data.name}
                </Text>
                <Text type="body" size="small" appearance="gray">
                  {data.customer}
                </Text>
              </Stack>
              <Stack direction="column" alignItems="center" gap="8px">
                <Stack gap="8px">
                  <Text
                    type="headline"
                    weight="bold"
                    size="large"
                    appearance="primary"
                  >
                    $
                  </Text>
                  <Text
                    type="headline"
                    weight="bold"
                    size="large"
                    appearance="primary"
                  >
                    {data.value}
                  </Text>
                </Stack>
                <Text type="body" size="small" appearance="gray">
                  {dataEditProspect.value}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Fieldset>
        <Fieldset>
          <CreditProspect
            isMobile={isMobile}
            showMenu={() => setShowMenu(false)}
            showPrint={true}
            isPrint={true}
          />
        </Fieldset>
        <StyledPrint>
          <Stack gap="20px" justifyContent="end">
            <Button appearance="danger" variant="outlined">
              {dataEditProspect.delete}
            </Button>
            <Button>{dataEditProspect.confirm}</Button>
          </Stack>
        </StyledPrint>
      </Stack>
      {showMenu && <Stack></Stack>}
    </Stack>
    </StyledMarginPrint>
  );
}
