import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MdOutlineChevronRight,
  MdOutlinePhone,
  MdOutlineVideocam,
  MdOutlinePictureAsPdf,
  MdOutlineShare,
  MdOutlineEdit,
} from "react-icons/md";

import { Icon } from "@inubekit/icon";
import { Text, inube, useMediaQuery } from "@inube/design-system";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";

import { Fieldset } from "@components/data/Fieldset";
import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";
import { formatISODatetoCustomFormat } from "@utils/formatData/date";
import { currencyFormat } from "@utils/formatData/currency";
import { Requests } from "@services/types";

import {
  StyledCollapseIcon,
  StyledIcon,
  StyledDivider,
  StyledHorizontalDivider,
} from "./styles";

interface ComercialManagementProps {
  data: Requests;
  children?: JSX.Element;
  print: () => void;
  isPrint?: boolean;
}

export const ComercialManagement = (props: ComercialManagementProps) => {
  const { data, children, print, isPrint } = props;
  const [collapse, setCollapse] = useState(false);

  const { id } = useParams();

  const isMobile: boolean = useMediaQuery("(max-width: 720px)");

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <Fieldset title="Estado" descriptionTitle="Gestión Comercial">
      <Stack direction="column" gap="12px">
        <Stack justifyContent="space-between" alignItems="center">
          <Stack direction="column">
            <Stack>
              <Stack gap="6px" width="max-content">
                <Text type="title" size="small" appearance="gray">
                  No. Rad.:
                </Text>
                <Text type="title" size="small">
                  {data.k_Prospe}
                </Text>
                <Text
                  type="title"
                  size="small"
                  appearance="gray"
                  padding="0px 0px 0px 8px"
                >
                  {capitalizeFirstLetter(
                    formatISODatetoCustomFormat(data.f_Prospe)
                  )}
                </Text>
              </Stack>
            </Stack>
            {isMobile && (
              <Stack margin="s050 s0">
                <Text type="title" size={!isMobile ? "large" : "medium"}>
                  {data.nnasocia &&
                    capitalizeFirstLetterEachWord(
                      truncateTextToMaxLength(data.nnasocia)
                    )}
                </Text>
              </Stack>
            )}
            <Stack gap={!isMobile ? inube.spacing.s050 : "4px"}>
              <Text type="title" size="small" appearance="gray">
                Destino:
              </Text>
              <Text type="title" size="small">
                {data.nnasocia &&
                  capitalizeFirstLetter(
                    truncateTextToMaxLength(data.k_Desdin, 60)
                  )}
              </Text>
            </Stack>
            <Stack gap="4px">
              <Text type="title" size="small" appearance="gray">
                Valor:
              </Text>
              <Text type="title" size="small">
                {data.v_Monto === 0 ? "$ 0" : currencyFormat(data.v_Monto)}
              </Text>
            </Stack>
          </Stack>

          {!isMobile && (
            <Stack gap="36px">
              <Text type="title">
                {data.nnasocia &&
                  capitalizeFirstLetterEachWord(
                    truncateTextToMaxLength(data.nnasocia)
                  )}
              </Text>
            </Stack>
          )}
          <Stack gap="2px">
            {!isMobile && (
              <>
                <Button
                  type="link"
                  spacing="compact"
                  path={`/extended-card/${id}/credit-profile`}
                >
                  Ver perfil crediticio
                </Button>
                <StyledHorizontalDivider />
                <Icon
                  icon={<MdOutlinePhone />}
                  appearance="primary"
                  size="24px"
                  cursorHover
                />
                <Icon
                  icon={<MdOutlineVideocam />}
                  appearance="primary"
                  size="24px"
                  cursorHover
                />
                <StyledHorizontalDivider />
              </>
            )}
            <StyledCollapseIcon $collapse={collapse} onClick={handleCollapse}>
              <Icon
                icon={<MdOutlineChevronRight />}
                appearance="primary"
                size={isMobile ? "32px" : "24px"}
                cursorHover
              />
            </StyledCollapseIcon>
          </Stack>
        </Stack>
        {isMobile && (
          <Button
            type="link"
            path={`/extended-card/${id}/credit-profile`}
            fullwidth
          >
            Ver perfil crediticio
          </Button>
        )}
        {collapse && <StyledDivider />}
        {collapse && (
          <Stack direction="column" gap="10px">
            {!isMobile && (
              <Stack gap={inube.spacing.s200}>
                <StyledIcon>
                  <Icon
                    icon={<MdOutlinePictureAsPdf />}
                    appearance="primary"
                    size="18px"
                    disabled={isPrint}
                    cursorHover
                    onClick={print}
                  />
                </StyledIcon>
                <StyledIcon>
                  <Icon
                    icon={<MdOutlineShare />}
                    appearance="primary"
                    size="18px"
                    cursorHover
                  />
                </StyledIcon>

                <StyledIcon>
                  <Icon
                    icon={<MdOutlineEdit />}
                    appearance="primary"
                    size="18px"
                    cursorHover
                  />
                </StyledIcon>
              </Stack>
            )}
            <Stack direction="column" width="fit-content">
              {children}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Fieldset>
  );
};
