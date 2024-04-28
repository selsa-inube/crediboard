import { useEffect, useState } from "react";

import { SectionOrientation } from "@components/layout/BoardSection/types";
import { getAll } from "@services/dataMock.service";

import { BoardLayoutUI } from "./interface";
import { filterOptions } from "./config/select";
import { IBoardData } from "./types";

function BoardLayout() {
  const [boardOrientation, setBoardOrientation] =
    useState<SectionOrientation>("vertical");

  const handleOrientationChange = (orientation: SectionOrientation) => {
    setBoardOrientation(orientation);
  };

  const [boardData, setBoardData] = useState<IBoardData>({
    boardRequests: [],
  });

  useEffect(() => {
    getAll("requests")
      .then((data) => {
        if (data !== null) {
          setBoardData({ boardRequests: data } as IBoardData);
        }
      })
      .catch((error) => {
        console.error("Error fetching requests data:", error.message);
      });
  }, [boardData]);

  return (
    <BoardLayoutUI
      filterOptions={filterOptions}
      boardOrientation={boardOrientation}
      BoardRequests={boardData.boardRequests}
      onOrientationChange={handleOrientationChange}
    />
  );
}

export { BoardLayout };
