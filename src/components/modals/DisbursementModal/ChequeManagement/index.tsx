import { Grid } from "@inubekit/grid";
import { Stack } from "@inubekit/stack";
import { disbursementChequeManagement } from "@mocks/disbursement/disbursement.mock";
import { CardGray } from "@components/cards/CardGray";

export function DisbursementChequeManagement() {
  return (
    <Stack direction="column">
      <Grid templateColumns="repeat(2, 1fr)" gap="16px 20px" autoRows="auto">
        <CardGray
          label={disbursementChequeManagement.labelAmount}
          placeHolder={disbursementChequeManagement.amount}
        />
        <CardGray
          label={disbursementChequeManagement.labelToggle}
          placeHolder={disbursementChequeManagement.toggleChecked}
        />
        <CardGray
          label={disbursementChequeManagement.labelName}
          placeHolder={disbursementChequeManagement.name}
        />
        <CardGray
          label={disbursementChequeManagement.labelLastName}
          placeHolder={disbursementChequeManagement.lastName}
        />
        <CardGray
          label={disbursementChequeManagement.labelSex}
          placeHolder={disbursementChequeManagement.sex}
        />
        <CardGray
          label={disbursementChequeManagement.labelDocumentType}
          placeHolder={disbursementChequeManagement.typeDocument}
        />
        <CardGray
          label={disbursementChequeManagement.labelDocumentNumber}
          placeHolder={disbursementChequeManagement.identification}
        />
        <CardGray
          label={disbursementChequeManagement.labelBirthdate}
          placeHolder={disbursementChequeManagement.birthday}
        />
        <CardGray
          label={disbursementChequeManagement.labelphone}
          placeHolder={disbursementChequeManagement.phone}
        />
        <CardGray
          label={disbursementChequeManagement.labelMail}
          placeHolder={disbursementChequeManagement.mail}
        />
        <CardGray
          label={disbursementChequeManagement.labelCity}
          placeHolder={disbursementChequeManagement.city}
        />
      </Grid>
      <CardGray
        label={disbursementChequeManagement.labelObservation}
        placeHolder={disbursementChequeManagement.observation}
      />
    </Stack>
  );
}
