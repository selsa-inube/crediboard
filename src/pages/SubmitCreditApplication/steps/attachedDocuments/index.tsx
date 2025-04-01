import { Stack } from "@inubekit/stack";

import { Fieldset } from "@components/data/Fieldset";
import { TableAttachedDocuments } from "@pages/prospect/components/tableAttachedDocuments";

interface IAttachedDocumentsProps {
  isMobile: boolean;
}

export function AttachedDocuments(props: IAttachedDocumentsProps) {
  const { isMobile } = props;

  return (
    <Fieldset>
      <Stack padding="16px">
        <TableAttachedDocuments isMobile={isMobile} />
      </Stack>
    </Fieldset>
  );
}
