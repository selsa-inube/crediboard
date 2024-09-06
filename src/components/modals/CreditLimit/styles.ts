import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledModal {
  $smallScreen: boolean;
}

export const StyledDollarSign = styled.span`
  color: green;
  margin-right: 4px;
`;

export const StyledDivider = styled.hr`
  border: none;
  border-top: 2px solid #DFE1E6;
  margin: 4px;
`;

export const StyledRow = styled.div`
  display: flex;
  justify-content: space-between; 
  padding: 8px;
`;

export const StyledLabel = styled.div`
  flex: 3; 
  text-align: left;
`;

export const StyledAmount = styled.div`
  flex: 1;
  text-align: right; 
`;

export const StyledContainerText = styled.div`
  padding: 10px 0px 10px;
  font-size: ${inube.typography.body.small.size};
  color: ${inube.color.text.neutral};
  display: flex;
`;

export const StyledUpdateButton = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 10px;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StyledModal = styled.div<IStyledModal>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: ${({ $smallScreen }) => ($smallScreen ? "398px" : "none")}; 
  width: ${({ $smallScreen }) => ($smallScreen ? "280px" : "550px")};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s300};
  gap: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s150 : inube.spacing.s150};
  border-radius: ${inube.spacing.s100};
`;

export const StyledContainerContent = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: "8px";
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
`;

export const StyledContainerTitle = styled.div`
  display: flex;
  margin: 0px;
  padding: 0px;
  justify-content: space-between;
`;
