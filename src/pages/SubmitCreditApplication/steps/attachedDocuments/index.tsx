import { Stack } from "@inubekit/stack";

import { Fieldset } from "@components/data/Fieldset";
import { TableAttachedDocuments } from "@pages/prospect/components/tableAttachedDocuments";

interface IAttachedDocumentsProps {
  isMobile: boolean;
  initialValues: {
    [key: string]: { id: string; name: string; file: File }[];
  };
  handleOnChange: (files: {
    [key: string]: { id: string; name: string; file: File }[];
  }) => void;
}

export function AttachedDocuments(props: IAttachedDocumentsProps) {
  const { isMobile, initialValues, handleOnChange } = props;

  return (
    <Fieldset>
      <Stack padding="16px">
        <TableAttachedDocuments
          isMobile={isMobile}
          uploadedFilesByRow={initialValues}
          setUploadedFilesByRow={handleOnChange}
        />
      </Stack>
    </Fieldset>
  );
}
