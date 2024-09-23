import styled from "styled-components";
import { inube } from "@inubekit/foundations";

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
    ${({ theme }) => theme?.palette?.blue?.B400 || inube.palette.blue.B400};
  cursor: pointer;
`;

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(-90deg)" : "rotate(90deg)"};
`;

const StyledDivider = styled.hr<IStyledDivider>`
  margin: "0px";
  width: 100%;
  border: none;
  border-top: 2px solid;
  border-top-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

const StyledFieldset = styled.div<IStyledFieldset>`
  padding: "4px";
`;

const StyledCardsCredit = styled.div`
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 8px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    border-radius: 8px;
  }
`;

const StyledVerticalDivider = styled.hr<IStyledDivider>`
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  border: 1px;
  height: 28px;
  margin: 0px;
  width: 2px;
`;

const StyledContainerIcon = styled.div`
  display: flex;
  gap: 8px;
  position: relative;
`;

const StyledMenu = styled.div`
  background-color: #ffff;
  border-radius: 8px;
  box-shadow:
    0px 4px 4px 0px #091e4221,
    0px 8px 12px 6px #091e4221;
  padding: 6px 0px;
  position: absolute;
  right: 1px;
  width: 227px;
  z-index: 2;
`;

const StyledHorizontalDivider = styled.hr`
  margin: 0px 10px;
  width: 2px;
  height: 28px;
  border: none;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

export {
  StyledCollapseIcon,
  StyledIcon,
  StyledDivider,
  StyledFieldset,
  StyledCardsCredit,
  StyledVerticalDivider,
  StyledMenu,
  StyledContainerIcon,
  StyledHorizontalDivider,
};
