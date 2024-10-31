import { MdAdd } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";
import { Divider } from "@inubekit/divider";
import { Button } from "@inubekit/button";

import { Fieldset } from "@components/data/Fieldset";
import { TableFinancialObligations } from "@components/data/TableObligationsFinancial";
import { dataReport } from "@components/data/TableObligationsFinancial/config";

export function ObligationsFinancial() {
  const isMobile = useMediaQuery("(max-width:880px)");

  return (
    <Fieldset>
      <Stack direction="column" height="auto" gap="15px">
        <Stack direction="column">
          <Stack alignItems="center">
            <Text size="small" type="label" appearance="gray" weight="bold">
              {dataReport.title}
            </Text>
          </Stack>
          <Stack justifyContent="space-between">
            <Text size="medium" type="title" appearance="dark">
              {dataReport.description}
            </Text>
            <Stack justifyContent="end">
              <Button
                children={dataReport.buttonText}
                iconBefore={<MdAdd />}
                fullwidth={isMobile}
              />
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack width="auto" justifyContent="center" margin="16px">
          <TableFinancialObligations />
        </Stack>
      </Stack>
      <Stack
        gap="15px"
        direction={!isMobile ? "row" : "column"}
        justifyContent="center"
      >
        <Stack direction="column" alignItems="center">
          <Text size="small" type="headline" appearance="gray">
            {dataReport.totalBalance}
          </Text>
          <Text size="small" type="body" appearance="gray">
            {dataReport.descriptionTotalBalance}
          </Text>
        </Stack>
        <Stack direction="column" alignItems="center">
          <Text size="small" type="headline" appearance="gray">
            {dataReport.totalFee}
          </Text>
          <Text size="small" type="body" appearance="gray">
            {dataReport.descriptionTotalFee}
          </Text>
        </Stack>
      </Stack>
    </Fieldset>
  );
}
