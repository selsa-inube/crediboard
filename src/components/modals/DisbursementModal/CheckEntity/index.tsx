import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { disbursementCheckEntity } from "@mocks/disbursement/disbursement.mock";
import { CardGray } from "@components/cards/CardGray";

export function DisbursementCheckEntity() {
  return (
    <Stack direction="column">
      <Grid templateColumns="repeat(2, 1fr)" gap="16px 20px" autoRows="auto">
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
