import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MdDeleteOutline,
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
} from "react-icons/md";
import { Text, inube, Grid, useMediaQuery } from "@inube/design-system";
import { Icon } from "@inubekit/icon";
import { Flag } from "@inubekit/flag";
import { Stack } from "@inubekit/stack";

import { ContainerSections } from "@components/layout/ContainerSections";
import { Listmodal } from "@components/modals/Listmodal";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { ComercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement";
import { dataAccordeon } from "@pages/board/outlets/financialReporting/CommercialManagement/config/config";
import { DataCommercialManagement } from "@pages/board/outlets/financialReporting/CommercialManagement/TableCommercialManagement";
import { getById } from "@mocks/utils/dataMock.service";
import { Requests } from "@services/types";
import { generatePDF } from "@utils/pdf/generetePDF";

import { infoIcon } from "./ToDo/config";
import { ToDo } from "./ToDo";
import {
  configDataAttachments,
  handleConfirmCancel,
  optionButtons,
} from "./config";
import { StyledItem, StyledMessageContainer } from "./styles";

export interface IFinancialReportingProps {
  requirements?: JSX.Element | JSX.Element[];
  promissoryNotes?: JSX.Element | JSX.Element[];
  approvals?: JSX.Element | JSX.Element[];
  management?: JSX.Element | JSX.Element[];
  postingVouchers?: JSX.Element | JSX.Element[];
}

interface IListdataProps {
  data: { id: string; name: string }[];
  icon?: React.ReactNode;
}

const Listdata = (props: IListdataProps) => {
  const { data, icon } = props;

  return (
    <ul
      style={{
        paddingInlineStart: "2px",
        marginBlock: "8px",
      }}
    >
      {data.map((element) => (
        <StyledItem key={element.id}>
          <Text>{element.name}</Text>
          <Icon
            icon={icon}
            appearance="dark"
            spacing="none"
            size="24px"
            cursorHover
          />
        </StyledItem>
      ))}
    </ul>
  );
};

export const FinancialReporting = (props: IFinancialReportingProps) => {
  const {
    requirements,
    promissoryNotes,
    approvals,
    management,
    postingVouchers,
  } = props;

  const [data, setData] = useState({} as Requests);

  const [showAttachments, setShowAttachments] = useState(false);
  const [attachDocuments, setAttachDocuments] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagMessage, setFlagMessage] = useState({
    title: "",
    description: "",
    appearance: "success" as "success" | "danger",
  });

  const { id } = useParams();

  const isMobile: boolean = useMediaQuery("(max-width: 720px)");

  const dataCommercialManagementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getById("k_Prospe", "requests", id!).then((requirement) => {
      setData(requirement);
    });
  }, [id]);

  const [isPrint, setIsPrint] = useState(false);

  const handleGeneratePDF = () => {
    setIsPrint(true);
    setTimeout(() => {
      generatePDF(
        dataCommercialManagementRef,
        "Gestión Comercial",
        "Gestión Comercial"
      );
    }, 1000);
  };

  const handleAction = {
    buttons: {
      buttonReject: {
        OnClick: () => {},
      },
      buttonCancel: {
        OnClick: () => setShowCancelModal(true),
      },
      buttonPrint: {
        OnClick: () => {},
      },
    },
    buttonsOutlined: {
      buttonAttach: {
        OnClick: () => setShowAttachments(true),
      },
      buttonViewAttachments: {
        OnClick: () => setAttachDocuments(true),
      },
    },
  };

  return (
    <Stack direction="column" margin={!isMobile ? "s250 s500" : "s250"}>
      <ContainerSections isMobile={isMobile} actionButtons={handleAction}>
        <>
          <Stack direction="column" gap={inube.spacing.s250}>
            <Stack direction="column">
              <Stack direction="column">
                <ComercialManagement
                  print={handleGeneratePDF}
                  data={data}
                  children={
                    <DataCommercialManagement
                      dataAccordeon={dataAccordeon}
                      isOpen={isPrint}
                      dataRef={dataCommercialManagementRef}
                    />
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
          {showAttachments && (
            <Listmodal
              title="Adjuntar"
              content={
                <Listdata
                  data={configDataAttachments}
                  icon={<MdDeleteOutline />}
                />
              }
              handleClose={() => setShowAttachments(false)}
              optionButtons={optionButtons}
            />
          )}
          {attachDocuments && (
            <Listmodal
              title="Ver Adjuntos"
              content={
                <Listdata
                  data={configDataAttachments}
                  icon={<MdOutlineRemoveRedEye />}
                />
              }
              handleClose={() => setAttachDocuments(false)}
            />
          )}
        </>
      </ContainerSections>
      {showCancelModal && (
        <TextAreaModal
          title="Anular"
          buttonText="Confirmar"
          inputLabel="Motivo de la anulación."
          inputPlaceholder="Describa el motivo de la anulación."
          onCloseModal={() => setShowCancelModal(false)}
          onSubmit={(values) =>
            handleConfirmCancel(
              values,
              setFlagMessage,
              setShowFlagMessage,
              setShowCancelModal
            )
          }
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
