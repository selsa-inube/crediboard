import { MdOutlinePushPin, MdSearch } from "react-icons/md";
import { RxDragHandleVertical, RxDragHandleHorizontal } from "react-icons/rx";
import {
  Stack,
  Textfield,
  Text,
  Switch,
  Icon,
  inube,
} from "@inube/design-system";

import { SectionOrientation } from "@components/layout/BoardSection/types";
import { BoardSection } from "@components/layout/BoardSection";
import { PinnedRequest, Requests } from "@services/types";
import { Selectcheck } from "@components/inputs/SelectCheck";
import { IOptionItemCheckedProps } from "@components/inputs/SelectCheck/OptionItem";

import { StyledInputsContainer, StyledBoardContainer, StyledContainerToCenter } from "./styles";
import { boardColumns } from "./config/board";

interface BoardLayoutProps {
  isMobile: boolean;
  selectOptions: IOptionItemCheckedProps[];
  boardOrientation: SectionOrientation;
  BoardRequests: Requests[];
  searchRequestValue: string;
  showPinnedOnly: boolean;
  pinnedRequests: PinnedRequest[];
  handleSelectCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePinRequest: (requestId: number) => void;
  handleShowPinnedOnly: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchRequestsValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOrientationChange: (orientation: SectionOrientation) => void;
}

function BoardLayoutUI(props: BoardLayoutProps) {
  const {
    isMobile,
    selectOptions,
    boardOrientation,
    BoardRequests,
    searchRequestValue,
    showPinnedOnly,
    pinnedRequests,
    handleSelectCheckChange,
    handlePinRequest,
    handleShowPinnedOnly,
    handleSearchRequestsValue,
    onOrientationChange,
  } = props;

  return (
    <StyledContainerToCenter>
    <Stack direction="column" width={isMobile ? "-webkit-fill-available" : "min(100%,1500px)"}>
      <StyledInputsContainer $isMobile={isMobile}>
        {!isMobile && (
          <Stack width="480px">
            <Textfield
              id="SearchCards"
              name="SearchCards"
              placeholder="Buscar..."
              size="compact"
              iconAfter={<MdSearch />}
              value={searchRequestValue}
              onChange={handleSearchRequestsValue}
              fullwidth
            />
          </Stack>
        )}
        <Stack
          width="100%"
          justifyContent={isMobile ? "end" : "space-between"}
          alignItems="center"
        >
          {!isMobile && (
            <Stack width="500px">
              <Selectcheck
                label="Filtrado por"
                id="FilterRequests"
                name="FilterRequests"
                placeholder="Seleccione una opción"
                options={selectOptions}
                onChangeCheck={handleSelectCheckChange}
                value=""
                onChange={() => {}}
                fullwidth
              />
            </Stack>
          )}
          <Stack gap={inube.spacing.s200}>
            <Stack gap={inube.spacing.s100} alignItems="center">
              <Icon icon={<MdOutlinePushPin />} appearance="dark" size="24px" />
              {!isMobile && (
                <Text type="label">Ver unicamente los anclados</Text>
              )}
              <Switch
                id="SeePinned"
                name="SeePinned"
                size="large"
                checked={showPinnedOnly}
                onChange={handleShowPinnedOnly}
              />
            </Stack>
            {!isMobile && (
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
                  appearance={
                    boardOrientation === "horizontal" ? "dark" : "gray"
                  }
                  size="24px"
                  cursorHover
                  onClick={() => onOrientationChange("horizontal")}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      </StyledInputsContainer>
      <StyledBoardContainer
        $orientation={boardOrientation}
        $isMobile={isMobile}
      >
        {boardColumns.map((column) => {
          const filteredRequests = BoardRequests.filter(
            (request) => request.i_Estprs === column.id
          );

          return (
            <BoardSection
              key={column.id}
              sectionTitle={column.value}
              sectionBackground={column.sectionBackground}
              orientation={boardOrientation}
              sectionInformation={filteredRequests}
              pinnedRequests={pinnedRequests}
              handlePinRequest={handlePinRequest}
            />
          );
        })}
      </StyledBoardContainer>
    </Stack>
    </StyledContainerToCenter>
  );
}

export { BoardLayoutUI };
