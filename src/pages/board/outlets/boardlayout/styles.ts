import styled from "styled-components";
import { SectionOrientation } from "@components/layout/BoardSection/types";

interface IStyledBoardContainer {
  $orientation: SectionOrientation;
  $isMobile: boolean;
}

interface IStyledInputsContainer {
  $isMobile: boolean;
}

const StyledInputsContainer = styled.div<IStyledInputsContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${({ $isMobile }) => ($isMobile ? "12px" : "32px")};
  padding-right: ${({ $isMobile }) => ($isMobile ? "16px" : "12px")};
  padding-bottom: 16px;
  padding-left: ${({ $isMobile }) => ($isMobile ? "16px" : "12px")};
  gap: 40px;
  box-shadow: ${({ $isMobile }) => !$isMobile && "0px 6px 3px -5px #00000040"};
`;

const StyledBoardContainer = styled.div<IStyledBoardContainer>`
  display: flex;
  flex-direction: ${({ $orientation }) =>
    $orientation === "horizontal" ? "column" : "row"};
  padding-top: ${({ $isMobile }) => ($isMobile ? "0px" : "32px")};
  padding-right: ${({ $isMobile }) => ($isMobile ? "16px" : "8px")};
  padding-bottom: 16px;
  padding-left: ${({ $isMobile }) => ($isMobile ? "16px" : "8px")};
  overflow: auto;
`;

export const StyledContainerToCenter = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto; 
  max-width: 1440px; 
  width: 100%; 
  align-items: center;
`;

export { StyledInputsContainer, StyledBoardContainer };
