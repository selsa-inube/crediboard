import { Stack, inube, Grid } from "@inube/design-system";

import { ContainerSections } from "@components/layout/ContainerSections";
import { ComercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement";

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
            <Stack direction="column">
              <ComercialManagement
                name="juan sebastian moralez garcía"
                rad="100000012"
                date="2023-09-30T00:00:00-05:00"
                destination="Educación de Postgrado a menos de tres meses"
                value={10000000}
              />
            </Stack>
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
