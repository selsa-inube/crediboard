import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Icon } from "@inubekit/icon";
import { Blanket } from "@inubekit/blanket";

import { SourceIncome } from "@pages/prospect/components/SourceIncome";

import { StyledContainer, StyledContainerClose } from "./styles";

interface IncomeModalProps {
  form: {
    borrower: string;
    monthly_salary?: number;
    other_monthly_payments?: number;
    pension_allowances?: number;
    leases?: number;
    dividends_or_shares?: number;
    financial_returns?: number;
    average_monthly_profit?: number;
    monthly_fees?: number;
  };
  onChange: (name: string, newValue: string) => void;
  options: { id: string; label: string; value: string }[];
  portalId?: string;
  handleClose?: () => void;
}

export function IncomeModal(props: IncomeModalProps) {
  const { form, onChange, options, portalId, handleClose } = props;

  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    const allFieldsFilled = [
      form.borrower,
      form.monthly_salary,
      form.other_monthly_payments,
      form.pension_allowances,
      form.leases,
      form.dividends_or_shares,
      form.financial_returns,
      form.average_monthly_profit,
      form.monthly_fees,
    ].every((field) => field !== undefined && field !== "");

    setIsFormComplete(allFieldsFilled);
  }, [form]);

  const isMobile = useMediaQuery("(max-width:880px)");

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledContainer $smallScreen={isMobile}>
        <Stack
          direction="column"
          padding="16px 24px"
          gap="16px"
          width={isMobile ? "auto" : "1002px"}
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text size="small" type="headline">
              Fuentes de ingreso
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text>Cerrar</Text>
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
          <SourceIncome
            form={form}
            onChange={onChange}
            options={options}
            ShowSupport
          />
          <Divider />
          <Stack
            padding="10px 0px"
            justifyContent="end"
            alignItems={!isMobile ? "end" : "end"}
            direction={!isMobile ? "row" : "column"}
            gap="20px"
          >
            <Stack
              justifyContent="end"
              gap="15px"
              margin={!isMobile ? "none" : "15px 0px"}
              width={!isMobile ? "auto" : "100%"}
            >
              <Button
                children="Cerrar"
                appearance="gray"
                variant="outlined"
                onClick={handleClose}
              />
              <Button
                children="Guardar"
                appearance={isFormComplete ? "primary" : "gray"}
                disabled={!isFormComplete}
              />
            </Stack>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}

export type { IncomeModalProps };
