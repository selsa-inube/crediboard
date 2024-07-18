import styled from "styled-components";

import { inube } from "@inube/design-system";

const StyledWelcomeContainer = styled.div`
  background-color: ${inube.color.surface.dark.clear};
`;

const StyledOutletContainer = styled(StyledWelcomeContainer)`
  background-color: ${inube.color.surface.light.clear};
`;

export { StyledWelcomeContainer, StyledOutletContainer };
