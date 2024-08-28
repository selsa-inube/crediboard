import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdOutlinePrint } from "react-icons/md";

import { Button } from "@inubekit/button";
import { Grid } from "@inubekit/grid";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useMediaQueries } from "@inubekit/hooks";

import { getById, getDataById } from "@mocks/utils/dataMock.service";
import { Requests, IRiskScoring, credit } from "@services/types";
import { capitalizeFirstLetterEachWord } from "@utils/formatData/text";
import { currencyFormat } from "@utils/formatData/currency";
import { generatePDF } from "@utils/pdf/generetePDF";

import { CreditBehavior } from "./CreditBehaviorCard";
import { Guarantees } from "./Guarantees";
import { JobStabilityCard } from "./JobStabilityCard";
import { PaymentCapacity } from "./PaymentCapacity";
import { OpenWallet } from "./OpenWallet";
import { RiskScoring } from "./RiskScoring";
import { StyledDivider, StyledContainerToCenter } from "./styles";

const margins = {
  top: 20,
  bottom: 0,
  left: 25.4,
  right: 25.4,
};

export const CreditProfileInfo = () => {
  const [requests, setRequests] = useState({} as Requests);
  const [riskScoring, setRiskScoring] = useState<IRiskScoring["risk_scoring"]>({
    total_score: 0,
    minimum_score: 0,
    seniority: 0,
    seniority_score: 0,
    risk_center: 0,
    risk_center_score: 0,
    job_stability_index: 0,
    job_stability_index_score: 0,
    marital_status: "",
    marital_status_score: 0,
    economic_activity: "",
    economic_activity_score: 0,
  });
  const [credit_profileInfo, setCredit_profileInfo] = useState({
    company_seniority: 0,
    labor_stability_index: 0,
    max_labor_stability_index: 0,
    estimated_severance: 0,
  });

  const [loading, setLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const dataPrint = useRef<HTMLDivElement>(null);

  const [dataWereObtained, setWataWereObtained] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { "(max-width: 1200px)": isTablet, "(max-width: 751px)": isMobile } =
    useMediaQueries(["(max-width: 1200px)", "(max-width: 751px)"]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const [request, riskScoring, credit_profileInfo] =
          await Promise.allSettled([
            getById("k_Prospe", "requests", id!),
            getDataById<IRiskScoring[]>(
              "risk-scoring",
              "credit_request_id",
              id!
            ),
            getDataById<credit[]>(
              "credit_profileInfo",
              "credit_request_id",
              id!
            ),
          ]);

        if (request.status === "fulfilled") {
          setRequests(request.value as Requests);
        }

        if (riskScoring.status === "fulfilled") {
          const riskScoringData = riskScoring.value?.[0];
          setRiskScoring((prev) => ({
            ...prev,
            ...riskScoringData?.risk_scoring,
          }));

          !riskScoringData
            ? setWataWereObtained(true)
            : setWataWereObtained(false);
        } else {
          setWataWereObtained(false);
        }

        if (credit_profileInfo.status === "fulfilled") {
          setCredit_profileInfo((prevState) => ({
            ...prevState,
            ...credit_profileInfo?.value?.[0].labor_stability,
          }));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handlePrint = () => {
    setIsGeneratingPdf(true);
    generatePDF(dataPrint, "", "Perfil crediticio del cliente", margins);
    setIsGeneratingPdf(false);
  };

  return (
    <StyledContainerToCenter ref={dataPrint}>
      <Stack direction="column">
        <Stack
          justifyContent="space-between"
          margin={isTablet ? "8px 16px" : "20px 40px"}
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
            <Stack gap="16px" alignItems="center">
              <Text type="title" appearance="gray">
                Perfil crediticio del cliente
              </Text>
              <Text type="headline" size="medium">
                {requests.nnasocia
                  ? capitalizeFirstLetterEachWord(requests.nnasocia)
                  : ""}
              </Text>
              <Text type="title" size="small">
                {`S.C. No. ${requests.aanumnit} ${currencyFormat(requests.v_Monto)}`}
              </Text>
            </Stack>
          )}
          {!isMobile && (
            <Button onClick={handlePrint} disabled={isGeneratingPdf}>
              Imprimir
            </Button>
          )}
          {isMobile && (
            <Icon
              appearance="dark"
              icon={<MdOutlinePrint />}
              size="24px"
              onClick={handlePrint}
            />
          )}
        </Stack>

        {isTablet && (
          <>
            <StyledDivider />
            <Stack
              direction="column"
              gap="4px"
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
                {requests.nnasocia
                  ? capitalizeFirstLetterEachWord(requests.nnasocia)
                  : ""}
              </Text>
              <Text type="title" size="small">
                {`S.C. No. ${requests.aanumnit} ${currencyFormat(requests.v_Monto)}`}
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
        gap="20px"
        autoRows="minmax(auto, max-content)"
        margin={isTablet ? "20px" : "20px 40px"}
      >
        <JobStabilityCard
          companySeniority={credit_profileInfo.company_seniority}
          stabilityIndex={credit_profileInfo.labor_stability_index}
          estimatedCompensation={credit_profileInfo.estimated_severance}
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
          totalScore={riskScoring.total_score}
          minimumScore={riskScoring.minimum_score}
          seniority={riskScoring.seniority}
          seniorityScore={riskScoring.seniority_score}
          riskCenter={riskScoring.risk_center}
          riskCenterScore={riskScoring.risk_center_score}
          jobStabilityIndex={riskScoring.job_stability_index}
          jobStabilityIndexScore={riskScoring.job_stability_index_score}
          maritalStatusScore={riskScoring.marital_status_score}
          economicActivityScore={riskScoring.economic_activity_score}
          maritalStatus={riskScoring.marital_status}
          economicActivity={riskScoring.economic_activity}
          isLoading={loading}
          isMobile={isMobile}
          dataWereObtained={dataWereObtained}
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
