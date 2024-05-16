import { MdOutlinePushPin, MdSearch } from "react-icons/md";
import { RxDragHandleVertical, RxDragHandleHorizontal } from "react-icons/rx";
import {
  Stack,
  Textfield,
  Select,
  Text,
  Switch,
  Icon,
  inube,
} from "@inube/design-system";

import { SectionOrientation } from "@components/layout/BoardSection/types";
import { BoardSection } from "@components/layout/BoardSection";
import { PinnedRequest, Requests } from "@services/types";

import { FilterOption } from "./config/select";
import { StyledInputsContainer, StyledBoardContainer } from "./styles";
import { boardColumns } from "./config/board";

interface BoardLayoutProps {
  filterOptions: FilterOption[];
  boardOrientation: SectionOrientation;
  BoardRequests: Requests[];
  searchRequestValue: string;
  showPinnedOnly: boolean;
  pinnedRequests: PinnedRequest[];
  handlePinRequest: (requestId: number) => void;
  handleShowPinnedOnly: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchRequestsValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOrientationChange: (orientation: SectionOrientation) => void;
}

function BoardLayoutUI(props: BoardLayoutProps) {
  const {
    filterOptions,
    boardOrientation,
    BoardRequests,
    searchRequestValue,
    showPinnedOnly,
    pinnedRequests,
    handlePinRequest,
    handleShowPinnedOnly,
    handleSearchRequestsValue,
    onOrientationChange,
  } = props;

  return (
    <Stack direction="column">
      <StyledInputsContainer>
        <Stack width="480px">
          <Textfield
            id="SearchCards"
            name="SearchCards"
            placeholder="Buscar..."
            size="compact"
            iconAfter={<MdSearch />}
            fullwidth
            value={searchRequestValue}
            onChange={handleSearchRequestsValue}
          />
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
                checked={showPinnedOnly}
                onChange={handleShowPinnedOnly}
              />
            </Stack>
            <Stack gap={inube.spacing.s100}>
              <Icon
                icon={<RxDragHandleVertical />}
                appearance={boardOrientation === "vertical" ? "dark" : "gray"}
                size="24px"
                cursorHover
                onClick={() => onOrientationChange("vertical")}
              />
              <Icon
                icon={<RxDragHandleHorizontal />}
                appearance={boardOrientation === "horizontal" ? "dark" : "gray"}
                size="24px"
                cursorHover
                onClick={() => onOrientationChange("horizontal")}
              />
            </Stack>
          </Stack>
        </Stack>
      </StyledInputsContainer>
      <StyledBoardContainer $orientation={boardOrientation}>
        {boardColumns.map((column) => (
          <BoardSection
            key={column.id}
            id={column.id}
            sectionTitle={column.value}
            sectionBackground={column.sectionBackground}
            orientation={boardOrientation}
            sectionInformation={BoardRequests}
            pinnedRequests={pinnedRequests}
            handlePinRequest={handlePinRequest}
          />
        ))}
      </StyledBoardContainer>
    </Stack>
  );
}

export { BoardLayoutUI };
