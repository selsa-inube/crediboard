import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { currencyFormat } from "@utils/formatData/currency";

import { CreditLimit } from "@components/modals/CreditLimit";
import { StyledContainer } from "./styles";

export interface CreditLimitProps {
  creditLine: number;
  creditLineTxt: string;
}

export function CreditLimitCard(props: CreditLimitProps) {
  const { creditLine, creditLineTxt } = props;
  const [creditModal, setCreditModal] = useState(false);
  const [loadingCredit, setLoadingCredit] = useState(false);

  const handleOpenModal = () => {
    setCreditModal(true);
    setLoadingCredit(true);
    setTimeout(() => {
      setLoadingCredit(false);
    }, 2000);
  };

  return (
    <StyledContainer>
      <Stack direction="column" gap="6px" alignItems="center">
        <Text type="title" size="large" appearance="primary" weight="bold">
          {currencyFormat(creditLine)}
        </Text>
        <Divider dashed />
        <Stack direction="row" gap="6px" justifyContent="center">
          <Icon
            icon={<MdInfoOutline />}
            appearance="primary"
            size="16px"
            onClick={handleOpenModal}
            cursorHover
          />
          <Text type="body" size="small" appearance="gray" weight="normal">
            {creditLineTxt}
          </Text>
        </Stack>
      </Stack>

      {creditModal && (
        <CreditLimit
          handleClose={() => setCreditModal(false)}
          title="Origen de cupo"
          portalId="portal"
          loading={loadingCredit}
          onOpenPaymentCapacityModal={() => {}}
          onOpenReciprocityModal={() => {}}
          onOpenFrcModal={() => {}}
        />
      )}
    </StyledContainer>
  );
}
