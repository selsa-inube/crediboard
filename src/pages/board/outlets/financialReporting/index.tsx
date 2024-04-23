import { Stack, inube, Text, Grid, useMediaQuery } from "@inube/design-system";

import { ContainerSections } from "@components/layout/ContainerSections";
import { Fieldset } from "@components/data/Fieldset";

export interface IFinancialReportingProps {
  children?: JSX.Element | JSX.Element[];
}

export const FinancialReporting = (props: IFinancialReportingProps) => {
  const { children } = props;
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Stack direction="column" margin="s250">
      <ContainerSections>
        <Stack direction="column" gap={inube.spacing.s500}>
          <Stack direction="column">
            <Fieldset title="Estado" descriptionTitle="Gestión Comercial">
              <Text></Text>
            </Fieldset>
          </Stack>
          <Grid
            templateColumns={isMobile ? "1fr" : "repeat(2,1fr)"}
            gap="s200"
            autoRows="auto"
          >
            {children}
          </Grid>
        </Stack>
      </ContainerSections>
    </Stack>
  );
};
