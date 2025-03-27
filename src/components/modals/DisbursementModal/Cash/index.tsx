import { Stack, Grid } from "@inubekit/inubekit";

import { disbursementCash } from "@mocks/disbursement/disbursement.mock";
import { CardGray } from "@components/cards/CardGray";

import { disbursementGeneral, disbursemenOptionAccount } from "../config";

export interface IDisbursement {
  isMobile: boolean;
}

export function DisbursementCash(props: IDisbursement) {
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
          placeHolder={disbursementCash.amount}
        />
        <CardGray
          label={disbursementGeneral.labelToggle}
          placeHolder={disbursementCash.toggleChecked}
        />
        <CardGray
          label={disbursemenOptionAccount.labelName}
          placeHolder={disbursementCash.name}
        />
        <CardGray
          label={disbursemenOptionAccount.labelLastName}
          placeHolder={disbursementCash.lastName}
        />
        <CardGray
          label={disbursemenOptionAccount.labelSex}
          placeHolder={disbursementCash.sex}
        />
        <CardGray
          label={disbursemenOptionAccount.labelDocumentType}
          placeHolder={disbursementCash.typeDocument}
        />
        <CardGray
          label={disbursemenOptionAccount.labelDocumentNumber}
          placeHolder={disbursementCash.identification}
        />
        <CardGray
          label={disbursemenOptionAccount.labelBirthdate}
          placeHolder={disbursementCash.birthday}
        />
        <CardGray
          label={disbursemenOptionAccount.labelphone}
          placeHolder={disbursementCash.phone}
        />
        <CardGray
          label={disbursemenOptionAccount.labelMail}
          placeHolder={disbursementCash.mail}
        />
        <CardGray
          label={disbursemenOptionAccount.labelCity}
          placeHolder={disbursementCash.city}
        />
      </Grid>
      <CardGray
        label={disbursementCash.observation}
        placeHolder={disbursementCash.observation}
      />
    </Stack>
  );
}
