import { useContext, useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { MdLogout, MdOutlineChevronRight } from "react-icons/md";
import { Grid } from "@inubekit/grid";
import { Icon } from "@inubekit/icon";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";

import { AppContext } from "@context/AppContext";
import { Header } from "@components/navigation/header";
import { MenuSection } from "@components/navigation/MenuSection";
import { MenuUser } from "@components/navigation/MenuUser";
import { LogoutModal } from "@components/feedback/LogoutModal";
import { BusinessUnitChange } from "@components/inputs/BusinessUnitChange";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledMenuContainer,
  StyledHeaderContainer,
  StyledCollapseIcon,
  StyledCollapse,
  StyledFooter,
} from "./styles";
import { IBusinessUnitsPortalStaff } from "@services/businessUnitsPortalStaff/types";

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function AppPage() {
  const { eventData, businessUnitsToTheStaff, setBusinessUnitSigla } =
    useContext(AppContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      userMenuRef.current &&
      !userMenuRef.current.contains(event.target as Node) &&
      event.target !== userMenuRef.current
    ) {
      setShowUserMenu(false);
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
  const [selectedClient, setSelectedClient] = useState<string>("");
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

  const handleLogoClick = (businessUnit: IBusinessUnitsPortalStaff) => {
    const selectJSON = JSON.stringify(businessUnit);
    setBusinessUnitSigla(selectJSON);
    setSelectedClient(businessUnit.abbreviatedName);
    setCollapse(false);
  };

  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <StyledHeaderContainer>
          <Header
            logoURL={renderLogo(eventData.businessUnit.urlLogo)}
            userName={eventData.user.userName}
            client={eventData.businessUnit.abbreviatedName}
          />
        </StyledHeaderContainer>
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
            <BusinessUnitChange
              businessUnits={businessUnitsToTheStaff}
              selectedClient={selectedClient}
              onLogoClick={handleLogoClick}
            />
          </StyledCollapse>
        )}
        <StyledContainer>
          {showUserMenu && (
            <StyledMenuContainer ref={userMenuRef}>
              <MenuUser
                userName={eventData.user.userName}
                businessUnit={eventData.businessUnit.abbreviatedName}
              />
              <MenuSection
                sections={[
                  {
                    links: [
                      {
                        title: "Cerrar sesión",
                        iconBefore: <MdLogout />,
                        onClick: handleToggleLogoutModal,
                      },
                    ],
                  },
                ]}
                divider={true}
              />
            </StyledMenuContainer>
          )}

          {showLogoutModal && (
            <LogoutModal
              logoutPath="/logout"
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
