import { MdCheck } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Icon } from "@inubekit/icon";

import {
  StyledContainer,
  StyledUl,
  StyledLi,
  StyledImg,
  StyledContainerOption,
} from "./styles";
import { tokens } from "@design/tokens";
import { Divider } from "@inubekit/divider";
import { IBusinessUnitsPortalStaff } from "@services/businessUnitsPortalStaff/types";

interface BusinessUnitChangeProps {
  businessUnits: IBusinessUnitsPortalStaff[];
  selectedClient: string;
  onLogoClick: (businessUnit: IBusinessUnitsPortalStaff) => void;
}

const BusinessUnitChange = (props: BusinessUnitChangeProps) => {
  const { businessUnits, selectedClient, onLogoClick } = props;

  return (
    <StyledContainer>
      <Stack width="200px">
        <StyledUl>
          {businessUnits.map((businessUnit, index) => (
            <StyledContainerOption
              key={businessUnit.businessUnitPublicCode}
              onClick={() => onLogoClick(businessUnit)}
            >
              <StyledLi>
                <StyledImg
                  src={businessUnit.urlLogo}
                  alt={businessUnit.abbreviatedName}
                />
                {selectedClient === businessUnit.abbreviatedName && (
                  <Stack
                    margin={`${tokens.spacing.s0} ${tokens.spacing.s150} ${tokens.spacing.s0}`}
                  >
                    <Icon
                      icon={<MdCheck />}
                      appearance="primary"
                      size="24px"
                      cursorHover
                    />
                  </Stack>
                )}
              </StyledLi>
              {index !== businessUnits.length - 1 && <Divider />}
            </StyledContainerOption>
          ))}
        </StyledUl>
      </Stack>
    </StyledContainer>
  );
};

export { BusinessUnitChange };
