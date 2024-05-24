import { useState } from "react";
import {
  MdOutlineChevronRight,
  MdOutlinePhone,
  MdOutlineVideoCameraFront,
  MdOutlinePictureAsPdf,
  MdOutlineSend,
  MdOutlineEdit,
} from "react-icons/md";

import { Fieldset } from "@components/data/Fieldset";
import { Stack, Icon, Text, Button, inube } from "@inube/design-system";
import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";
import { formatISODatetoCustomFormat } from "@utils/formatData/date";
import { currencyFormat } from "@utils/formatData/currency";

import { StyledCollapseIcon, StyledIcon, StyledDivider } from "./styles";

interface ComercialManagementProps {
  name: string;
  rad: string;
  date: string;
  destination: string;
  value: number;
}

export const ComercialManagement = (props: ComercialManagementProps) => {
  const { name, rad, date, destination, value } = props;
  const [collapse, setCollapse] = useState(false);

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
                  {rad}
                </Text>
              </Stack>
              <Text type="title" size="small" appearance="gray">
                {capitalizeFirstLetter(formatISODatetoCustomFormat(date))}
              </Text>
            </Stack>
            <Stack gap={inube.spacing.s050}>
              <Text type="title" size="small" appearance="gray">
                Destino:
              </Text>
              <Text type="title" size="small">
                {capitalizeFirstLetter(
                  truncateTextToMaxLength(destination, 60)
                )}
              </Text>
            </Stack>
            <Stack gap={inube.spacing.s050}>
              <Text type="title" size="small" appearance="gray">
                Valor:
              </Text>
              <Text type="title" size="small">
                {value === 0 ? "$ 0" : currencyFormat(value)}
              </Text>
            </Stack>
          </Stack>

          <Stack alignItems="center" gap={inube.spacing.s400}>
            <Text type="title">{capitalizeFirstLetterEachWord(name)}</Text>
            <Stack gap={inube.spacing.s200}>
              <Button>Ver perfil créditicio</Button>
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
          <Stack>
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
          </Stack>
        )}
      </Stack>
    </Fieldset>
  );
};
