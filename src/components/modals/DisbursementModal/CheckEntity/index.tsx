import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/inubekit";

import { disbursementCheckEntity } from "@mocks/disbursement/disbursement.mock";
import { CardGray } from "@components/cards/CardGray";

import { disbursementGeneral, disbursemenOptionAccount } from "../config";
export interface IDisbursement {
  isMobile: boolean;
}

export function DisbursementCheckEntity(props: IDisbursement) {
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
          placeHolder={disbursementCheckEntity.amount}
        />
        <CardGray
          label={disbursementGeneral.labelToggle}
          placeHolder={disbursementCheckEntity.toggleChecked}
        />
        <CardGray
          label={disbursemenOptionAccount.labelName}
          placeHolder={disbursementCheckEntity.name}
        />
        <CardGray
          label={disbursemenOptionAccount.labelLastName}
          placeHolder={disbursementCheckEntity.lastName}
        />
        <CardGray
          label={disbursemenOptionAccount.labelSex}
          placeHolder={disbursementCheckEntity.sex}
        />
        <CardGray
          label={disbursemenOptionAccount.labelDocumentType}
          placeHolder={disbursementCheckEntity.typeDocument}
        />
        <CardGray
          label={disbursemenOptionAccount.labelDocumentNumber}
          placeHolder={disbursementCheckEntity.identification}
        />
        <CardGray
          label={disbursemenOptionAccount.labelBirthdate}
          placeHolder={disbursementCheckEntity.birthday}
        />
        <CardGray
          label={disbursemenOptionAccount.labelphone}
          placeHolder={disbursementCheckEntity.phone}
        />
        <CardGray
          label={disbursemenOptionAccount.labelMail}
          placeHolder={disbursementCheckEntity.mail}
        />
        <CardGray
          label={disbursemenOptionAccount.labelCity}
          placeHolder={disbursementCheckEntity.city}
        />
      </Grid>
      <CardGray
        label={disbursementCheckEntity.observation}
        placeHolder={disbursementCheckEntity.observation}
      />
    </Stack>
  );
}
