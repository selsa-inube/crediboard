import styled from "styled-components";
import { inube } from "@inube/design-system";

import { SectionOrientation } from "@components/layout/BoardSection/types";

interface IStyledBoardContainer {
  $orientation: SectionOrientation;
}

interface IStyledInputsContainer {
  theme?: typeof inube;
}

const StyledInputsContainer = styled.div<IStyledInputsContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ theme }) => theme?.spacing?.s400 || inube.spacing.s400};
  padding-right: ${({ theme }) => theme?.spacing?.s500 || inube.spacing.s500};
  padding-bottom: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
  padding-left: ${({ theme }) => theme?.spacing?.s500 || inube.spacing.s500};
  gap: ${inube.spacing.s500};
  box-shadow: 0px 1px 3px 0px #00000040;
`;

const StyledBoardContainer = styled.div<IStyledBoardContainer>`
  display: flex;
  flex-direction: ${({ $orientation }) =>
    $orientation === "horizontal" ? "column" : "row"};
  padding-top: ${({ theme }) => theme?.spacing?.s400 || inube.spacing.s400};
  padding-right: ${({ theme }) => theme?.spacing?.s500 || inube.spacing.s500};
  padding-bottom: ${({ theme }) => theme?.spacing?.s200 || inube.spacing.s200};
  padding-left: ${({ theme }) => theme?.spacing?.s500 || inube.spacing.s500};
  overflow: auto;
`;

export { StyledInputsContainer, StyledBoardContainer };
