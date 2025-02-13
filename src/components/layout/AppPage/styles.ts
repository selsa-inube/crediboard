import { Link } from "react-router-dom";
import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledCollapseIcon {
  $collapse: boolean;
  $isTablet: boolean;
}

const StyledAppPage = styled.div`
  display: inherit;
  box-sizing: border-box;
`;

const StyledContainer = styled.div`
  display: inherit;
  overflow: hidden;
`;

const StyledMain = styled.main`
  box-sizing: border-box;
  height: calc(100vh - 54px);
  overflow-y: auto;
`;

const StyledContentImg = styled(Link)`
  width: 100px;
`;

const StyledLogo = styled.img`
  max-width: 120px;
`;

const StyledHeaderContainer = styled.div`
  div > div {
    cursor: pointer;
  }
`;

const StyledContainerNav = styled.div`
  max-height: calc(100vh - 50px);
`;

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  position: absolute;
  top: ${({ $isTablet }) => ($isTablet ? "8.5px" : "13px")};
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(-90deg)" : "rotate(90deg)"};
  left: ${({ $isTablet }) => ($isTablet ? "200px" : "160px")};
`;

const StyledMenuContainer = styled.div`
  position: absolute;
  top: 48px;
  right: 15px;
  z-index: 1;
  overflow: hidden;
  border-radius: 8px;
  width: 312px;
  box-shadow: 0px 2px 3px 0px #091e4221;
  box-shadow: 0px 6px 10px 4px #091e4221;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N0 || inube.palette.neutral.N0};

  hr {
    color: ${({ theme }) =>
      theme?.palette?.neutral?.N40 || inube.palette.neutral.N40};
  }
`;

const StyledCollapse = styled.div`
  position: absolute;
`;

export {
  StyledAppPage,
  StyledMenuContainer,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledContainerNav,
  StyledHeaderContainer,
  StyledCollapseIcon,
  StyledCollapse,
};
