import { Stack, inube, Text, Grid } from "@inube/design-system";

import { ContainerSections } from "@components/layout/ContainerSections";
import { Fieldset } from "@components/data/Fieldset";

export interface IFinancialReportingProps {
  toDo?: JSX.Element | JSX.Element[];
  requirements?: JSX.Element | JSX.Element[];
  promissoryNotes?: JSX.Element | JSX.Element[];
  approvals?: JSX.Element | JSX.Element[];
  management?: JSX.Element | JSX.Element[];
  postingVouchers?: JSX.Element | JSX.Element[];
}

export const FinancialReporting = (props: IFinancialReportingProps) => {
  const {
    toDo,
    requirements,
    promissoryNotes,
    approvals,
    management,
    postingVouchers,
  } = props;
  return (
    <Stack direction="column" margin="s250">
      <ContainerSections>
        <Stack direction="column" gap={inube.spacing.s250}>
          <Stack direction="column">
            <Fieldset title="Estado" descriptionTitle="Gestión Comercial">
              <Text></Text>
            </Fieldset>
          </Stack>
          <Grid templateColumns="repeat(2,1fr)" gap="s200" autoRows="auto">
            <Stack direction="column">{toDo}</Stack>
            <Stack direction="column">{approvals}</Stack>
            <Stack direction="column">{requirements}</Stack>
            <Stack direction="column">{management}</Stack>
            <Stack direction="column">{promissoryNotes}</Stack>
            <Stack direction="column">{postingVouchers}</Stack>
          </Grid>
        </Stack>
      </ContainerSections>
    </Stack>
  );
};
