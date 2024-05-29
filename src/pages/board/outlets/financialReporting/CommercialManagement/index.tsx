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
import { Stack, Icon, Text, Button, inube } from "@inube/design-system";

import { Fieldset } from "@components/data/Fieldset";
import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";
import { formatISODatetoCustomFormat } from "@utils/formatData/date";
import { currencyFormat } from "@utils/formatData/currency";
import { Requests } from "@services/types";

import { StyledCollapseIcon, StyledIcon, StyledDivider } from "./styles";

interface ComercialManagementProps {
  data: Requests;
  children?: JSX.Element;
}

export const ComercialManagement = (props: ComercialManagementProps) => {
  const { data, children } = props;
  const [collapse, setCollapse] = useState(false);

  const { id } = useParams();

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <Fieldset title="Estado" descriptionTitle="Gestión Comercial">
      <Stack direction="column" gap={inube.spacing.s150}>
        <Stack justifyContent="space-between">
          <Stack direction="column">
            <Stack gap={inube.spacing.s450}>
              <Stack gap={inube.spacing.s050}>
                <Text type="title" size="small" appearance="gray">
                  No. Rad.:
                </Text>
                <Text type="title" size="small">
                  {data.k_Prospe}
                </Text>
              </Stack>
              <Text type="title" size="small" appearance="gray">
                {capitalizeFirstLetter(
                  formatISODatetoCustomFormat(data.f_Prospe)
                )}
              </Text>
            </Stack>
            <Stack gap={inube.spacing.s050}>
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

          <Stack alignItems="center" gap={inube.spacing.s400}>
            <Text type="title">
              {data.nnasocia &&
                capitalizeFirstLetterEachWord(
                  truncateTextToMaxLength(data.nnasocia)
                )}
            </Text>
            <Stack gap={inube.spacing.s200}>
              <Button type="link" path={`/solicitud/${id}/perfil-crediticio`}>
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
          <StyledCollapseIcon $collapse={collapse} onClick={handleCollapse}>
            <Icon
              icon={<MdOutlineChevronRight />}
              appearance="primary"
              size="56px"
              cursorHover
            />
          </StyledCollapseIcon>
        </Stack>
        {collapse && <StyledDivider />}
        {collapse && (
          <Stack direction="column" gap="10px">
            <Stack gap={inube.spacing.s200}>
              <StyledIcon>
                <Icon
                  icon={<MdOutlinePictureAsPdf />}
                  appearance="primary"
                  size="18px"
                  cursorHover
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
              <StyledIcon>
                <Icon
                  icon={<MdOutlineEdit />}
                  appearance="primary"
                  size="18px"
                  cursorHover
                />
              </StyledIcon>
            </Stack>
            <Stack direction="column">{children}</Stack>
          </Stack>
        )}
      </Stack>
    </Fieldset>
  );
};
