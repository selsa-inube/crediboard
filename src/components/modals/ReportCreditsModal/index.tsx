import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { MdAdd, MdClear } from "react-icons/md";

import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";

import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { Blanket } from "@inubekit/blanket";
import { useMediaQuery } from "@inubekit/hooks";
import { SkeletonLine } from "@inubekit/skeleton";

import { TableFinancialObligations } from "@pages/prospect/components/TableObligationsFinancial";
import { dataReport } from "@pages/prospect/components/TableObligationsFinancial/config";

import { ActionModal } from "./Actions";
import { StyledContainerClose, StyledContainer } from "./styles";

export interface ReportCreditsModalProps {
  handleClose: () => void;
  portalId?: string;
  totalBalance?: number;
  totalFee?: number;
}

export function ReportCreditsModal(props: ReportCreditsModalProps) {
  const { portalId, handleClose, totalBalance, totalFee } = props;

  const [loading, setLoading] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const isMobile = useMediaQuery("(max-width:880px)");

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          gap="24px"
          height="auto"
          width={!isMobile ? "1050px" : "auto"}
        >
          <Stack justifyContent="space-between" alignItems="center" gap="15px">
            <Text size="small" type="headline">
              {dataReport.title}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text>{dataReport.close}</Text>
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
          {loading ? (
            <></>
          ) : (
            <Stack justifyContent="end">
              <Button
                children={dataReport.addObligations}
                iconBefore={<MdAdd />}
                fullwidth={isMobile}
              />
            </Stack>
          )}
          <TableFinancialObligations />
          <Stack gap="15px" direction={!isMobile ? "row" : "column"}>
            {loading ? (
              <SkeletonLine />
            ) : (
              <Textfield
                id="field1"
                label={dataReport.totalFee}
                placeholder="$0"
                size="compact"
                type="number"
                value={totalFee}
                fullwidth
              />
            )}
            {loading ? (
              <SkeletonLine />
            ) : (
              <Textfield
                id="field2"
                label={dataReport.totalBalance}
                placeholder="$0"
                size="compact"
                type="number"
                value={totalBalance}
                fullwidth
              />
            )}
          </Stack>
          {ModalOpen && <ActionModal onClose={() => setModalOpen(false)} />}
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
