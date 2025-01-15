import { useContext, useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Grid, useMediaQuery } from "@inube/design-system";
import { MdLogout, MdOutlineChevronRight } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Header } from "@inubekit/header";
import { Text } from "@inubekit/text";

import { AppContext } from "@context/AppContext/AppContext";
import { MenuSection } from "@components/navigation/MenuSection";
import { MenuUser } from "@components/navigation/MenuUser";
import { LogoutModal } from "@components/feedback/LogoutModal";
import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange";
import { clientsDataMock } from "@mocks/login/clients.mock";

import { logoutConfig } from "./config/apps.config";
import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledMenuContainer,
  StyledCollapseIcon,
  StyledCollapse,
  StyledFooter,
} from "./styles";

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function AppPage() {
  const { user } = useContext(AppContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      if (userMenuRef.current && event.target !== userMenuRef.current) {
        setShowUserMenu(false);
      }
    }
    if (
      collapseMenuRef.current &&
      !collapseMenuRef.current.contains(event.target as Node) &&
      event.target !== collapseMenuRef.current &&
      businessUnitChangeRef.current &&
      !businessUnitChangeRef.current.contains(event.target as Node)
    ) {
      setCollapse(false);
    }
  };

  const isTablet: boolean = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    const selectUser = document.querySelector("header div div:nth-child(2)");
    const handleToggleuserMenu = () => {
      setShowUserMenu(!showUserMenu);
    };

    document.addEventListener("mousedown", handleClickOutside);
    selectUser?.addEventListener("mouseup", handleToggleuserMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleToggleLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
    setShowUserMenu(false);
  };

  const sections = [
    {
      links: [
        {
          title: "Cerrar sesión",
          iconBefore: <MdLogout />,
          onClick: handleToggleLogoutModal,
        },
      ],
    },
  ];

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          portalId="portal"
          logoURL={renderLogo(user.operator.logo)}
          userName={user.username}
          client={user.company}
        />
        <StyledCollapseIcon
          $collapse={collapse}
          onClick={() => setCollapse(!collapse)}
          $isTablet={isTablet}
          ref={collapseMenuRef}
        >
          <Icon
            icon={<MdOutlineChevronRight />}
            appearance="primary"
            size="24px"
            cursorHover
          />
        </StyledCollapseIcon>
        {collapse && (
          <StyledCollapse ref={businessUnitChangeRef}>
            <BusinessUnitChange clients={clientsDataMock} />
          </StyledCollapse>
        )}
        <StyledContainer>
          {showUserMenu && (
            <StyledMenuContainer ref={userMenuRef}>
              <MenuUser userName={user.username} businessUnit={user.company} />
              <MenuSection sections={sections} divider={true} />
            </StyledMenuContainer>
          )}
          {showLogoutModal && (
            <LogoutModal
              logoutPath={logoutConfig.logoutPath}
              handleShowBlanket={handleToggleLogoutModal}
            />
          )}
          <StyledMain>
            <Outlet />
          </StyledMain>
          <StyledFooter>
            <Text appearance="gray" textAlign="center" size="medium">
              © 2024 Inube
            </Text>
          </StyledFooter>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
