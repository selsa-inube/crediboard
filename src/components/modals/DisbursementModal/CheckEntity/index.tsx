import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";

import { disbursementCheckEntity } from "@mocks/disbursement/disbursement.mock";
import { CardGray } from "@components/cards/CardGray";
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
          label={disbursementCheckEntity.labelAmount}
          placeHolder={disbursementCheckEntity.amount}
        />
        <CardGray
          label={disbursementCheckEntity.labelToggle}
          placeHolder={disbursementCheckEntity.toggleChecked}
        />
        <CardGray
          label={disbursementCheckEntity.labelName}
          placeHolder={disbursementCheckEntity.name}
        />
        <CardGray
          label={disbursementCheckEntity.labelLastName}
          placeHolder={disbursementCheckEntity.lastName}
        />
        <CardGray
          label={disbursementCheckEntity.labelSex}
          placeHolder={disbursementCheckEntity.sex}
        />
        <CardGray
          label={disbursementCheckEntity.labelDocumentType}
          placeHolder={disbursementCheckEntity.typeDocument}
        />
        <CardGray
          label={disbursementCheckEntity.labelDocumentNumber}
          placeHolder={disbursementCheckEntity.identification}
        />
        <CardGray
          label={disbursementCheckEntity.labelBirthdate}
          placeHolder={disbursementCheckEntity.birthday}
        />
        <CardGray
          label={disbursementCheckEntity.labelphone}
          placeHolder={disbursementCheckEntity.phone}
        />
        <CardGray
          label={disbursementCheckEntity.labelMail}
          placeHolder={disbursementCheckEntity.mail}
        />
        <CardGray
          label={disbursementCheckEntity.labelCity}
          placeHolder={disbursementCheckEntity.city}
        />
      </Grid>
      <CardGray
        label={disbursementCheckEntity.labelObservation}
        placeHolder={disbursementCheckEntity.observation}
      />
    </Stack>
  );
}
