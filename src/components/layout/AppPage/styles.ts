import { Link } from "react-router-dom";
import styled from "styled-components";
import { inube } from "@inube/design-system";

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
  max-width: 100px;
`;

const StyledCollapseIcon = styled.div<IStyledCollapseIcon>`
  display: flex;
  transition: all 500ms ease;
  position: absolute;
  top: 15px;
  transform: ${({ $collapse }) =>
    $collapse ? "rotate(-90deg)" : "rotate(90deg)"};
  left: ${({ $isTablet }) => ($isTablet ? "180px" : "130px")};
`;

const StyledDivider = styled.hr`
  margin: ${inube.spacing.s0};
  width: 100%;
  border: none;
  border-top: 2px solid;
  border-top-color: ${({ theme }) =>
    theme?.color?.stroke?.divider?.regular ||
    inube.color.stroke.divider.regular};
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
    theme.color?.surface?.light?.clear || inube.color.surface.light.clear};
`;

export {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledMenuContainer,
  StyledCollapseIcon,
  StyledDivider
};
