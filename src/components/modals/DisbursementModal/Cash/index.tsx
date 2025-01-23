import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";

import { disbursementCash } from "@mocks/disbursement/disbursement.mock";
import { CardGray } from "@components/cards/CardGray";
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
          label={disbursementCash.labelAmount}
          placeHolder={disbursementCash.amount}
        />
        <CardGray
          label={disbursementCash.labelToggle}
          placeHolder={disbursementCash.toggleChecked}
        />
        <CardGray
          label={disbursementCash.labelName}
          placeHolder={disbursementCash.name}
        />
        <CardGray
          label={disbursementCash.labelLastName}
          placeHolder={disbursementCash.lastName}
        />
        <CardGray
          label={disbursementCash.labelSex}
          placeHolder={disbursementCash.sex}
        />
        <CardGray
          label={disbursementCash.labelDocumentType}
          placeHolder={disbursementCash.typeDocument}
        />
        <CardGray
          label={disbursementCash.labelDocumentNumber}
          placeHolder={disbursementCash.identification}
        />
        <CardGray
          label={disbursementCash.labelBirthdate}
          placeHolder={disbursementCash.birthday}
        />
        <CardGray
          label={disbursementCash.labelphone}
          placeHolder={disbursementCash.phone}
        />
        <CardGray
          label={disbursementCash.labelMail}
          placeHolder={disbursementCash.mail}
        />
        <CardGray
          label={disbursementCash.labelCity}
          placeHolder={disbursementCash.city}
        />
      </Grid>
      <CardGray
        label={disbursementCash.labelObservation}
        placeHolder={disbursementCash.observation}
      />
    </Stack>
  );
}
