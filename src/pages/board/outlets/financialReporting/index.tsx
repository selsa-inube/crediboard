import { Stack, inube, Text, Grid } from "@inube/design-system";

import { ContainerSections } from "@components/layout/ContainerSections";
import { Fieldset } from "@components/data/Fieldset";

export interface IFinancialReportingSectionsProps {
  children?: JSX.Element | JSX.Element[];
}

const FinancialReportingSections = (
  props: IFinancialReportingSectionsProps
) => {
  const { children } = props;
  return (
    <Stack direction="column" gap={inube.spacing.s500}>
      <Stack direction="column">
        <Fieldset title="Estado" descriptionTitle="Gestión Comercial">
          <Text></Text>
        </Fieldset>
      </Stack>
      <Grid templateColumns="repeat(2,1fr)" gap="s200" autoRows="auto">
        {children}
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
