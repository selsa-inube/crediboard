import { inube, Stack, Button, Text } from "@inube/design-system";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useState, useEffect } from "react";

import { Requests } from "@services/types";
import { getById } from "@mocks/utils/dataMock.service";
import { capitalizeFirstLetterEachWord } from "@utils/formatData/text";
import { currencyFormat } from "@utils/formatData/currency";

export const CreditProfileInfo = () => {
  const navigation = useNavigate();

  const [data, setData] = useState({} as Requests);

  const { id } = useParams();

  useEffect(() => {
    getById("k_Prospe", "requests", id!).then((requirement) => {
      setData(requirement);
    });
  }, [id]);

  return (
    <Stack direction="column" margin="s250">
      <Stack justifyContent="space-between">
        <Button
          spacing="compact"
          variant="none"
          iconBefore={<MdArrowBack />}
          onClick={() => navigation(-1)}
        >
          Volver
        </Button>
        <Stack gap={inube.spacing.s200} alignItems="center">
          <Text type="title" appearance="gray">
            Perfil crediticio del cliente
          </Text>
          <Text type="headline" size="medium">
            {data.nnasocia ? capitalizeFirstLetterEachWord(data?.nnasocia) : ""}
          </Text>
          <Text type="title" size="small">
            {`S.C. No. ${data.aanumnit} ${currencyFormat(data.v_Monto)}`}
          </Text>
        </Stack>
        <Button>Imprimir</Button>
      </Stack>
    </Stack>
  );
};
