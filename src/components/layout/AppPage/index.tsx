import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Header, Nav, Grid, useMediaQueries } from "@inube/design-system";
import { navigationConfig } from "@pages/home/config/apps.config";

import {
  StyledAppPage,
  StyledContainer,
  StyledContentImg,
  StyledLogo,
  StyledMain,
  StyledContainerNav,
} from "./styles";
import { AppContext } from "@context/AppContext";

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function AppPage() {
  const { user } = useContext(AppContext);

  const [laptop] = Object.values(useMediaQueries(["(min-width: 945px)"]));
  return (
    <StyledAppPage>
      <Grid templateRows="auto 1fr" height="100vh" justifyContent="unset">
        <Header
          portalId="portal"
          navigation={navigationConfig}
          logoURL={renderLogo(user.operator.logo)}
          userName={user.username}
          client={user.company}
        />
        <StyledContainer>
          <Grid
            templateColumns={!laptop ? "1fr" : "auto 1fr"}
            alignContent="unset"
          >
            {laptop && (
              <StyledContainerNav>
                <Nav
                  navigation={navigationConfig}
                  logoutPath="/"
                  logoutTitle="Cerrar Sesión"
                />
              </StyledContainerNav>
            )}

            <StyledMain>
              <Outlet />
            </StyledMain>
          </Grid>
        </StyledContainer>
      </Grid>
    </StyledAppPage>
  );
}

export { AppPage };
