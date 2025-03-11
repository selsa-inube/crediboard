import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/inubekit";

import { disbursementChequeManagement } from "@mocks/disbursement/disbursement.mock";
import { disbursementGeneral, disbursemenOptionAccount } from "../config";

import { CardGray } from "@components/cards/CardGray";

export interface IDisbursement {
  isMobile: boolean;
}

export function DisbursementChequeManagement(props: IDisbursement) {
  const { isMobile } = props;
  return (
    <Stack
      direction="column"
      gap="16px"
      width={isMobile ? "265px" : "582px"}
      height={isMobile ? "294px" : "auto"}
    >
      <Grid
        templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
        gap="16px 20px"
        autoRows="auto"
      >
        <CardGray
          label={disbursementGeneral.label}
          placeHolder={disbursementChequeManagement.amount}
        />
        <CardGray
          label={disbursementGeneral.labelToggle}
          placeHolder={disbursementChequeManagement.toggleChecked}
        />
        <CardGray
          label={disbursemenOptionAccount.labelName}
          placeHolder={disbursementChequeManagement.name}
        />
        <CardGray
          label={disbursemenOptionAccount.labelLastName}
          placeHolder={disbursementChequeManagement.lastName}
        />
        <CardGray
          label={disbursemenOptionAccount.labelSex}
          placeHolder={disbursementChequeManagement.sex}
        />
        <CardGray
          label={disbursemenOptionAccount.labelDocumentType}
          placeHolder={disbursementChequeManagement.typeDocument}
        />
        <CardGray
          label={disbursemenOptionAccount.labelDocumentNumber}
          placeHolder={disbursementChequeManagement.identification}
        />
        <CardGray
          label={disbursemenOptionAccount.labelBirthdate}
          placeHolder={disbursementChequeManagement.birthday}
        />
        <CardGray
          label={disbursemenOptionAccount.labelphone}
          placeHolder={disbursementChequeManagement.phone}
        />
        <CardGray
          label={disbursemenOptionAccount.labelMail}
          placeHolder={disbursementChequeManagement.mail}
        />
        <CardGray
          label={disbursemenOptionAccount.labelCity}
          placeHolder={disbursementChequeManagement.city}
        />
      </Grid>
      <CardGray
        label={disbursementChequeManagement.observation}
        placeHolder={disbursementChequeManagement.observation}
      />
    </Stack>
  );
}
