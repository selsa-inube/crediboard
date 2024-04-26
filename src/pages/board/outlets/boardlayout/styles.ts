import styled from "styled-components";
import { inube } from "@inube/design-system";

import { SectionOrientation } from "@components/layout/BoardSection/types";

interface IStyledBoardContainer {
  $orientation: SectionOrientation;
}

const StyledInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${inube.spacing.s400};
  padding-right: ${inube.spacing.s600};
  padding-bottom: ${inube.spacing.s200};
  padding-left: ${inube.spacing.s600};
  gap: ${inube.spacing.s500};
  box-shadow: 0px 1px 3px 0px #00000040;
`;

const StyledBoardContainer = styled.div<IStyledBoardContainer>`
  display: flex;
  flex-direction: ${({ $orientation }) =>
    $orientation === "horizontal" ? "column" : "row"};
  padding-top: ${inube.spacing.s400};
  padding-right: ${inube.spacing.s600};
  padding-bottom: ${inube.spacing.s200};
  padding-left: ${inube.spacing.s600};
  overflow: auto;
`;

export { StyledInputsContainer, StyledBoardContainer };
