import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineBeachAccess, MdOutlineShare } from "react-icons/md";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { Fieldset } from "@components/data/Fieldset";

import { CreditProspect } from "../board/outlets/financialReporting/CommercialManagement/creditProspect";
import { CardCommercialManagement } from "../board/outlets/financialReporting/CommercialManagement/CardCommercialManagement";

export function EditProspect() {
  const [showMenu, setShowMenu] = useState(false);
  const dataCommercialManagementRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width:880px)");
  const { id } = useParams();

  return (
    <Stack
      width={isMobile ? "-webkit-fill-available" : "min(100%,1440px)"}
      margin="0 auto"
      direction="column"
      gap="20px"
      padding="20px 0px"
    >
      <Fieldset>
        <Stack gap="16px" direction="column" padding="4px 16px">
          <Stack justifyContent="space-between" alignItems="center">
            <Stack gap="8px">
              <Text type="title" weight="bold" size="large" appearance="gray">
                Prospecto de crédito
              </Text>
              <Text type="title" weight="bold" size="large">
                #{id}
              </Text>
            </Stack>
            <Icon
              icon={<MdOutlineShare />}
              appearance="primary"
              size="20px"
              cursorHover
            />
          </Stack>
          <Divider dashed />
          <Stack justifyContent="space-between" alignItems="center">
            <Stack gap="8px">
              <Icon
                icon={<MdOutlineBeachAccess />}
                appearance="dark"
                size="28px"
              />
              <Stack direction="column" alignItems="center" gap="8px">
                <Text type="title" size="large">
                  Vacaciones
                </Text>
                <Text type="body" size="small" appearance="gray">
                  Destino
                </Text>
              </Stack>
            </Stack>
            <Stack direction="column" alignItems="center" gap="8px">
              <Text type="title" size="large">
                Camilo Alberto Rincón Jaramillo
              </Text>
              <Text type="body" size="small" appearance="gray">
                Cliente
              </Text>
            </Stack>
            <Stack direction="column" alignItems="center" gap="8px">
              <Text
                type="headline"
                weight="bold"
                size="large"
                appearance="primary"
              >
                $ 10.000.000
              </Text>
              <Text type="body" size="small" appearance="gray">
                Valor solicitado/giro
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Fieldset>
      <Fieldset>
        <CreditProspect
          isMobile={isMobile}
          showMenu={() => setShowMenu(false)}
          children={
            <CardCommercialManagement
              id={id!}
              dataRef={dataCommercialManagementRef}
            />
          }
        />
      </Fieldset>
      {showMenu && <Stack></Stack>}
    </Stack>
  );
}
