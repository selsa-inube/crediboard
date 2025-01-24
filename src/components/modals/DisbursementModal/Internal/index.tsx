import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";

import { disbursementInternal } from "@mocks/disbursement/disbursement.mock";
import { CardGray } from "@components/cards/CardGray";
import {
  disbursementGeneral,
  disbursemenOptionAccount,
} from "@pages/filingApplication/steps/disbursementGeneral/config";

export interface IDisbursement {
  isMobile: boolean;
}

export function DisbursementInternal(props: IDisbursement) {
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
        justifyContent="space-between"
      >
        <CardGray
          label={disbursementGeneral.label}
          placeHolder={disbursementInternal.amount}
        />
        <CardGray
          label={disbursementGeneral.labelToggle}
          placeHolder={disbursementInternal.toggleChecked}
        />
        <CardGray
          label={disbursemenOptionAccount.labelName}
          placeHolder={disbursementInternal.name}
        />
        <CardGray
          label={disbursemenOptionAccount.labelLastName}
          placeHolder={disbursementInternal.lastName}
        />
        <CardGray
          label={disbursemenOptionAccount.labelSex}
          placeHolder={disbursementInternal.sex}
        />
        <CardGray
          label={disbursemenOptionAccount.labelDocumentType}
          placeHolder={disbursementInternal.typeDocument}
        />
        <CardGray
          label={disbursemenOptionAccount.labelDocumentNumber}
          placeHolder={disbursementInternal.identification}
        />
        <CardGray
          label={disbursemenOptionAccount.labelBirthdate}
          placeHolder={disbursementInternal.birthday}
        />
        <CardGray
          label={disbursemenOptionAccount.labelphone}
          placeHolder={disbursementInternal.phone}
        />
        <CardGray
          label={disbursemenOptionAccount.labelMail}
          placeHolder={disbursementInternal.mail}
        />
        <CardGray
          label={disbursemenOptionAccount.labelCity}
          placeHolder={disbursementInternal.city}
        />
        <CardGray
          label={disbursemenOptionAccount.labelAccount}
          placeHolder={disbursementInternal.account}
        />
      </Grid>
      <CardGray
        label={disbursemenOptionAccount.observation}
        placeHolder={disbursementInternal.observation}
      />
    </Stack>
  );
}
