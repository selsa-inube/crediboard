import { useEffect, useRef, useState } from "react";
import {
  MdOutlineFilterAlt,
  MdOutlineFilterAltOff,
  MdOutlinePushPin,
  MdSearch,
} from "react-icons/md";
import { RxDragHandleVertical, RxDragHandleHorizontal } from "react-icons/rx";

import {
  Stack,
  Icon,
  Text,
  Divider,
  Textfield,
  Toggle,
  Button,
} from "@inubekit/inubekit";

import { SectionOrientation } from "@components/layout/BoardSection/types";
import { BoardSection } from "@components/layout/BoardSection";
import { ICreditRequestPinned, ICreditRequest } from "@services/types";
import { IOptionItemCheckedProps } from "@components/inputs/SelectCheck/OptionItem";
import { ErrorAlert } from "@components/ErrorAlert";
import { Filter } from "@components/cards/SelectedFilters/interface";
import { SelectedFilters } from "@components/cards/SelectedFilters";
import { FilterRequestModal } from "@components/modals/FilterRequestModal";

import {
  StyledInputsContainer,
  StyledBoardContainer,
  StyledContainerToCenter,
  StyledError,
  StyledSearch,
  StyledRequestsContainer,
} from "./styles";
import { boardColumns, seePinned } from "./config/board";
import { selectCheckOptions } from "./config/select";
import { IFilterFormValues } from ".";

interface BoardLayoutProps {
  isMobile: boolean;
  selectOptions: IOptionItemCheckedProps[];
  boardOrientation: SectionOrientation;
  BoardRequests: ICreditRequest[];
  searchRequestValue: string;
  showPinnedOnly: boolean;
  pinnedRequests: ICreditRequestPinned[];
  errorLoadingPins: boolean;
  activeOptions: Filter[];
  closeFilterModal: () => void;
  handleSelectCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePinRequest: (
    requestId: string,
    userWhoPinnnedId: string,
    isPinned: string
  ) => void;

  handleShowPinnedOnly: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchRequestsValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOrientationChange: (orientation: SectionOrientation) => void;
  handleLoadMoreData: () => void;
  openFilterModal: () => void;
  isFilterModalOpen: boolean;
  handleApplyFilters: (values: IFilterFormValues) => void;
  handleClearFilters: () => void;
  handleRemoveFilter: (filterIdToRemove: string) => void;
  isMenuOpen: boolean;
}

function BoardLayoutUI(props: BoardLayoutProps) {
  const {
    isMobile,
    openFilterModal,
    isFilterModalOpen,
    handleApplyFilters,
    boardOrientation,
    BoardRequests,
    searchRequestValue,
    showPinnedOnly,
    pinnedRequests,
    errorLoadingPins,
    activeOptions,
    closeFilterModal,
    handleLoadMoreData,
    handlePinRequest,
    handleShowPinnedOnly,
    handleClearFilters,
    handleRemoveFilter,
    handleSearchRequestsValue,
    onOrientationChange,
  } = props;

  const [showErrorAlert, setShowErrorAlert] = useState(true);

  const [isExpanded, setIsExpanded] = useState(false);
  const stackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        stackRef.current &&
        !stackRef.current.contains(event.target as Node) &&
        !searchRequestValue
      ) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, searchRequestValue]);

  useEffect(() => {
    setIsExpanded(Boolean(searchRequestValue));
  }, [searchRequestValue]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            handleLoadMoreData();
          }
        },
        { threshold: 1.0 }
      );

      const currentRef = observerRef.current;

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, 3000);

    return () => clearTimeout(timeout);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainerToCenter>
      <Stack
        direction="column"
        width={isMobile ? "-webkit-fill-available" : "min(100%,1500px)"}
      >
        {errorLoadingPins && showErrorAlert && (
          <StyledError $isMobile={isMobile}>
            <ErrorAlert
              message="Error: No se pudo cargar el estado de los anclados."
              onClose={() => setShowErrorAlert(false)}
            />
          </StyledError>
        )}
        <StyledInputsContainer $isMobile={isMobile}>
          <Stack
            justifyContent="space-between"
            width={isMobile ? "100%" : "auto"}
            margin={isMobile ? "8px 0px" : "auto"}
          >
            {isMobile && (
              <>
                <StyledSearch
                  ref={stackRef}
                  $isMobile={isMobile}
                  $isExpanded={isExpanded}
                  onClick={() => {
                    if (!isExpanded) setIsExpanded(true);
                  }}
                >
                  <Stack width="100%" alignItems="center" gap="8px">
                    <Textfield
                      id="SearchCardsMobile"
                      name="SearchCardsMobile"
                      placeholder=""
                      size="compact"
                      iconAfter={<MdSearch />}
                      value={searchRequestValue}
                      onChange={handleSearchRequestsValue}
                      fullwidth
                    />
                    <Icon
                      icon={<MdOutlineFilterAlt />}
                      appearance="primary"
                      variant="outlined"
                      size="36px"
                      shape="rectangle"
                      cursorHover
                      spacing="wide"
                      onClick={openFilterModal}
                    />
                  </Stack>
                </StyledSearch>
              </>
            )}

            {isMobile && (
              <Stack alignItems="center">
                <Icon
                  icon={<MdOutlinePushPin />}
                  appearance="dark"
                  size="24px"
                />
                <Toggle
                  id="SeePinned"
                  name="SeePinned"
                  size="large"
                  checked={showPinnedOnly}
                  onChange={handleShowPinnedOnly}
                  disabled={errorLoadingPins}
                />
              </Stack>
            )}
          </Stack>
          {isMobile && <Divider />}
          <Stack
            width="100%"
            justifyContent={isMobile ? "end" : "space-between"}
            alignItems="center"
            margin={isMobile ? "16px 0px" : "auto"}
            gap="10px"
          >
            {isFilterModalOpen && (
              <FilterRequestModal
                assignmentOptions={selectCheckOptions}
                onSubmit={handleApplyFilters}
                selectedFilters={activeOptions}
                onCloseModal={closeFilterModal}
                onRemoveFilter={handleRemoveFilter}
              />
            )}

            {!isMobile && (
              <Stack width="280px" alignItems="end">
                <Textfield
                  id="SearchCardsDesktop"
                  name="SearchCardsDesktop"
                  placeholder="Palabra clave"
                  size="compact"
                  iconAfter={<MdSearch />}
                  value={searchRequestValue}
                  onChange={handleSearchRequestsValue}
                  fullwidth
                />
              </Stack>
            )}

            {!isMobile && (
              <StyledRequestsContainer $isMobile={isMobile}>
                <SelectedFilters
                  filters={activeOptions}
                  onRemove={handleRemoveFilter}
                />
                <Button
                  appearance="primary"
                  iconBefore={<MdOutlineFilterAltOff />}
                  type="button"
                  spacing="compact"
                  variant="outlined"
                  disabled={!activeOptions.length}
                  onClick={handleClearFilters}
                >
                  Quitar
                </Button>
                <Button
                  appearance="primary"
                  iconBefore={<MdOutlineFilterAlt />}
                  type="button"
                  spacing="compact"
                  variant="outlined"
                  onClick={openFilterModal}
                >
                  Filtrar
                </Button>
              </StyledRequestsContainer>
            )}

            <Stack alignItems="center">
              <Stack gap="16px">
                {!isMobile && (
                  <Stack gap="8px">
                    <Icon
                      icon={<MdOutlinePushPin />}
                      appearance="dark"
                      size="24px"
                    />
                    <Text type="label">{seePinned.viewPinned}</Text>
                    <Toggle
                      id="SeePinned"
                      name="SeePinned"
                      size="large"
                      checked={showPinnedOnly}
                      onChange={handleShowPinnedOnly}
                      disabled={errorLoadingPins}
                    />
                  </Stack>
                )}
                {!isMobile && (
                  <Stack gap="8px">
                    <Icon
                      icon={<RxDragHandleVertical />}
                      appearance={
                        boardOrientation === "vertical" ? "dark" : "gray"
                      }
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
          </Stack>
        </StyledInputsContainer>
        <StyledBoardContainer
          $orientation={boardOrientation}
          $isMobile={isMobile}
        >
          {boardColumns.map((column) => {
            const hasFilterForColumn = activeOptions.some(
              (filter) => filter.value === column.id
            );

            const dragIcon = hasFilterForColumn ? (
              <MdOutlineFilterAlt />
            ) : undefined;

            return (
              <BoardSection
                key={column.id}
                sectionTitle={column.value}
                sectionBackground={column.sectionBackground}
                orientation={boardOrientation}
                sectionInformation={BoardRequests.filter(
                  (request) => request.stage === column.id
                )}
                pinnedRequests={pinnedRequests}
                errorLoadingPins={errorLoadingPins}
                searchRequestValue={searchRequestValue}
                handlePinRequest={handlePinRequest}
                handleLoadMoreData={handleLoadMoreData}
                dragIcon={dragIcon}
                onOrientationChange={onOrientationChange}
              />
            );
          })}
        </StyledBoardContainer>

        {boardOrientation === "vertical" && <div ref={observerRef} />}
      </Stack>
    </StyledContainerToCenter>
  );
}

export { BoardLayoutUI };
