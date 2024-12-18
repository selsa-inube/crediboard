import { MdAdd, MdCached } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Divider } from "@inubekit/divider";
import { Button } from "@inubekit/button";

import { CardBorrower } from "@components/cards/CardBorrower";
import { Fieldset } from "@components/data/Fieldset";
import { TableFinancialObligations } from "@pages/prospect/components/TableObligationsFinancial";
import { dataReport } from "@pages/prospect/components/TableObligationsFinancial/config";

interface IObligationsFinancialProps {
  isMobile: boolean;
}

export function ObligationsFinancial(props: IObligationsFinancialProps) {
  const { isMobile } = props;

  return (
    <Fieldset>
      <Stack
        direction="column"
        height="auto"
        gap="20px"
        padding={isMobile ? "8px" : "16px"}
      >
        <Stack direction="column">
          <Stack alignItems="center">
            {!isMobile && (
              <Text size="small" type="label" appearance="gray" weight="bold">
                {dataReport.title}
              </Text>
            )}
          </Stack>
          <Stack
            justifyContent="space-between"
            alignItems={isMobile ? "normal" : "end"}
            direction={isMobile ? "column" : "row"}
          >
            {!isMobile && (
              <Text size="medium" type="title" appearance="dark">
                {dataReport.description}
              </Text>
            )}
            {isMobile && (
              <Stack padding="0px 0px 10px 0px">
                <CardBorrower label={dataReport.title} placeHolder={dataReport.description} />
              </Stack>
            )}
            <Stack
              justifyContent="end"
              gap="16px"
              direction={isMobile ? "column" : "row"}
              width={isMobile ? "100%" : "auto"}
            >
              <Stack>
                <Button
                  children="Restablecer"
                  iconBefore={<MdCached />}
                  fullwidth={isMobile}
                  variant="outlined"
                  spacing="wide"
                />
              </Stack>
              <Stack>
                <Button
                  children={dataReport.addObligations}
                  iconBefore={<MdAdd />}
                  fullwidth={isMobile}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          width="auto"
          justifyContent="center"
          margin={isMobile ? "none" : "16px"}
        >
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
