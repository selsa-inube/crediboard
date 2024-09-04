import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MdOutlineAdd,
  MdOutlineChevronRight,
  MdOutlineMoreVert,
  MdOutlinePhone,
  MdOutlinePictureAsPdf,
  MdOutlineShare,
  MdOutlineVideoCameraFront,
} from "react-icons/md";

import { Icon } from "@inubekit/icon";
import { inube, useMediaQuery } from "@inube/design-system";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { Fieldset } from "@components/data/Fieldset";
import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";
import { formatISODatetoCustomFormat } from "@utils/formatData/date";
import { currencyFormat } from "@utils/formatData/currency";
import { Requests } from "@services/types";

import { StyledCollapseIcon, StyledIcon, StyledDivider, StyledFieldset, StyledVerticalDivider } from "./styles";

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
      <StyledFieldset>
      <Stack direction="column" gap={inube.spacing.s150}>
        <Stack justifyContent="space-between" alignItems="center">
          <Stack direction="column">
            <Stack>
              <Stack gap={inube.spacing.s075} width="max-content">
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
                  padding={`${inube.spacing.s0} ${inube.spacing.s0} ${inube.spacing.s0} ${inube.spacing.s100}`}
                >
                  {capitalizeFirstLetter(
                    formatISODatetoCustomFormat(data.f_Prospe)
                  )}
                </Text>
              </Stack>
            </Stack>
            {isMobile && (
              <Stack margin={ `${inube.spacing.s050} ${inube.spacing.s0}` }>
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
            <Stack gap={inube.spacing.s050}>
              <Text type="title" size="small" appearance="gray">
                Valor:
              </Text>
              <Text type="title" size="small">
                {data.v_Monto === 0 ? "$ 0" : currencyFormat(data.v_Monto)}
              </Text>
            </Stack>
          </Stack>

          {!isMobile && (
            <Stack alignItems="center" gap={inube.spacing.s400}>
              <Text type="title">
                {data.nnasocia &&
                  capitalizeFirstLetterEachWord(
                    truncateTextToMaxLength(data.nnasocia)
                  )}
              </Text>
              <Stack gap={inube.spacing.s200}>
                <Button
                  type="link"
                  path={`/extended-card/${id}/credit-profile`}
                >
                  Ver perfil crediticio
                </Button>
                <StyledIcon>
                  <Icon
                    icon={<MdOutlinePhone />}
                    appearance="primary"
                    size="18px"
                    cursorHover
                  />
                </StyledIcon>
                <StyledIcon>
                  <Icon
                    icon={<MdOutlineVideoCameraFront />}
                    appearance="primary"
                    size="18px"
                    cursorHover
                  />
                </StyledIcon>
              </Stack>
            </Stack>
          )}
          <StyledCollapseIcon $collapse={collapse} onClick={handleCollapse}>
            <Icon
              icon={<MdOutlineChevronRight />}
              appearance="primary"
              size={isMobile ? "32px" : "56px"}
              cursorHover
            />
          </StyledCollapseIcon>
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
          <Stack direction="column" gap={inube.spacing.s300}>
            {!isMobile && (
              <Stack gap={inube.spacing.s300} justifyContent="end" alignItems="center">
                <Button
                  type="button"
                  appearance="primary"
                  spacing="compact"
                  variant="filled"
                  iconBefore={<Icon
                    icon={<MdOutlineAdd />}
                    appearance="light"
                    size="18px"
                    spacing="compact"
                  />}
                >
                  Agregar producto
                </Button>
                <StyledVerticalDivider />
                <Stack gap={inube.spacing.s100}>                
                  <Icon
                    icon={<MdOutlinePictureAsPdf />}
                    appearance="primary"
                    size="24px"
                    disabled={isPrint}
                    cursorHover
                    onClick={print}
                  />
                  <Icon
                    icon={<MdOutlineShare />}
                    appearance="primary"
                    size="24px"
                    cursorHover
                  />
                  <Icon
                    icon={<MdOutlineMoreVert />}
                    appearance="primary"
                    size="24px"
                    cursorHover
                  />
                </Stack>
              </Stack>
            )}
            <Stack direction="column" >
              {children}
            </Stack>
          </Stack>
        )}
      </Stack>
      </StyledFieldset>
    </Fieldset>
  );
};
