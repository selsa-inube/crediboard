import { useState } from "react";
import { Stack, Text, Icon, useMediaQuery, inube } from "@inube/design-system";
import { MdOutlineChevronRight } from "react-icons/md";

import { SummaryCard } from "@components/cards/SummaryCard";
import { Requests } from "@services/types";
import { formatISODatetoCustomFormat } from "@utils/formatData/date";
import { capitalizeFirstLetter } from "@utils/formatData/text";

import { StyledBoardSection, StyledCollapseIcon } from "./styles";
import { SectionBackground, SectionOrientation } from "./types";

interface BoardSectionProps {
  id: string;
  sectionTitle: string;
  sectionBackground: SectionBackground;
  orientation: SectionOrientation;
  sectionInformation: Requests[];
}

function BoardSection(props: BoardSectionProps) {
  const {
    id,
    sectionTitle,
    sectionBackground = "light",
    orientation = "vertical",
    sectionInformation,
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
              date={capitalizeFirstLetter(
                formatISODatetoCustomFormat(request.f_Prospe)
              )}
              name={request.nnasocia}
              destination={request.k_Desdin}
              value={request.v_Monto}
              toDo={request.n_Descr_Tarea}
              isPinned={true}
              hasMessage={true}
            />
          ))}
        </Stack>
      )}
    </StyledBoardSection>
  );
}

export { BoardSection };
export type { BoardSectionProps };
