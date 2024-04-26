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
  padding: ${inube.spacing.s400} ${inube.spacing.s600} ${inube.spacing.s200};
  gap: ${inube.spacing.s500};
  box-shadow: 0px 1px 3px 0px #00000040;
`;

const StyledBoardContainer = styled.div<IStyledBoardContainer>`
  display: flex;
  flex-direction: ${({ $orientation }) =>
    $orientation === "horizontal" ? "column" : "row"};
  padding: ${inube.spacing.s400} ${inube.spacing.s600} ${inube.spacing.s200};
  overflow: auto;
`;

export { StyledInputsContainer, StyledBoardContainer };
