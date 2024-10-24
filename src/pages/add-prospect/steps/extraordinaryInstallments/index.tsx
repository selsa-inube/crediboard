import { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { Button } from "@inubekit/button";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";

import { AddSeriesModal } from "@components/modals/AddSeriesModal";
import { IExtraordinaryPayment } from "@services/types";
import {
  paymentMethodOptions,
  frequencyOptions,
} from "@components/modals/AddSeriesModal/config";

import { TextLabels } from "./config/types";
import { TableExtraordinaryInstallment } from "@components/data/TableExtraordinaryInstallment";

export interface ExtraordinaryInstallmentsProps {
  dataTable: IExtraordinaryPayment[];
  onClickDetails?: (id: string) => void;
  onClickEdit?: (id: string) => void;
  onClickEliminate?: (id: string) => void;
}

export const ExtraordinaryInstallments = (
  props: ExtraordinaryInstallmentsProps
) => {
  const { dataTable, onClickDetails, onClickEdit, onClickEliminate } = props;
  const isMobile = useMediaQuery("(max-width:880px)");
  const [isAddSeriesModalOpen, setAddSeriesModalOpen] = useState(false);

  const openAddSeriesModal = () => {
    setAddSeriesModalOpen(true);
  };

  const closeAddSeriesModal = () => {
    setAddSeriesModalOpen(false);
  };

  const handleSubmit = () => {
    closeAddSeriesModal();
  };

  const handleConfirm = () => {
    console.log("Confirmar acción");
  };

  return (
    <>
      <Stack gap="16px" direction="column">
        <Stack gap="24px" direction="column">
          <Stack justifyContent="end">
            <Button
              type="button"
              appearance="primary"
              spacing="wide"
              fullwidth={isMobile}
              iconBefore={
                <Icon
                  icon={<MdOutlineAdd />}
                  appearance="light"
                  size="18px"
                  spacing="narrow"
                />
              }
              onClick={openAddSeriesModal}
            >
              {TextLabels.addSeries}
            </Button>
          </Stack>
          <Stack justifyContent="center">
            {dataTable.length > 0 ? (
              <TableExtraordinaryInstallment
                data={dataTable}
                onClickDetails={onClickDetails}
                onClickEdit={onClickEdit}
                onClickEliminate={onClickEliminate}
              />
            ) : (
              <Text size="large" type="label" appearance="gray" weight="bold">
                {TextLabels.NoData}
              </Text>
            )}
          </Stack>
          <Stack></Stack>
        </Stack>
      </Stack>
      {isAddSeriesModalOpen && (
        <AddSeriesModal
          title="Nueva serie"
          handleClose={closeAddSeriesModal}
          onSubmit={handleSubmit}
          onConfirm={handleConfirm}
          buttonText="Cancelar"
          secondButtonText="Agregar"
          formValues={{ field1: 0, field2: 0 }}
          initialValues={{ field1: 0, field2: 0 }}
          paymentMethodOptions={paymentMethodOptions}
          frequencyOptions={frequencyOptions}
        />
      )}
    </>
  );
};
