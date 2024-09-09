import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledModal {
  $smallScreen: boolean;
}

export const StyledDollarSign = styled.span`
  color: #28a745;
  margin-right: 4px;
`;

export const StyledDivider = styled.hr`
  border: none;
  border-top: 2px solid #dfe1e6;
  margin: 1px;
`;

export const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  align-items: center;
`;

export const StyledLabel = styled.div`
  flex: 3.3;
  text-align: left;

  @media (max-width: 700px) {
    flex: 1.5;
  }
`;

export const StyledAmount = styled.div`
  flex: 1;
`;

export const StyledAmountWithIcon = styled(StyledAmount)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

`;

export const StyledContainerText = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

export const StyledUpdateButton = styled.div`
  display: flex;
  justify-content: end;
  padding: 10px 0;
  width: 100%;
`;

export const StyledModal = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  max-height: ${({ $smallScreen }) => ($smallScreen ? "700px" : "500px")};
  width: ${({ $smallScreen }) => ($smallScreen ? "335px" : "550px")};
  background-color: ${({ theme }) =>
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
  padding: ${({ $smallScreen }) =>
    $smallScreen ? "16px" : "24px"};
  gap: ${({ $smallScreen }) =>
    $smallScreen ? "8px" : "8px"};
  border-radius: ${inube.spacing.s100};
`;

export const StyledContainerContent = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

export const StyledContainerClose = styled.div`
  cursor: pointer;
  display: flex;
`;

export const StyledContainerTitle = styled.div`
  display: flex;
  margin: 0px;
  padding: 0px;
  justify-content: space-between;
`;
