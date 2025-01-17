import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { disbursementInternal } from "@mocks/disbursement/disbursement.mock";
import { CardGray } from "@components/cards/CardGray";

export function DisbursementInternal() {
  return (
    <Stack direction="column">
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap="16px 20px"
        autoRows="auto"
        justifyContent="space-between"
      >
        <CardGray
          label={disbursementInternal.labelAmount}
          placeHolder={disbursementInternal.amount}
        />
        <CardGray
          label={disbursementInternal.labelToggle}
          placeHolder={disbursementInternal.toggleChecked}
        />
        <CardGray
          label={disbursementInternal.labelName}
          placeHolder={disbursementInternal.name}
        />
        <CardGray
          label={disbursementInternal.labelLastName}
          placeHolder={disbursementInternal.lastName}
        />
        <CardGray
          label={disbursementInternal.labelSex}
          placeHolder={disbursementInternal.sex}
        />
        <CardGray
          label={disbursementInternal.labelDocumentType}
          placeHolder={disbursementInternal.typeDocument}
        />
        <CardGray
          label={disbursementInternal.labelDocumentNumber}
          placeHolder={disbursementInternal.identification}
        />
        <CardGray
          label={disbursementInternal.labelBirthdate}
          placeHolder={disbursementInternal.birthday}
        />
        <CardGray
          label={disbursementInternal.labelphone}
          placeHolder={disbursementInternal.phone}
        />
        <CardGray
          label={disbursementInternal.labelMail}
          placeHolder={disbursementInternal.mail}
        />
        <CardGray
          label={disbursementInternal.labelCity}
          placeHolder={disbursementInternal.city}
        />
        <CardGray
          label={disbursementInternal.labelAccount}
          placeHolder={disbursementInternal.account}
        />
      </Grid>
      <CardGray
        label={disbursementInternal.labelObservation}
        placeHolder={disbursementInternal.observation}
      />
    </Stack>
  );
}
