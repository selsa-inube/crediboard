import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, inube, Grid, useMediaQuery } from "@inube/design-system";

import { ContainerSections } from "@components/layout/ContainerSections";
import { getById } from "@mocks/utils/dataMock.service";
import { ComercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement";
import { dataAccordeon } from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import { DataCommercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement/TableCommercialManagement";
import { ErrorAlert } from "@components/ErrorAlert";
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
  const [visibleError, setvisibleError] = useState(false);
  const { id } = useParams();

  const isMobile: boolean = useMediaQuery("(max-width: 720px)");

  useEffect(() => {
    getById("k_Prospe", "requests", id!).then((requirement) => {
      const simulatedRequirement = { ...requirement, hasError: true };
      setData(simulatedRequirement);
      if (simulatedRequirement.hasError) {
        setvisibleError(true);
      }
    });
  }, [id]);

  const handleCloseErrorAlert = () => {
    setvisibleError(false);
  };

  return (
    <Stack direction="column" margin={!isMobile ? "s250 s500" : "s250"}>
      <ContainerSections>
      <Stack direction="column" margin={isMobile ? "s300" : "0"}>
          {visibleError && (
            <ErrorAlert
              message="Existe un error sin evaluar"
              onClose={handleCloseErrorAlert}
              top={!isMobile ? "58px" : "110px"}
              left="50%"
              showError={visibleError}
            />
          )}
        </Stack>
        <Stack direction="column" gap={inube.spacing.s250}>
          <Stack direction="column">
            <ComercialManagement
              data={data}
              children={
                <DataCommercialManagement dataAccordeon={dataAccordeon} />
              }
            />
          </Stack>
          <Grid
            templateColumns={!isMobile ? "repeat(2,1fr)" : "1fr"}
            gap="s200"
            autoRows="auto"
          >
            <Stack direction="column">
              {<ToDo icon={infoIcon} data={data} isMobile={isMobile} />}
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
