import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";

import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { useMediaQueries } from "@inubekit/hooks";
import { SummaryCard } from "@components/cards/SummaryCard";
import { ICreditRequestPinned, ICreditRequest } from "@services/types";

import { StyledBoardSection, StyledCollapseIcon } from "./styles";
import { SectionBackground, SectionOrientation } from "./types";
import { configOption } from "./config";

interface BoardSectionProps {
  sectionTitle: string;
  sectionBackground: SectionBackground;
  orientation: SectionOrientation;
  sectionInformation: ICreditRequest[];
  pinnedRequests: ICreditRequestPinned[];
  handlePinRequest: (
    requestId: string,
    userWhoPinnnedId: string,
    isPinned: string
  ) => void;
  errorLoadingPins: boolean;
  searchRequestValue: string;
}

function BoardSection(props: BoardSectionProps) {
  const {
    sectionTitle,
    sectionBackground = "light",
    orientation = "vertical",
    sectionInformation,
    pinnedRequests,
    handlePinRequest,
    errorLoadingPins,
    searchRequestValue,
  } = props;
  const disabledCollapse = sectionInformation.length === 0;

  const { "(max-width: 1024px)": isTablet, "(max-width: 595px)": isMobile } =
    useMediaQueries(["(max-width: 1024px)", "(max-width: 595px)"]);

  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    if (!disabledCollapse) {
      setCollapse(!collapse);
    }
  };

  function isRequestPinned(
    creditRequestId: string | undefined,
    pinnedRequests: ICreditRequestPinned[]
  ) {
    const pinnedRequest = pinnedRequests.find(
      (pinnedRequest) => pinnedRequest.creditRequestId === creditRequestId
    );
    return pinnedRequest && pinnedRequest.isPinned === "Y" ? true : false;
  }

  const getNoDataMessage = () => {
    if (!sectionInformation || sectionInformation.length === 0) {
      return searchRequestValue
        ? `${configOption.noMatches} "${searchRequestValue}"`
        : `${configOption.textNodata}`;
    }
    return "";
  };

  return (
    <StyledBoardSection
      $sectionBackground={sectionBackground}
      $orientation={orientation}
      $isTablet={isTablet}
    >
      <Stack
        justifyContent={
          orientation === "vertical" ? "space-between" : "flex-start"
        }
        alignItems="end"
        gap="24px"
      >
        <Stack
          alignItems="end"
          gap="8px"
          width={orientation === "vertical" ? "180px" : "auto"}
          height={orientation === "vertical" ? "56px" : "auto"}
        >
          {orientation !== "vertical" && (
            <StyledCollapseIcon
              $collapse={collapse}
              $disabledCollapse={disabledCollapse}
              onClick={handleCollapse}
            >
              <Icon
                icon={<MdOutlineChevronRight />}
                disabled={disabledCollapse}
                appearance="dark"
                size="26px"
                cursorHover
              />
            </StyledCollapseIcon>
          )}
          <Text
            type={orientation === "vertical" || isMobile ? "title" : "headline"}
            size={orientation === "vertical" || isMobile ? "large" : "medium"}
          >
            {sectionTitle}
          </Text>
        </Stack>
        <Text type="title" size="medium">
          {sectionInformation.length}
        </Text>
      </Stack>
      {(collapse || orientation === "vertical") && (
        <Stack
          wrap="wrap"
          alignItems="center"
          direction={orientation === "vertical" ? "column" : "row"}
          justifyContent={isMobile ? "center" : "flex-start"}
          gap="20px"
        >
          {sectionInformation.length > 0 ? (
            sectionInformation.map((request, index) => (
              <SummaryCard
                key={index}
                rad={request.creditRequestCode}
                date={request.creditRequestDateOfCreation}
                name={request.clientName}
                destination={request.moneyDestinationAbreviatedName}
                value={request.loanAmount}
                toDo={request.taskToBeDone}
                path={`extended-card/${request.creditRequestCode}`}
                isPinned={isRequestPinned(
                  request.creditRequestId,
                  pinnedRequests
                )}
                hasMessage={request.unreadNovelties === "Y"}
                onPinChange={() => {
                  if (request.creditRequestId) {
                    handlePinRequest(
                      request.creditRequestId,
                      request.userWhoPinnnedId || "",
                      isRequestPinned(request.creditRequestId, pinnedRequests)
                        ? "N"
                        : "Y"
                    );
                  }
                }}
                errorLoadingPins={errorLoadingPins}
              />
            ))
          ) : (
            <Stack gap="24px" alignItems="center" height="533px" width="100%">
              <Text type="title" size="small" appearance="gray">
                {getNoDataMessage()}
              </Text>
            </Stack>
          )}
        </Stack>
      )}
    </StyledBoardSection>
  );
}

export { BoardSection };
export type { BoardSectionProps };
