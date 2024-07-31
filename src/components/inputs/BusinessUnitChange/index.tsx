import { useState, useContext } from "react";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inube/design-system";
import { AppContext } from "@context/AppContext";
import { IClient } from "@context/AppContext/types";
import { MdCheck } from "react-icons/md";

import { StyledContainer, StyledUl, StyledImg, StyledHr} from "./styles";

interface BusinessUnitChangeProps {
  clients: IClient[];
}

export const BusinessUnitChange = ({ clients }: BusinessUnitChangeProps) => {
  const { handleClientChange } = useContext(AppContext);
  const [selectedClient, setSelectedClient] = useState("");

  const handleLogoClick = (client: IClient) => {
    handleClientChange(client);
    setSelectedClient(client.sigla);
  };

  return (
    <StyledContainer>
      <Stack width="220px">
        <StyledUl>
          {clients.map((client, index) => (
            <a key={client.id} href="" onClick={() => handleLogoClick(client)}>
              <li>
                <StyledImg src={client.logo} alt={client.name} />
                <Icon
                  icon={<MdCheck />}
                  appearance={
                    selectedClient === client.sigla ? "primary" : "gray"
                  }
                  size="20px"
                  cursorHover
                />
              </li>
              {index !== clients.length - 1 && <StyledHr />}
            </a>
          ))}
        </StyledUl>
      </Stack>
    </StyledContainer>
  );
};
