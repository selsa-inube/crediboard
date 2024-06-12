import { inube, Stack, Button, Text, Grid } from "@inube/design-system";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useState, useEffect } from "react";

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

export const CreditProfileInfo = () => {
  const navigation = useNavigate();

  const [data, setData] = useState({} as Requests);

  const { id } = useParams();

  useEffect(() => {
    getById("k_Prospe", "requests", id!).then((requirement) => {
      setData(requirement);
    });
  }, [id]);

  return (
    <Stack direction="column" margin="s250 s500" gap={inube.spacing.s500}>
      <Stack justifyContent="space-between">
        <Button
          spacing="compact"
          variant="none"
          iconBefore={<MdArrowBack />}
          onClick={() => navigation(-1)}
        >
          Volver
        </Button>
        <Stack gap={inube.spacing.s200} alignItems="center">
          <Text type="title" appearance="gray">
            Perfil crediticio del cliente
          </Text>
          <Text type="headline" size="medium">
            {data.nnasocia ? capitalizeFirstLetterEachWord(data?.nnasocia) : ""}
          </Text>
          <Text type="title" size="small">
            {`S.C. No. ${data.aanumnit} ${currencyFormat(data.v_Monto)}`}
          </Text>
        </Stack>
        <Button>Imprimir</Button>
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
        <CreditBehavior
          centralScoreRisky={250}
          centralScoreDate="2023-08-31T00:00:00-05:00"
          numberInternalBlackberries={9}
          maximumNumberInstallmentsArrears={3}
        />
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
      </Grid>
    </Stack>
  );
};
