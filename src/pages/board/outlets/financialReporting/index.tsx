import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineThumbUp } from "react-icons/md";
import { Stack, inube, Grid, useMediaQuery } from "@inube/design-system";
import { Flag } from "@inubekit/flag";

import { ContainerSections } from "@components/layout/ContainerSections";
import { getById } from "@mocks/utils/dataMock.service";
import { ComercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement";
import { dataAccordeon } from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import { DataCommercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement/TableCommercialManagement";
import { Requests } from "@services/types";
import { TextAreaModal } from "@components/modals/TextAreaModal";

import { ToDo } from "./ToDo";
import { infoIcon } from "./ToDo/config";
import { StyledMessageContainer } from "./styles";
import { handleConfirmCancel } from "./config"; 

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
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagMessage, setFlagMessage] = useState({
    title: "",
    description: "",
    appearance: "success" as "success" | "danger",
  });

  const { id } = useParams();
  const isMobile: boolean = useMediaQuery("(max-width: 820px)");

  useEffect(() => {
    getById("k_Prospe", "requests", id!).then((requirement) => {
      setData(requirement);
    });
  }, [id]);

  return (
    <Stack direction="column" margin={!isMobile ? "s250 s500" : "s250"}>
      <ContainerSections
        isMobile={isMobile}
      >
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
      {showCancelModal && (
        <TextAreaModal
          title="Anular"
          buttonText="Confirmar"
          inputLabel="Motivo de la anulación."
          inputPlaceholder="Describa el motivo de la anulación."
          onCloseModal={() => setShowCancelModal(false)}
          onSubmit={(values) => handleConfirmCancel(
            values,
            setFlagMessage,
            setShowFlagMessage,
            setShowCancelModal
          )}
        />
      )}
      {showFlagMessage && (
        <StyledMessageContainer>
          <Flag
            title={flagMessage.title}
            description={flagMessage.description}
            appearance={flagMessage.appearance}
            icon={<MdOutlineThumbUp />}
            duration={5000}
            isMessageResponsive={false}
            closeFlag={() => setShowFlagMessage(false)}
          />
        </StyledMessageContainer>
      )}
    </Stack>
  );
};
