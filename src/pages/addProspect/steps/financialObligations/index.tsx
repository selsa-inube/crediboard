import { useState } from "react";
import { FormikValues } from "formik";
import { MdAdd, MdCached } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Divider } from "@inubekit/divider";
import { Button } from "@inubekit/button";

import { FinancialObligationModal } from "@components/modals/financialObligationModal";
import { Fieldset } from "@components/data/Fieldset";
import { TableFinancialObligations } from "@pages/prospect/components/TableObligationsFinancial";
import { dataReport } from "@pages/prospect/components/TableObligationsFinancial/config";

interface IObligationsFinancialProps {
  isMobile: boolean;
}

export function ObligationsFinancial(props: IObligationsFinancialProps) {
  const { isMobile } = props;

  const [openModal, setOpenModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const initialValues: FormikValues = {
    type: "",
    entity: "",
    fee: "",
    balance: "",
    payment: "",
    feePaid: "",
    term: "",
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <Fieldset>
      <Stack direction="column" height="auto" gap="20px" padding="16px">
        <Stack direction="column">
          <Stack alignItems="center">
            <Text size="small" type="label" appearance="gray" weight="bold">
              {dataReport.title}
            </Text>
          </Stack>
          <Stack justifyContent="space-between" alignItems="end">
            <Text size="medium" type="title" appearance="dark">
              {dataReport.description}
            </Text>
            <Stack justifyContent="end" gap="16px">
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
                  onClick={() => setOpenModal(true)}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack width="auto" justifyContent="center" margin="16px">
          <TableFinancialObligations refreshKey={refreshKey} />
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
        {openModal && (
          <FinancialObligationModal
            title="Agregar obligaciones"
            onCloseModal={handleCloseModal}
            onConfirm={() => console.log("ok")}
            initialValues={initialValues}
            confirmButtonText="Agregar"
          />
        )}
      </Stack>
    </Fieldset>
  );
}
