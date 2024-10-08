import { useState } from "react";
import { createPortal } from "react-dom";
import { MdClear, MdOutlineAdd } from "react-icons/md";
import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Button } from "@inubekit/button";
import { useMediaQuery } from "@inubekit/hooks";

import { TableExtraordinaryInstallment } from "@src/components/data/TableExtraordinaryInstallment";
import { IExtraordinaryPayment } from "@src/services/types";
import { StyledContainerClose, StyledContainerContent } from "./styles";
import { TextLabels } from "./config";
import { AddSeriesModal } from "@components/modals/AddSeriesModal";

import {
  paymentMethodOptions,
  frequencyOptions,
  firstPaymentOptions,
} from "@components/modals/AddSeriesModal/config";

export interface ExtraordinaryPaymentModalProps {
  dataTable: IExtraordinaryPayment[];
  portalId: string;
  handleClose: () => void;
  onClickDetails?: (id: string) => void;
  onClickEdit?: (id: string) => void;
  onClickEliminate?: (id: string) => void;
}

export const ExtraordinaryPaymentModal = (
  props: ExtraordinaryPaymentModalProps
) => {
  const {
    dataTable,
    handleClose,
    portalId,
    onClickDetails,
    onClickEdit,
    onClickEliminate,
  } = props;

  const [isAddSeriesModalOpen, setAddSeriesModalOpen] = useState(false);
  const node = document.getElementById(portalId ?? "portal");
  const isMobile = useMediaQuery("(max-width:880px)");

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const openAddSeriesModal = () => {
    setAddSeriesModalOpen(true);
  };

  const closeAddSeriesModal = () => {
    setAddSeriesModalOpen(false);
  };

  const handleSubmit = () => {
    closeAddSeriesModal();
  };

  return createPortal(
    <>
      <Blanket>
        <StyledContainerContent $isMobile={isMobile}>
          <Stack gap="16px" direction="column">
            <Stack justifyContent="space-between">
              <Text type="headline" size="small" appearance="dark">
                {TextLabels.extraPayments}
              </Text>
              <StyledContainerClose onClick={handleClose}>
                <Stack alignItems="center" gap="8px">
                  <Text>{TextLabels.close}</Text>
                  <Icon
                    icon={<MdClear />}
                    size="24px"
                    cursorHover
                    appearance="dark"
                  />
                </Stack>
              </StyledContainerClose>
            </Stack>
            <Divider />
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
                      spacing="compact"
                    />
                  }
                  onClick={openAddSeriesModal}
                >
                  {TextLabels.addSeries}
                </Button>
              </Stack>
              <Stack>
                <TableExtraordinaryInstallment
                  data={dataTable}
                  onClickDetails={onClickDetails}
                  onClickEdit={onClickEdit}
                  onClickEliminate={onClickEliminate}
                />
              </Stack>
              <Divider />
              <Stack justifyContent="end">
                <Button
                  appearance="primary"
                  fullwidth={isMobile}
                  onClick={handleClose}
                  spacing="wide"
                  type="button"
                >
                  {TextLabels.close}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </StyledContainerContent>
      </Blanket>
      {isAddSeriesModalOpen && (
        <AddSeriesModal
          title="Agregar serie"
          handleClose={closeAddSeriesModal}
          onSubmit={handleSubmit}
          buttonText="Cancelar"
          secondButtonText="Agregar"
          formValues={{ field1: 0, field2: 0 }}
          paymentMethodOptions={paymentMethodOptions} 
          frequencyOptions={frequencyOptions} 
          firstPaymentOptions={firstPaymentOptions}
          portalId={portalId}
        />
      )}
    </>,
    node
  );
};
