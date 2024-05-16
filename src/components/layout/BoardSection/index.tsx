import { useState } from "react";
import { Stack, Text, Icon, useMediaQuery, inube } from "@inube/design-system";
import { MdOutlineChevronRight } from "react-icons/md";

import { SummaryCard } from "@components/cards/SummaryCard";
import { PinnedRequest, Requests } from "@services/types";

import { StyledBoardSection, StyledCollapseIcon } from "./styles";
import { SectionBackground, SectionOrientation } from "./types";

interface BoardSectionProps {
  id: string;
  sectionTitle: string;
  sectionBackground: SectionBackground;
  orientation: SectionOrientation;
  sectionInformation: Requests[];
  pinnedRequests: PinnedRequest[];
  handlePinRequest: (requestId: number) => void;
}

function BoardSection(props: BoardSectionProps) {
  const {
    id,
    sectionTitle,
    sectionBackground = "light",
    orientation = "vertical",
    sectionInformation,
    pinnedRequests,
    handlePinRequest,
  } = props;

  const filteredRequests = sectionInformation.filter(
    (request) => request.i_Estprs === id
  );

  const disabledCollapse = filteredRequests.length === 0;

  const smallScreen = useMediaQuery("(max-width: 595px)");

  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    if (!disabledCollapse) {
      setCollapse(!collapse);
    }
  };

  function isRequestPinned(k_Prospe: number, pinnedRequests: PinnedRequest[]) {
    const pinnedRequest = pinnedRequests.find(
      (pinnedRequest) => pinnedRequest.requestId === k_Prospe
    );

    return pinnedRequest && pinnedRequest.isPinned === "Y" ? true : false;
  }

  return (
    <StyledBoardSection
      $sectionBackground={sectionBackground}
      $orientation={orientation}
    >
      <Stack
        justifyContent={
          orientation === "vertical" ? "space-between" : "flex-start"
        }
        alignItems="end"
        gap={inube.spacing.s300}
      >
        <Stack
          alignItems="end"
          gap={inube.spacing.s100}
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
            type={
              orientation === "vertical" || smallScreen ? "title" : "headline"
            }
            size={
              orientation === "vertical" || smallScreen ? "large" : "medium"
            }
          >
            {sectionTitle}
          </Text>
        </Stack>
        <Text type="title" size="medium">
          {filteredRequests.length}
        </Text>
      </Stack>
      {(collapse || orientation === "vertical") && (
        <Stack
          wrap="wrap"
          alignItems="center"
          direction={orientation === "vertical" ? "column" : "row"}
          justifyContent={smallScreen ? "center" : "flex-start"}
          gap={inube.spacing.s250}
        >
          {filteredRequests.map((request, index) => (
            <SummaryCard
              key={index}
              rad={request.k_Prospe}
              date={request.f_Prospe}
              name={request.nnasocia}
              destination={request.k_Desdin}
              value={request.v_Monto}
              toDo={request.n_Descr_Tarea}
              path={`solicitud/${request.k_Prospe}`}
              isPinned={isRequestPinned(request.k_Prospe, pinnedRequests)}
              hasMessage
              onPinChange={() => {
                handlePinRequest(request.k_Prospe);
              }}
            />
          ))}
        </Stack>
      )}
    </StyledBoardSection>
  );
}

export { BoardSection };
export type { BoardSectionProps };
