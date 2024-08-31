import styled from "styled-components";
import { inube } from "@inube/design-system";

interface IStyledCollapseIcon {
  $collapse: boolean;
}

interface IStyledIcon {
  theme?: typeof inube;
}

interface IStyledDivider {
  theme?: typeof inube;
}
interface IStyledFieldset {
  theme?: typeof inube;
}
const StyledIcon = styled.div<IStyledIcon>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) =>
      theme?.color?.stroke?.primary?.regular ||
      inube.color.stroke.primary.regular};
  cursor: pointer;
`;

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(-90deg)" : "rotate(90deg)"};
`;

const StyledDivider = styled.hr<IStyledDivider>`
  margin: ${inube.spacing.s0};
  width: 100%;
  border: none;
  border-top: 2px solid;
  border-top-color: ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

const StyledFieldset = styled.div<IStyledFieldset>`
  padding: 4px;
`;

const StyledCardsCredit = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  padding: 15px 10px;
  overflow-x: auto;
  width: fit-content;
`;

const StyledSumaryPropect = styled.div`
  display: flex;
  flex-direction: row;
  flex: 2;
  gap: 30px;
  margin: 35px 0px 8px 0px;
  padding: 8px 10px;
`;

const StyledContainerCardPropect = styled.div`
  overflow: auto;
  width: 100%;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export {
  StyledCollapseIcon,
  StyledIcon,
  StyledDivider,
  StyledFieldset,
  StyledCardsCredit,
  StyledSumaryPropect,
  StyledContainerCardPropect,
};
