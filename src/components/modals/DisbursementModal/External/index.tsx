import { Stack, Grid } from "@inubekit/inubekit";

import { disbursementExternal } from "@mocks/disbursement/disbursement.mock";
import { CardGray } from "@components/cards/CardGray";

import { disbursementGeneral, disbursemenOptionAccount } from "../config";
export interface IDisbursement {
  isMobile: boolean;
}

export function DisbursementExternal(props: IDisbursement) {
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
          placeHolder={disbursementExternal.amount}
        />
        <CardGray
          label={disbursementGeneral.labelToggle}
          placeHolder={disbursementExternal.toggleChecked}
        />
        <CardGray
          label={disbursemenOptionAccount.labelName}
          placeHolder={disbursementExternal.name}
        />
        <CardGray
          label={disbursemenOptionAccount.labelLastName}
          placeHolder={disbursementExternal.lastName}
        />
        <CardGray
          label={disbursemenOptionAccount.labelSex}
          placeHolder={disbursementExternal.sex}
        />
        <CardGray
          label={disbursemenOptionAccount.labelDocumentType}
          placeHolder={disbursementExternal.typeDocument}
        />
        <CardGray
          label={disbursemenOptionAccount.labelDocumentNumber}
          placeHolder={disbursementExternal.identification}
        />
        <CardGray
          label={disbursemenOptionAccount.labelBirthdate}
          placeHolder={disbursementExternal.birthday}
        />
        <CardGray
          label={disbursemenOptionAccount.labelphone}
          placeHolder={disbursementExternal.phone}
        />
        <CardGray
          label={disbursemenOptionAccount.labelMail}
          placeHolder={disbursementExternal.mail}
        />
        <CardGray
          label={disbursemenOptionAccount.labelCity}
          placeHolder={disbursementExternal.city}
        />
        <CardGray
          label={disbursemenOptionAccount.labelBank}
          placeHolder={disbursementExternal.bank}
        />
        <CardGray
          label={disbursemenOptionAccount.labelAccountType}
          placeHolder={disbursementExternal.typeAccount}
        />
        <CardGray
          label={disbursemenOptionAccount.labelAccountNumber}
          placeHolder={disbursementExternal.AccountNumber}
        />
      </Grid>
      <CardGray
        label={disbursemenOptionAccount.observation}
        placeHolder={disbursementExternal.observation}
      />
    </Stack>
  );
}
