import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { MdCheck } from "react-icons/md";

import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";
import { AppContext } from "@context/AppContext";
import { IClient } from "@context/AppContext/types";

import { StyledContainer, StyledUl, StyledItem, StyledImg, StyledHr } from "./styles";

interface BusinessUnitChangeProps {
  clients: IClient[];
}

export const BusinessUnitChange = ({ clients }: BusinessUnitChangeProps) => {
  const { handleClientChange } = useContext(AppContext);
  const [selectedClient, setSelectedClient] = useState<string>(() => {
    return localStorage.getItem('selectedClientSigla') || "";
  });

  useEffect(() => {
    localStorage.setItem('selectedClientSigla', selectedClient)
  }, [selectedClient])

  const handleLogoClick = (client: IClient) => {
    handleClientChange(client);
    setSelectedClient(client.sigla);
  };

  return (
    <StyledContainer>
      <Stack width="220px">
        <StyledUl>
          {clients.map((client, index) => (
            <Link key={client.id} to="#" onClick={() => handleLogoClick(client)}>
              <StyledItem>
                <StyledImg src={client.logo} alt={client.name} />
                {selectedClient === client.sigla && (
                <Icon
                  icon={<MdCheck />}
                  appearance="primary"
                  size="20px"
                  cursorHover
                />
              )}
              </StyledItem>
              {index !== clients.length - 1 && <StyledHr />}
            </Link>
          ))}
        </StyledUl>
      </Stack>
    </StyledContainer>
  );
};
