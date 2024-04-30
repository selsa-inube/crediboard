import { useState } from "react";

import { Requests } from "@services/types";

import { SectionBackground, SectionOrientation } from "./types";
import { BoardSectionUI } from "./interface";

interface BoardSectionProps {
  id: string;
  sectionTitle: string;
  sectionBackground: SectionBackground;
  orientation: SectionOrientation;
  sectionInformation: Requests[];
  showPinnedOnly: boolean;
}

function BoardSection(props: BoardSectionProps) {
  const {
    id,
    sectionTitle,
    sectionBackground = "light",
    orientation = "vertical",
    sectionInformation,
    showPinnedOnly,
  } = props;

  const filteredRequests = showPinnedOnly
    ? sectionInformation.filter(
        (request) => request.i_Estprs === id && request.isPinned
      )
    : sectionInformation.filter((request) => request.i_Estprs === id);

  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    if (filteredRequests.length !== 0) {
      setCollapse(!collapse);
    }
  };

  const handlePinChange = (request: Requests, isPinned: boolean) => {
    request.isPinned = isPinned;
  };

  return (
    <BoardSectionUI
      sectionTitle={sectionTitle}
      sectionBackground={sectionBackground}
      orientation={orientation}
      filteredRequests={filteredRequests}
      collapse={collapse}
      handleCollapse={handleCollapse}
      handlePinChange={handlePinChange}
    />
  );
}

export { BoardSection };
export type { BoardSectionProps };
