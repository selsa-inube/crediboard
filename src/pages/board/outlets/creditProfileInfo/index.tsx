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

import { Requests } from "@services/types";
import { getById } from "@mocks/utils/dataMock.service";
import { capitalizeFirstLetterEachWord } from "@utils/formatData/text";
import { currencyFormat } from "@utils/formatData/currency";

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

  const { "(max-width: 1200px)": isTablet, "(max-width: 751px)": isMobile } =
    useMediaQueries(["(max-width: 1200px)", "(max-width: 751px)"]);

  useEffect(() => {
    if (id) {
      getById("k_Prospe", "requests", id).then((requirement) => {
        setData(requirement);
      });
    }
  }, [id]);

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
          {`S.C. No. ${data.aanumnit} ${currencyFormat(data.v_Monto)}`}
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
          totalScore={456}
          minimumScore={500}
          yearsOldScore={120}
          riskCenterScore={-100}
          jobStabilityIndexScore={300}
          maritalStatusScore={50}
          economicActivityScore={106}
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
          companySeniority={5}
          stabilityIndex={900}
          estimatedCompensation={20000000}
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
          totalScore={456}
          minimumScore={500}
          yearsOldScore={120}
          riskCenterScore={-100}
          jobStabilityIndexScore={300}
          maritalStatusScore={50}
          economicActivityScore={106}
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
