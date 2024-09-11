import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { useMediaQuery } from "@inubekit/hooks";
import { Grid } from "@inubekit/grid";
import { Button } from "@inubekit/button";

import { MdClear, MdOutlineRemoveRedEye } from "react-icons/md";

import { IncomeEmployment } from "./IncomeEmployment";
import { ProfessionalServices } from "./ProfessionalServices";
import { IncomeCapital } from "./IncomeCapital";
import { MicroBusinesses } from "./MicroBusinesses";
import { StyledContainer, StyledTextField } from "./styles";
import { Icon } from "@inubekit/icon";
import { Select } from "@inubekit/select";

interface SourcesModalProps {
  title: string;
  labels: string[];
  placeholders: string[];
}

interface IncomeModalProps {
  form: { name: string };
  onChange: (name: string, newValue: string) => void;
  options: { id: string; label: string; value: string }[];
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
            children="Ver soporte"
            spacing="compact"
            iconAfter={<MdOutlineRemoveRedEye />}
            variant="none"
            onClick={() => console.log("Ver soporte")}
            cursorHover
          />
        </Stack>
      </Stack>
    </StyledContainer>
  );
}

export function IncomeModal (props: IncomeModalProps) {
  const { form, onChange, options } = props

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
        alignItems={!isMobile ? "end" : "start"}
        direction={!isMobile ? "row" : "column"}
      >
          <Stack justifyContent="space-between" width={!isMobile ? "50%" : "100%"} gap="15px" direction={!isMobile ? "row" : "column"}>
            <Select
              id="income"
              name="deudor"
              label="Deudor"
              placeholder="Seleccione una opción"
              options={options}
              value={form.name}
              onChange={(value) => onChange("name", value)}
              size="compact"
              fullwidth
            />
            <Textfield
              id="field1"
              label="Total ingresos mensuales"
              placeholder="$0"
              size="compact"
              fullwidth
            />
          </Stack>
          <Stack justifyContent="end" gap="15px" margin={!isMobile ? "none" : "15px 0px"} width={!isMobile ? "auto" : "100%"}>
            <Button children="Cerrar" appearance="light"/>
            <Button children="Guardar" appearance="light"/>
          </Stack>
      </Stack>
    </Stack>
  );
};
