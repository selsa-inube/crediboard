import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { useMediaQuery } from "@inubekit/hooks";
import { Grid } from "@inubekit/grid";
import { Button } from "@inubekit/button";

import { MdCheck, MdClear, MdOutlineCloudUpload } from "react-icons/md";

import { IncomeEmployment } from "./IncomeEmployment";
import { ProfessionalServices } from "./ProfessionalServices";
import { IncomeCapital } from "./IncomeCapital";
import { MicroBusinesses } from "./MicroBusinesses";
import { StyledContainer, StyledTextField } from "./styles";
import { Icon } from "@inubekit/icon";

export interface SourcesModalProps {
  title: string;
  labels: string[];
  placeholders: string[];
}

export function Sources(props: SourcesModalProps) {
  const { title, labels, placeholders } = props;

  return (
    <StyledContainer>
      <Stack direction="column" padding="20px" height="319px">
        <Text size="medium" type="title" margin="5px 0px">
          {title}
        </Text>
        <Divider />
        <Stack direction="column" margin="20px 0px 0px 0px">
          {labels.map((label, index) => (
            <StyledTextField key={index}>
              <Textfield
                id={`field${index}`}
                label={label}
                placeholder={placeholders[index]}
                size="compact"
                fullwidth
              />
            </StyledTextField>
          ))}
        </Stack>
        <Stack justifyContent="end" margin="auto 0px 0px 0px">
          <Button
            children="Adjuntar soporte"
            spacing="compact"
            iconAfter={<MdOutlineCloudUpload />}
            variant="none"
            onClick={() => console.log("Adjuntar soporte")}
            cursorHover
          />
        </Stack>
      </Stack>
    </StyledContainer>
  );
}

export const IncomeModal = () => {
  const isMobile = useMediaQuery("(max-width:880px)");

  return (
    <Stack direction="column">
      <Stack justifyContent="space-between" alignItems="center">
        <Text size="small" margin="10px 0px" type="headline">
          Fuentes de ingreso
        </Text>
        <Stack alignItems="center">
          <Text>Cerrar</Text>
          <Icon icon={<MdClear />} size="24px" cursorHover appearance="dark" />
        </Stack>
      </Stack>
      <Divider />
      <Stack margin="20px 0px" direction="column">
        <Grid
          templateColumns={!isMobile ? "repeat(2,1fr)" : "1fr"}
          gap="20px"
          autoRows="auto"
        >
          <IncomeEmployment />
          <ProfessionalServices />
          <IncomeCapital />
          <MicroBusinesses />
        </Grid>
      </Stack>
      <Divider />
      <Stack
        margin="20px 0px 0px 0px"
        justifyContent="space-between"
        alignItems="end"
      >
        <Textfield
          id="field1"
          label="Total ingresos mensuales"
          placeholder="$0"
          size="compact"
        />
        <Button children="Continuar" iconAfter={<MdCheck />} />
      </Stack>
    </Stack>
  );
};
