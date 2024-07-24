import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MdOutlineChevronRight,
  MdOutlinePhone,
  MdOutlineVideoCameraFront,
  MdOutlinePictureAsPdf,
  MdOutlineSend,
  MdOutlineEdit,
} from "react-icons/md";

import { Icon } from "@inubekit/icon";
import {
  Stack,
  Text,
  Button,
  inube,
  useMediaQuery,
} from "@inube/design-system";

import { Fieldset } from "@components/data/Fieldset";
import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";
//import { generatePDF } from "@utils/pdf/generetePDF";
import { formatISODatetoCustomFormat } from "@utils/formatData/date";
import { currencyFormat } from "@utils/formatData/currency";
import { Requests } from "@services/types";

import { StyledCollapseIcon, StyledIcon, StyledDivider } from "./styles";

interface ComercialManagementProps {
  data: Requests;
  children?: JSX.Element;
  prueba: () => void;
}

export const ComercialManagement = (props: ComercialManagementProps) => {
  const { data, children, prueba } = props;
  const [collapse, setCollapse] = useState(false);

  const [isGeneratingPdf] = useState(false);

  const { id } = useParams();

  const isMobile: boolean = useMediaQuery("(max-width: 720px)");

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <Fieldset title="Estado" descriptionTitle="Gestión Comercial">
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
                  Ver perfil créditicio
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
                    disabled={isGeneratingPdf}
                    cursorHover
                    onClick={prueba}
                  />
                </StyledIcon>
                <StyledIcon>
                  <Icon
                    icon={<MdOutlineSend />}
                    appearance="primary"
                    size="18px"
                    cursorHover
                  />
                </StyledIcon>
                sss
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
