import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, inube, Grid } from "@inube/design-system";

import { ContainerSections } from "@components/layout/ContainerSections";
import { getById } from "@mocks/utils/dataMock.service";
import { ComercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement";
import { dataAccordeon } from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import { DataCommercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement/TableCommercialManagement";
import { Requests } from "@services/types";

import { ToDo } from "./ToDo";
import { infoIcon } from "./ToDo/config";

export interface IFinancialReportingProps {
  requirements?: JSX.Element | JSX.Element[];
  promissoryNotes?: JSX.Element | JSX.Element[];
  approvals?: JSX.Element | JSX.Element[];
  management?: JSX.Element | JSX.Element[];
  postingVouchers?: JSX.Element | JSX.Element[];
}

export const FinancialReporting = (props: IFinancialReportingProps) => {
  const {
    requirements,
    promissoryNotes,
    approvals,
    management,
    postingVouchers,
  } = props;

  const [data, setData] = useState({} as Requests);

  const { id } = useParams();

  useEffect(() => {
    getById("k_Prospe", "requests", id!).then((requirement) => {
      setData(requirement);
    });
  }, [id]);

  return (
    <Stack direction="column" margin="s250" padding="s0 s200">
      <ContainerSections>
        <Stack direction="column" gap={inube.spacing.s250}>
          <Stack direction="column">
            <Stack direction="column">
              <ComercialManagement
                data={data}
                children={
                  <DataCommercialManagement dataAccordeon={dataAccordeon} />
                }
              />
            </Stack>
          </Stack>
          <Grid templateColumns="repeat(2,1fr)" gap="s200" autoRows="auto">
            <Stack direction="column">
              {<ToDo icon={infoIcon} data={data} />}
            </Stack>
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
