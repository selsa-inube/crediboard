import {
  inube,
  Stack,
  Button,
  Text,
  Grid,
  useMediaQueries,
  Icon,
} from "@inube/design-system";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdOutlinePrint } from "react-icons/md";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { Requests, IRiskScoring, credit } from "@services/types";
import { getById, getDataById } from "@mocks/utils/dataMock.service";
import { capitalizeFirstLetterEachWord } from "@utils/formatData/text";
import { currencyFormat } from "@utils/formatData/currency";
import { get } from "@mocks/utils/dataMock.service";
import {
  getMaritalStatusInSpanish,
  getEconomicActivityInSpanish,
} from "@utils/mappingData/mappings";
import { MaritalStatus, EconomicActivity } from "@services/enums";

import { JobStabilityCard } from "./JobStabilityCard";
import { PaymentCapacity } from "./PaymentCapacity";
import { OpenWallet } from "./OpenWallet";
import { CreditBehavior } from "./CreditBehaviorCard";
import { RiskScoring } from "./RiskScoring";
import { Guarantees } from "./Guarantees";
import { StyledDivider, StyledContainerToCenter } from "./styles";

export const CreditProfileInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({} as Requests);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [credit_profileInfo, setCredit_profileInfo] = useState<credit[]>([]);

  const [riskScoring, setRiskScoring] = useState<IRiskScoring[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { "(max-width: 1200px)": isTablet, "(max-width: 751px)": isMobile } =
    useMediaQueries(["(max-width: 1200px)", "(max-width: 751px)"]);

  useEffect(() => {
    Promise.allSettled([
      getById("k_Prospe", "requests", id!),
      get("risk-scoring"),
      getDataById("credit_profileInfo", "credit_request_id", id!),
    ]).then((data) => {
      const [request, riskScoring, credit_profileInfo] = data;
      if (request.status === "fulfilled") {
        setData(request.value as Requests);
      }
      if (riskScoring.status === "fulfilled") {
        setRiskScoring(riskScoring.value as IRiskScoring[]);
      }

      if (credit_profileInfo.status === "fulfilled") {
        setCredit_profileInfo(credit_profileInfo.value as []);
      }
      setLoading(false);
    });
  }, [id]);

  const { company_seniority, labor_stability_index, estimated_severance } =
    credit_profileInfo[0].labor_stability;

  const renderPDFContent = () => (
    <Stack direction="column" gap={inube.spacing.s500}>
      <Stack
        gap={inube.spacing.s200}
        alignItems="center"
        justifyContent="center"
      >
        <Text type="title" appearance="gray">
          Perfil crediticio del cliente
        </Text>
        <Text type="headline" size="medium">
          {data.nnasocia ? capitalizeFirstLetterEachWord(data.nnasocia) : ""}
        </Text>
        <Text type="title" size="small">
          {`S.C. No. ${data.aanumnit} ${currencyFormat(data.v_Monto)}`} aa
        </Text>
      </Stack>
      <Grid
        templateColumns="repeat(auto-fit, minmax(350px, 1fr))"
        gap="s250"
        autoRows="auto"
      >
        <JobStabilityCard
          companySeniority={5}
          stabilityIndex={900}
          estimatedCompensation={20000000}
        />
        <PaymentCapacity
          availableValue={955320}
          availablePercentage={32}
          incomeB={3000000}
          percentageUsed={68}
        />
        <OpenWallet
          overdraftFactor={10}
          valueDiscovered={50000000}
          reciprocity={5}
        />
      </Grid>
      <Grid
        templateColumns="repeat(auto-fit, minmax(350px, 1fr))"
        gap="s250"
        autoRows="auto"
      >
        <RiskScoring
          totalScore={riskScoring ? riskScoring[0].total_score : 0}
          minimumScore={riskScoring ? riskScoring[0].minimum_score : 0}
          seniority={riskScoring ? riskScoring[0].seniority : 0}
          seniorityScore={riskScoring ? riskScoring[0].seniority_score : 0}
          riskCenter={riskScoring ? riskScoring[0].risk_center : 0}
          riskCenterScore={riskScoring ? riskScoring[0].risk_center_score : 0}
          jobStabilityIndex={
            riskScoring ? riskScoring[0].job_stability_index : 0
          }
          jobStabilityIndexScore={
            riskScoring ? riskScoring[0].job_stability_index_score : 0
          }
          maritalStatusScore={
            riskScoring ? riskScoring[0].marital_status_score : 0
          }
          economicActivityScore={
            riskScoring ? riskScoring[0].economic_activity_score : 0
          }
          maritalStatus={
            riskScoring
              ? getMaritalStatusInSpanish(
                  riskScoring[0].marital_status as MaritalStatus
                )
              : ""
          }
          economicActivity={
            riskScoring
              ? getEconomicActivityInSpanish(
                  riskScoring[0].economic_activity as EconomicActivity
                )
              : ""
          }
          isLoading={loading}
          isMobile={isMobile}
        />
        <Guarantees
          guaranteesRequired="Ninguna garantía real, o fianza o codeudor."
          guaranteesOffered="Ninguna, casa Bogotá 200 mt2, o fianza o codeudor Pedro Pérez."
          guaranteesCurrent="Ninguna, apartamento, en Bogotá 80 mt2, o vehículo Mazda 323."
        />
        <CreditBehavior
          centralScoreRisky={250}
          centralScoreDate="2023-08-31T00:00:00-05:00"
          numberInternalBlackberries={9}
          maximumNumberInstallmentsArrears={3}
        />
      </Grid>
    </Stack>
  );

  const generatePDF = async () => {
    setIsGeneratingPdf(true);
    const pdfContainer = document.createElement("div");
    document.body.appendChild(pdfContainer);

    ReactDOM.render(renderPDFContent(), pdfContainer);

    const canvas = await html2canvas(pdfContainer);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const margins = {
      top: 20,
      bottom: 0,
      left: 25.4,
      right: 25.4,
    };

    const contentWidth = pdfWidth - margins.left - margins.right;
    const contentHeight = pdfHeight - margins.top - margins.bottom;

    pdf.addImage(
      imgData,
      "PNG",
      margins.left,
      margins.top,
      contentWidth,
      contentHeight
    );

    pdf.save("credit-profile.pdf");

    document.body.removeChild(pdfContainer);
    setIsGeneratingPdf(false);
  };

  return (
    <StyledContainerToCenter>
      <Stack direction="column">
        <Stack
          justifyContent="space-between"
          margin={isTablet ? "s100 s200" : "s250 s500"}
        >
          <Button
            spacing="compact"
            variant="none"
            iconBefore={<MdArrowBack />}
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
          {!isTablet && (
            <Stack gap={inube.spacing.s200} alignItems="center">
              <Text type="title" appearance="gray">
                Perfil crediticio del cliente
              </Text>
              <Text type="headline" size="medium">
                {data.nnasocia
                  ? capitalizeFirstLetterEachWord(data.nnasocia)
                  : ""}
              </Text>
              <Text type="title" size="small">
                {`S.C. No. ${data.aanumnit} ${currencyFormat(data.v_Monto)}`}
              </Text>
            </Stack>
          )}
          {!isMobile && (
            <Button onClick={generatePDF} disabled={isGeneratingPdf}>
              Imprimir
            </Button>
          )}
          {isMobile && (
            <Icon
              appearance="dark"
              icon={<MdOutlinePrint />}
              size="24px"
              onClick={generatePDF}
            />
          )}
        </Stack>

        {isTablet && (
          <>
            <StyledDivider />
            <Stack
              direction="column"
              gap={inube.spacing.s050}
              alignItems="center"
              margin="s200 s200 s0 s200"
            >
              <Text
                type="title"
                size={isMobile ? "medium" : "large"}
                appearance="gray"
              >
                Perfil crediticio del cliente
              </Text>
              <Text
                type="headline"
                size={isMobile ? "small" : "medium"}
                textAlign="center"
              >
                {data.nnasocia
                  ? capitalizeFirstLetterEachWord(data.nnasocia)
                  : ""}
              </Text>
              <Text type="title" size="small">
                {`S.C. No. ${data.aanumnit} ${currencyFormat(data.v_Monto)}`}
              </Text>
            </Stack>
          </>
        )}
      </Stack>
      <Grid
        templateColumns={
          isTablet
            ? "repeat(auto-fit, minmax(320px, 1fr))"
            : "repeat(auto-fit, minmax(350px, 1fr))"
        }
        gap="s250"
        autoRows="minmax(auto, max-content)"
        margin={isTablet ? "s250" : "s250 s500"}
      >
        <JobStabilityCard
          companySeniority={company_seniority}
          stabilityIndex={labor_stability_index}
          estimatedCompensation={estimated_severance}
          isMobile={isMobile}
        />
        <PaymentCapacity
          availableValue={955320}
          availablePercentage={32}
          incomeB={3000000}
          percentageUsed={68}
          isMobile={isMobile}
        />
        <OpenWallet
          overdraftFactor={10}
          valueDiscovered={50000000}
          reciprocity={5}
          isMobile={isMobile}
        />
        <RiskScoring
          totalScore={riskScoring ? riskScoring[0].total_score : 0}
          minimumScore={riskScoring ? riskScoring[0].minimum_score : 0}
          seniority={riskScoring ? riskScoring[0].seniority : 0}
          seniorityScore={riskScoring ? riskScoring[0].seniority_score : 0}
          riskCenter={riskScoring ? riskScoring[0].risk_center : 0}
          riskCenterScore={riskScoring ? riskScoring[0].risk_center_score : 0}
          jobStabilityIndex={
            riskScoring ? riskScoring[0].job_stability_index : 0
          }
          jobStabilityIndexScore={
            riskScoring ? riskScoring[0].job_stability_index_score : 0
          }
          maritalStatusScore={
            riskScoring ? riskScoring[0].marital_status_score : 0
          }
          economicActivityScore={
            riskScoring ? riskScoring[0].economic_activity_score : 0
          }
          maritalStatus={
            riskScoring
              ? getMaritalStatusInSpanish(
                  riskScoring[0].marital_status as MaritalStatus
                )
              : ""
          }
          economicActivity={
            riskScoring
              ? getEconomicActivityInSpanish(
                  riskScoring[0].economic_activity as EconomicActivity
                )
              : ""
          }
          isLoading={loading}
          isMobile={isMobile}
        />
        <Guarantees
          guaranteesRequired="Ninguna garantía real, o fianza o codeudor."
          guaranteesOffered="Ninguna, casa Bogotá 200 mt2, o fianza o codeudor Pedro Pérez."
          guaranteesCurrent="Ninguna, apartamento, en Bogotá 80 mt2, o vehículo Mazda 323."
          isMobile={isMobile}
        />
        <CreditBehavior
          centralScoreRisky={250}
          centralScoreDate="2023-08-31T00:00:00-05:00"
          numberInternalBlackberries={9}
          maximumNumberInstallmentsArrears={3}
          isMobile={isMobile}
        />
      </Grid>
    </StyledContainerToCenter>
  );
};
