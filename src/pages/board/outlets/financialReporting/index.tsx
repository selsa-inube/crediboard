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
        <Stack direction="column" gap={inube.spacing.s500}>
          <Stack direction="column">
            <Fieldset title="Estado" descriptionTitle="Gestión Comercial">
              <Text></Text>
            </Fieldset>
          </Stack>
          <Grid templateColumns="repeat(2,1fr)" gap="s200" autoRows="auto">
            {toDo && <Stack direction="column">{toDo}</Stack>}
            {approvals && <Stack direction="column">{approvals}</Stack>}
            {requirements && <Stack direction="column">{requirements}</Stack>}
            {management && <Stack direction="column">{management}</Stack>}
            {promissoryNotes && (
              <Stack direction="column">{promissoryNotes}</Stack>
            )}
            {postingVouchers && (
              <Stack direction="column">{postingVouchers}</Stack>
            )}
          </Grid>
        </Stack>
      </ContainerSections>
    </Stack>
  );
};
