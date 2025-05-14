import { useState, useEffect } from "react";
import { MdAdd, MdCached } from "react-icons/md";

import { Stack, useMediaQuery, Select, Button } from "@inubekit/inubekit";

import { BaseModal } from "@components/modals/baseModal";
import { TableFinancialObligations } from "@pages/prospect/components/TableObligationsFinancial";
import { dataReport } from "@pages/prospect/components/TableObligationsFinancial/config";

export interface ReportCreditsModalProps {
  handleClose: () => void;
  onChange: (name: string, newValue: string) => void;
  options: { id: string; label: string; value: string }[];
  totalBalance?: number;
  totalFee: number;
  debtor: string;
}

export function ReportCreditsModal(props: ReportCreditsModalProps) {
  const { handleClose, onChange, options, debtor } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  const isMobile = useMediaQuery("(max-width:880px)");

  return (
    <BaseModal
      title={dataReport.title}
      nextButton={dataReport.close}
      handleNext={handleClose}
      handleClose={handleClose}
      width={!isMobile ? "1050px" : "290px"}
    >
      <Stack direction="column" gap="16px">
        {loading ? (
          <></>
        ) : (
          <Stack
            justifyContent="space-between"
            direction={isMobile ? "column" : "row"}
            gap="16px"
          >
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
            <Stack alignItems="end" gap="16px">
              <Button iconAfter={<MdCached />} variant="outlined">
                {dataReport.restore}
              </Button>
              <Button iconAfter={<MdAdd />}>{dataReport.addObligations}</Button>
            </Stack>
          </Stack>
        )}
        <TableFinancialObligations showActions={true} />
      </Stack>
    </BaseModal>
  );
}
