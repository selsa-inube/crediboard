import { useState } from "react";
import { Stack, Text, Icon, useMediaQuery, inube } from "@inube/design-system";
import { MdOutlineChevronRight } from "react-icons/md";

import { SummaryCard } from "@components/cards/SummaryCard";
import { Requests } from "@services/types";
import { formatISODatetoCustomFormat } from "@utils/formatData/date";

import { StyledBoardSection, StyledCollapseIcon } from "./styles";
import { SectionBackground, SectionOrientation } from "./types";

interface IBoardSectionProps {
  sectionTitle: string;
  sectionBackground: SectionBackground;
  orientation: SectionOrientation;
  sectionInformation: Requests[];
}

function BoardSection(props: IBoardSectionProps) {
  const {
    sectionTitle,
    sectionBackground = "light",
    orientation = "vertical",
    sectionInformation,
  } = props;

  const smallScreen = useMediaQuery("(max-width: 595px)");

  const [collapse, setCollapse] = useState(true);

  const handleCollapse = () => {
    setCollapse(!collapse);
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
        alignItems="center"
        gap={inube.spacing.s300}
      >
        <Stack alignItems="center" gap={inube.spacing.s100}>
          {orientation !== "vertical" && (
            <StyledCollapseIcon $collapse={collapse} onClick={handleCollapse}>
              <Icon
                icon={<MdOutlineChevronRight />}
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
            ellipsis
          >
            {sectionTitle}
          </Text>
        </Stack>
        <Text type="title" size="medium">
          {sectionInformation.length}
        </Text>
      </Stack>
      {collapse && (
        <Stack
          wrap="wrap"
          direction={orientation === "vertical" ? "column" : "row"}
          justifyContent={smallScreen ? "center" : "flex-start"}
          gap={inube.spacing.s250}
        >
          {sectionInformation.map((request, index) => (
            <SummaryCard
              key={index}
              rad={request.k_Prospe}
              date={formatISODatetoCustomFormat(request.f_Prospe)}
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
export type { IBoardSectionProps };
