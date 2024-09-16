import { Stack } from "@inubekit/stack";
import { Grid } from "@inubekit/grid";
import { Approvals } from "../Approvals";
import { PromissoryNotes } from "../PromissoryNotes";
import { Postingvouchers } from "../Postingvouchers";

interface FinancialReportingDocumentProps {
  id: string;
}

function FinancialReportingDocument(props: FinancialReportingDocumentProps) {
  const { id } = props;

  return (
    <Stack padding="48px 64px" gap="20px" width="21cm" direction="column">
      <Grid templateColumns="1fr" gap="16px" autoRows="auto" width="100%">
        {id}
        <Stack direction="column" width="100%">
          {<Approvals user={id} />}
        </Stack>
        <Stack direction="column" width="100%">
          {<PromissoryNotes user={id} />}
        </Stack>
        <Stack direction="column" width="100%">
          {<Postingvouchers />}
        </Stack>
      </Grid>
    </Stack>
  );
}

export { FinancialReportingDocument };
