import { useState, useContext } from "react";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";
import { MdCheck } from "react-icons/md";
import { Icon } from "@inube/design-system";
import { AppContext } from "@context/AppContext"; 
import { IClient } from "@context/AppContext/types"; 

import cooservunal from "@assets/mocks_images/cooservunal.png";
import corbanca from "@assets/mocks_images/corbanca.png";
import fondecom from "@assets/mocks_images/fondecom.png";

import { StyledBusiness } from "./styles";


export const BusinessUnitChange = () => {
  const { handleClientChange } = useContext(AppContext); 
  const [selectedClient, setSelectedClient] = useState<string>("");

  const handleLogoClick = (client: IClient) => {
    handleClientChange(client); 
    setSelectedClient(client.sigla); 
  };

  const clients = [
    { id: "1", sigla: "linpar", name: "Linpar", logo: "https://res.cloudinary.com/wfercanas/image/upload/w_500/v1671482962/linpar/presente_trxel5" },
    { id: "2", sigla: "cooservunal", name: "Cooservunal", logo: cooservunal },
    { id: "3", sigla: "corbanca", name: "Corbanca", logo: corbanca },
    { id: "4", sigla: "fondecom", name: "Fondecom", logo: fondecom },
  ];

  return (
    <StyledBusiness>
      <Stack width="220px">
        <ul>
          {clients.map((client, index) => (
            <a
              key={client.id}
              href="#"
              onClick={() => handleLogoClick(client)}
            >
              <li>
                <img src={client.logo} alt={client.name} />
                <Icon
                  icon={<MdCheck />}
                  appearance={selectedClient === client.sigla ? "primary" : "gray"}
                  size="20px"
                  cursorHover
                />
              </li>
              {index !== clients.length - 1 && <Divider />}
            </a>
          ))}
        </ul>
      </Stack>
    </StyledBusiness>
  );
};
