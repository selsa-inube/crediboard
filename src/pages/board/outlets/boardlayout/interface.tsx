import { useEffect, useRef, useState } from "react";
import { MdOutlinePushPin, MdSearch } from "react-icons/md";
import { RxDragHandleVertical, RxDragHandleHorizontal } from "react-icons/rx";
import { Toggle } from "@inubekit/toggle";
import { Icon } from "@inubekit/icon";
import { Textfield } from "@inubekit/textfield";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";
import { Divider } from "@inubekit/divider";

import { SectionOrientation } from "@components/layout/BoardSection/types";
import { BoardSection } from "@components/layout/BoardSection";
import { PinnedRequest, Requests } from "@services/types";
import { Selectcheck } from "@components/inputs/SelectCheck";
import { IOptionItemCheckedProps } from "@components/inputs/SelectCheck/OptionItem";
import { ErrorAlert } from "@components/ErrorAlert";

import {
  StyledInputsContainer,
  StyledBoardContainer,
  StyledContainerToCenter,
  StyledError,
  StyledSearch,
} from "./styles";
import { boardColumns, selectConfig, seePinned } from "./config/board";

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
  errorLoadingPins: boolean;
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
    errorLoadingPins,
  } = props;

  const selectProps = selectConfig(selectOptions, handleSelectCheckChange);
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
            margin={isMobile ? "s100 s0" : "auto"}
          >
            <StyledSearch
              ref={stackRef}
              $isMobile={isMobile}
              $isExpanded={isExpanded}
              onClick={() => {
                if (!isExpanded) setIsExpanded(true);
              }}
            >
              <Stack width="100%">
                <Textfield
                  id="SearchCards"
                  name="SearchCards"
                  placeholder={isMobile ? "" : "Buscar..."}
                  size="compact"
                  iconAfter={<MdSearch />}
                  value={searchRequestValue}
                  onChange={handleSearchRequestsValue}
                  fullwidth
                />
              </Stack>
            </StyledSearch>
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
            margin={isMobile ? "s200 s0" : "auto"}
          >
            <Stack width={isMobile ? "100%" : "500px"}>
              <Selectcheck {...selectProps} />
            </Stack>
            <Stack gap="16px">
              {!isMobile && (
                <Stack gap="8px" alignItems="center">
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
        </StyledInputsContainer>
        <StyledBoardContainer
          $orientation={boardOrientation}
          $isMobile={isMobile}
        >
          {boardColumns.map((column) => (
            <BoardSection
              key={column.id}
              sectionTitle={column.value}
              sectionBackground={column.sectionBackground}
              orientation={boardOrientation}
              sectionInformation={BoardRequests.filter(
                (request) => request.i_Estprs === column.id
              )}
              pinnedRequests={pinnedRequests}
              handlePinRequest={handlePinRequest}
              errorLoadingPins={errorLoadingPins}
            />
          ))}
        </StyledBoardContainer>
      </Stack>
    </StyledContainerToCenter>
  );
}

export { BoardLayoutUI };
