import { Stack, inube, Text, Grid } from "@inube/design-system";

import { configData } from "@components/layout/ContainerSections/config";
import { ContainerSections } from "@components/layout/ContainerSections";
import { Fieldset } from "@components/data/Fieldset";

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
