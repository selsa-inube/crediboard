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
  margin: 0px;
  width: 100%;
  border: none;
  border-top: 2px solid;
  border-top-color: ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;

const StyledHorizontalDivider = styled.hr`
  margin: 0px 10px;
  width: 2px;
  height: 28px; 
  border: none;
  background-color: ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
`;


export { StyledCollapseIcon, StyledIcon, StyledDivider,StyledHorizontalDivider };
