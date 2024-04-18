import { MdOutlinePushPin, MdSearch } from "react-icons/md";
import { RxDragHandleVertical, RxDragHandleHorizontal } from "react-icons/rx";
import {
  Stack,
  Button,
  Textfield,
  Select,
  Text,
  Switch,
  Icon,
  inube,
} from "@inube/design-system";

import { filterOptions } from "./config/select";

function BoardLayout() {
  return (
    <Stack
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
      <Stack width="100%" justifyContent="space-between" alignItems="center">
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
            <Icon icon={<MdOutlinePushPin />} appearance="dark" size="24px" />
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
  );
}

export { BoardLayout };
