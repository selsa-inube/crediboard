import { Stack } from "@inubekit/inubekit";

import { SourceIncome } from "@pages/prospect/components/SourceIncome";
import { Fieldset } from "@components/data/Fieldset";

interface ISourcesOfIncomeProps {
  isMobile: boolean;
}

export function SourcesOfIncome(props: ISourcesOfIncomeProps) {
  const { isMobile } = props;

  return (
    <Fieldset>
      <Stack padding={isMobile ? "6px" : "0px"} justifyContent="center">
        <SourceIncome disabled={true} />
      </Stack>
    </Fieldset>
  );
}
