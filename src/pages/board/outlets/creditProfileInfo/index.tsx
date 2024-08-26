import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack, MdOutlinePrint } from "react-icons/md";

import { Button } from "@inubekit/button";
import { Grid } from "@inubekit/grid";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useMediaQueries } from "@inubekit/hooks";

import { get, getById, getDataById } from "@mocks/utils/dataMock.service";
import { Requests, IRiskScoring, credit, Ipayment_capacity, Icredit_behavior } from "@services/types";
import { capitalizeFirstLetterEachWord } from "@utils/formatData/text";
import { currencyFormat } from "@utils/formatData/currency";
import { generatePDF } from "@utils/pdf/generetePDF";
import {
  getMaritalStatusInSpanish,
  getEconomicActivityInSpanish,
} from "@utils/mappingData/mappings";
import { MaritalStatus, EconomicActivity } from "@services/enums";

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
  const [riskScoring, setRiskScoring] = useState<IRiskScoring[] | null>(null);
  const [credit_profileInfo, setCredit_profileInfo] = useState({
    company_seniority: 0,
    labor_stability_index: 0,
    max_labor_stability_index: 0,
    estimated_severance: 0,
  });
  const [payment_capacity, setPayment_capacity] = useState({
    available_value: 0,
    base_income: 0,
    percentage_used: 0,
  });
  const [credit_behavior, setCredit_behavior] = useState({
    core_risk_score: 0,
    central_risk_score_date: 0,
    number_of_internal_arrears: 0,
    maximum_number_of_installments_in_arrears: 0,
  });

  const [loading, setLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const dataPrint = useRef<HTMLDivElement>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const { "(max-width: 1200px)": isTablet, "(max-width: 751px)": isMobile } =
    useMediaQueries(["(max-width: 1200px)", "(max-width: 751px)"]);

  useEffect(() => {
    Promise.allSettled([
      getById("k_Prospe", "requests", id!),
      get("risk-scoring"),
      getDataById<credit[]>("credit_profileInfo", "credit_request_id", id!),
      getDataById<Ipayment_capacity[]>("payment_capacity", "credit_request_id", id!),
      getDataById<Icredit_behavior[]>("credit_behavior", "credit_request_id", id!),

    ]).then((data) => {
      const [request, riskScoring, credit_profileInfo, payment_capacity, credit_behavior] = data;

      if (request.status === "fulfilled") {
        setRequests(request.value as Requests);
      }

      if (riskScoring.status === "fulfilled") {
        setRiskScoring(riskScoring.value as IRiskScoring[]);
      }

      if (credit_profileInfo.status === "fulfilled") {
        setCredit_profileInfo((prevState) => ({
          ...prevState,
          ...credit_profileInfo?.value?.[0]?.labor_stability,
        }));
      }
      if (payment_capacity.status === "fulfilled" && payment_capacity.value){       
        setPayment_capacity((prevState) => ({
          ...prevState,
          ...payment_capacity.value?.[0]?.payment_capacity 
        })); 
      }
      if (credit_behavior.status === "fulfilled" && credit_behavior.value){
        setCredit_behavior((prevState) => ({
          ...prevState,
          ...credit_behavior.value?.[0]?.credit_behavior
        }));
      }


      setLoading(false);
    });
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
          availableValue={payment_capacity.available_value}
          availablePercentage={100 - payment_capacity.percentage_used}
          incomeB={payment_capacity.base_income}
          percentageUsed={payment_capacity.percentage_used}
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
                  riskScoring[0].marital_status as keyof typeof MaritalStatus
                )
              : ""
          }
          economicActivity={
            riskScoring
              ? getEconomicActivityInSpanish(
                  riskScoring[0]
                    .economic_activity as keyof typeof EconomicActivity
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
          centralScoreRisky={credit_behavior.core_risk_score}
          centralScoreDate={String(credit_behavior.central_risk_score_date)}
          numberInternalBlackberries={credit_behavior.number_of_internal_arrears}
          maximumNumberInstallmentsArrears={credit_behavior.maximum_number_of_installments_in_arrears}
          isMobile={isMobile}
        />
      </Grid>
    </StyledContainerToCenter>
  );
};
