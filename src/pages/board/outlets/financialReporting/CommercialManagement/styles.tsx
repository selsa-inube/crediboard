import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledCollapseIcon {
  $collapse: boolean;
}

const StyledIcon = styled.div`
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

const StyledFieldset = styled.div`
  padding: "4px";
`;

const StyledCardsCredit = styled.div`
  overflow-x: auto;
  align-items: center;

  &::-webkit-scrollbar {
    height: 8px;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
    border-radius: 8px;
  }

  @media (max-width: 800px) {
    height: 500px;
    overflow-y: auto;
    display: grid;
    place-items: center;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) =>
        theme?.palette?.neutral?.N30 || inube.palette.neutral.N30};
      border-radius: 8px;
    }
  }
`;

const StyledContainerIcon = styled.div`
  display: flex;
  gap: 8px;
  position: relative;
`;

const StyledVerticalDivider = styled.hr`
  margin: 0px 10px;
  width: 2px;
  height: 28px;
  border: none;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
`;

const StyledPrint = styled.div`
  @media print {
    display: none;
  }
`;

export {
  StyledCollapseIcon,
  StyledIcon,
  StyledFieldset,
  StyledCardsCredit,
  StyledContainerIcon,
  StyledVerticalDivider,
  StyledPrint,
};
