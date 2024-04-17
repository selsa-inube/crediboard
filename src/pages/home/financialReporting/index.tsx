import { Stack, inube, Text, Grid } from "@inube/design-system";
import { Fieldset } from "@src/components/data/Fieldset";
import { ContainerSections } from "@src/components/layout/ContainerSections";
import { configData } from "@src/components/layout/ContainerSections/config";

const FinancialReportingSections = () => {
  return (
    <Stack direction="column" gap={inube.spacing.s500}>
      <Stack direction="column">
        <Fieldset title="Estado" descriptionTitle="Gestión Comercial">
          <Text></Text>
        </Fieldset>
      </Stack>
      <Grid templateColumns="repeat(2,1fr)" gap="s200" autoRows="auto">
        {configData.map((data) => (
          <Fieldset title={data.title} descriptionTitle={data.descriptionTitle}>
            <Text></Text>
          </Fieldset>
        ))}
      </Grid>
    </Stack>
  );
};

export const FinancialReporting = () => {
  return (
    <Stack direction="column" margin="s250">
      <ContainerSections>
        <FinancialReportingSections />
      </ContainerSections>
    </Stack>
  );
};
