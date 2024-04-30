import { Stack, Text, Icon, useMediaQuery, inube } from "@inube/design-system";
import { MdOutlineChevronRight } from "react-icons/md";

import { formatISODatetoCustomFormat } from "@utils/formatData/date";
import { capitalizeFirstLetter } from "@utils/formatData/text";
import { SummaryCard } from "@components/cards/SummaryCard";
import { Requests } from "@services/types";

import { SectionBackground, SectionOrientation } from "./types";
import { StyledBoardSection, StyledCollapseIcon } from "./styles";

interface BoardSectionUIProps {
  sectionTitle: string;
  sectionBackground: SectionBackground;
  orientation: SectionOrientation;
  filteredRequests: Requests[];
  collapse: boolean;
  handleCollapse: () => void;
  handlePinChange: (request: Requests, isPinned: boolean) => void;
}

function BoardSectionUI(props: BoardSectionUIProps) {
  const {
    sectionTitle,
    sectionBackground = "light",
    orientation = "vertical",
    filteredRequests,
    collapse,
    handleCollapse,
    handlePinChange,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 595px)");

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
              $disabledCollapse={filteredRequests.length === 0}
              onClick={handleCollapse}
            >
              <Icon
                icon={<MdOutlineChevronRight />}
                disabled={filteredRequests.length === 0}
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
          {filteredRequests.map((request) => (
            <SummaryCard
              key={request.k_Prospe}
              rad={request.k_Prospe}
              date={capitalizeFirstLetter(
                formatISODatetoCustomFormat(request.f_Prospe)
              )}
              name={request.nnasocia}
              destination={request.k_Desdin}
              value={request.v_Monto}
              toDo={request.n_Descr_Tarea}
              isPinned={request.isPinned}
              onPinChange={(isPinned) => handlePinChange(request, isPinned)}
              hasMessage={true}
            />
          ))}
        </Stack>
      )}
    </StyledBoardSection>
  );
}

export { BoardSectionUI };
