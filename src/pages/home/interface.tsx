import { useContext } from "react";
import { MdOutlinePushPin, MdSearch } from "react-icons/md";
import { RxDragHandleVertical, RxDragHandleHorizontal } from "react-icons/rx";
import {
  Header,
  Stack,
  Nav,
  useMediaQueries,
  Button,
  Textfield,
  Select,
  Text,
  Switch,
  Icon,
  inube,
} from "@inube/design-system";

import { AppContext } from "@context/AppContext";
import {
  StyledContentImg,
  StyledLogo,
} from "@components/layout/AppPage/styles";

import {
  navigationConfig,
  logoutConfig,
  filterOptions,
} from "./config/apps.config";
import { StyledHome } from "./styles";

const renderLogo = (imgUrl: string) => {
  return (
    <StyledContentImg to="/">
      <StyledLogo src={imgUrl} />
    </StyledContentImg>
  );
};

function HomeUI() {
  const { user } = useContext(AppContext);

  const [laptop] = Object.values(useMediaQueries(["(min-width: 945px)"]));

  return (
    <StyledHome>
      <Header
        portalId="portal"
        navigation={navigationConfig}
        logoURL={renderLogo(user.operator.logo)}
        userName={user.username}
        client={user.company}
      />
      <Stack height="calc(100vh - 56px)">
        {laptop && (
          <Nav
            navigation={navigationConfig}
            logoutPath={logoutConfig.logoutPath}
            logoutTitle={logoutConfig.logoutTitle}
          />
        )}
        <Stack
          width="100%"
          alignItems="center"
          direction="column"
          margin="s400 s600 s200"
          gap={inube.spacing.s500}
        >
          <Stack gap={inube.spacing.s200} alignItems="center">
            <Stack width="480px">
              <Textfield
                id="SearchCards"
                name="SearchCards"
                placeholder="Buscar..."
                size="compact"
                iconAfter={<MdSearch />}
                fullwidth
              />
            </Stack>
            <Button spacing="compact">Buscar</Button>
          </Stack>
          <Stack
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack width="500px">
              <Select
                label="Filtrado por"
                id="FilterCards"
                name="FilterCards"
                placeholder="Seleccione una opción"
                options={filterOptions}
                fullwidth
              />
            </Stack>
            <Stack gap={inube.spacing.s200}>
              <Stack gap={inube.spacing.s100} alignItems="center">
                <Icon
                  icon={<MdOutlinePushPin />}
                  appearance="dark"
                  size="24px"
                />
                <Text type="label">Ver unicamente los anclados</Text>
                <Switch
                  id="SeePinned"
                  name="SeePinned"
                  size="large"
                  onChange={() => {}}
                ></Switch>
              </Stack>
              <Stack gap={inube.spacing.s100}>
                <Icon
                  icon={<RxDragHandleVertical />}
                  appearance="dark"
                  size="24px"
                  cursorHover
                />
                <Icon
                  icon={<RxDragHandleHorizontal />}
                  appearance="gray"
                  size="24px"
                  cursorHover
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </StyledHome>
  );
}

export { HomeUI };
