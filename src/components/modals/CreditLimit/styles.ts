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
  padding: 12px 0px;
`;

export const StyledLabel = styled.div`
  flex: 3.5;
  font-size: ${inube.typography.body.small.size};
`;

export const StyledAmount = styled.div`
  flex: 1;
  text-align: right;
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
  justify-content: flex-end;
`;

export const StyledModal = styled.div<IStyledModal>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: ${({ $smallScreen }) => ($smallScreen ? "398px" : "none")};
  width: ${({ $smallScreen }) => ($smallScreen ? "280px" : "550px")};
  background-color: #ffffff;
  padding: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s200 : inube.spacing.s200};
  gap: ${({ $smallScreen }) =>
    $smallScreen ? inube.spacing.s150 : inube.spacing.s150};
  border-radius: ${inube.spacing.s100};
`;

export const StyledContainerContent = styled.div<IStyledModal>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
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

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
