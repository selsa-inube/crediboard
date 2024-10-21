import { Link } from "react-router-dom";
import styled from "styled-components";
import { inube } from "@inubekit/foundations";

interface IStyledCollapseIcon {
  $collapse: boolean;
  $isTablet: boolean;
}

const StyledAppPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; 
`;

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  flex: 1; 
  overflow-y: auto; 
  padding: 16px; 
`;

const StyledContentImg = styled(Link)`
  width: 100px;
`;

const StyledLogo = styled.img`
  max-width: 120px;
`;

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  position: absolute;
  top: 13.5px;
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(-90deg)" : "rotate(90deg)"};
  left: ${({ $isTablet }) => ($isTablet ? "150px" : "142px")};
`;

const StyledCollapse = styled.div`
  position: absolute;
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
`;

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 16px 24px;
  background-color: ${({ theme }) =>
    theme?.palette?.neutral?.N10 || inube.palette.neutral.N10};
`;

export {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledMenuContainer,
  StyledCollapseIcon,
  StyledCollapse,
  StyledFooter,
};
