import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";

import { disbursementExternal } from "@mocks/disbursement/disbursement.mock";
import { CardGray } from "@components/cards/CardGray";
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
          label={disbursementExternal.labelAmount}
          placeHolder={disbursementExternal.amount}
        />
        <CardGray
          label={disbursementExternal.labelToggle}
          placeHolder={disbursementExternal.toggleChecked}
        />
        <CardGray
          label={disbursementExternal.labelName}
          placeHolder={disbursementExternal.name}
        />
        <CardGray
          label={disbursementExternal.labelLastName}
          placeHolder={disbursementExternal.lastName}
        />
        <CardGray
          label={disbursementExternal.labelSex}
          placeHolder={disbursementExternal.sex}
        />
        <CardGray
          label={disbursementExternal.labelDocumentType}
          placeHolder={disbursementExternal.typeDocument}
        />
        <CardGray
          label={disbursementExternal.labelDocumentNumber}
          placeHolder={disbursementExternal.identification}
        />
        <CardGray
          label={disbursementExternal.labelBirthdate}
          placeHolder={disbursementExternal.birthday}
        />
        <CardGray
          label={disbursementExternal.labelphone}
          placeHolder={disbursementExternal.phone}
        />
        <CardGray
          label={disbursementExternal.labelMail}
          placeHolder={disbursementExternal.mail}
        />
        <CardGray
          label={disbursementExternal.labelCity}
          placeHolder={disbursementExternal.city}
        />
        <CardGray
          label={disbursementExternal.labelBank}
          placeHolder={disbursementExternal.bank}
        />
        <CardGray
          label={disbursementExternal.labelAccountType}
          placeHolder={disbursementExternal.typeAccount}
        />
        <CardGray
          label={disbursementExternal.labelAccountNumber}
          placeHolder={disbursementExternal.AccountNumber}
        />
      </Grid>
      <CardGray
        label={disbursementExternal.labelObservation}
        placeHolder={disbursementExternal.observation}
      />
    </Stack>
  );
}
