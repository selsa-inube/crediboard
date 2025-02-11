import { SourceIncome } from "@pages/prospect/components/SourceIncome";
import { Fieldset } from "@components/data/Fieldset";
import { Stack } from "@inubekit/stack";

interface ISourcesOfIncomeProps {
  isMobile: boolean;
}

export function SourcesOfIncome(props: ISourcesOfIncomeProps) {
  const { isMobile } = props;

  return (
    <Fieldset>
      <Stack padding={isMobile ? "6px" : "0px"} justifyContent="center">
        <SourceIncome
          disabled={true}
          onlyDebtor
        />
      </Stack>
    </Fieldset>
  );
}
