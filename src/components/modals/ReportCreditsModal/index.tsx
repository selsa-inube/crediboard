import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { MdAdd, MdClear } from "react-icons/md";

import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";

import { Text } from "@inubekit/text";
import { Blanket } from "@inubekit/blanket";
import { useMediaQuery } from "@inubekit/hooks";
import { SkeletonLine } from "@inubekit/skeleton";

import { TableFinancialObligations } from "@pages/prospect/components/TableObligationsFinancial";
import { dataReport } from "@pages/prospect/components/TableObligationsFinancial/config";
import { Select } from "@inubekit/select";

import { StyledContainerClose, StyledContainer } from "./styles";
import { NewPrice } from "./components/newPrice";

export interface ReportCreditsModalProps {
  handleClose: () => void;
  onChange: (name: string, newValue: string) => void;
  options: { id: string; label: string; value: string }[];
  totalBalance: number;
  totalFee: number;
  debtor: string;
  portalId?: string;
}

export function ReportCreditsModal(props: ReportCreditsModalProps) {
  const {
    portalId,
    handleClose,
    onChange,
    options,
    totalBalance,
    totalFee,
    debtor,
  } = props;

  const [loading, setLoading] = useState(true);

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
            <Stack justifyContent="space-between">
              <Select
                id="income"
                name="deudor"
                label="Deudor"
                placeholder="Seleccione una opción"
                options={options}
                value={debtor}
                onChange={(name, value) => onChange(name, value)}
                size="compact"
              />
              <Stack alignItems="end">
                <Button
                  children={dataReport.addObligations}
                  iconBefore={<MdAdd />}
                  fullwidth={isMobile}
                />
              </Stack>
            </Stack>
          )}
          <TableFinancialObligations showActions={true} />
          <Stack gap="15px" direction={!isMobile ? "row" : "column"}>
            {loading ? (
              <SkeletonLine />
            ) : (
              <NewPrice value={totalFee} label={dataReport.totalFee} />
            )}
            {loading ? (
              <SkeletonLine />
            ) : (
              <NewPrice value={totalBalance} label={dataReport.totalBalance} />
            )}
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
