import { useEffect, useState } from "react";

import { SectionOrientation } from "@components/layout/BoardSection/types";
import { getAll } from "@services/dataMock.service";

import { BoardLayoutUI } from "./interface";
import { filterOptions } from "./config/select";
import { IBoardData } from "./types";

const useBoardOrientation = (initialOrientation: SectionOrientation) => {
  const [boardOrientation, setBoardOrientation] = useState(initialOrientation);
  const handleOrientationChange = (orientation: SectionOrientation) => {
    setBoardOrientation(orientation);
  };
  return { boardOrientation, handleOrientationChange };
};

const useBoardData = () => {
  const [boardData, setBoardData] = useState<IBoardData>({ boardRequests: [] });
  const [filteredRequests, setFilteredRequests] = useState(
    boardData.boardRequests
  );
  const [searchRequests, setSearchRequests] = useState("");

  useEffect(() => {
    getAll("requests")
      .then((data) => {
        if (data && Array.isArray(data)) {
          setBoardData({ boardRequests: data } as IBoardData);
          setFilteredRequests(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching requests data:", error.message);
      });
  }, []);

  const handleFilterRequests = () => {
    const results = boardData.boardRequests.filter(
      (request) =>
        request.nnasocia.toLowerCase().includes(searchRequests.toLowerCase()) ||
        request.k_Prospe.toString().includes(searchRequests)
    );
    setFilteredRequests(results);
  };

  const handleSearchRequests = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchRequests(e.target.value);
  };

  return {
    filteredRequests,
    searchRequests,
    handleFilterRequests,
    handleSearchRequests,
  };
};

const usePinnedRequests = () => {
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const handleShowPinnedOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPinnedOnly(e.target.checked);
  };
  return { showPinnedOnly, handleShowPinnedOnly };
};

function BoardLayout() {
  const { boardOrientation, handleOrientationChange } =
    useBoardOrientation("vertical");
  const {
    filteredRequests,
    searchRequests,
    handleFilterRequests,
    handleSearchRequests,
  } = useBoardData();
  const { showPinnedOnly, handleShowPinnedOnly } = usePinnedRequests();

  return (
    <BoardLayoutUI
      filterOptions={filterOptions}
      boardOrientation={boardOrientation}
      BoardRequests={filteredRequests}
      searchRequests={searchRequests}
      showPinnedOnly={showPinnedOnly}
      handleShowPinnedOnly={handleShowPinnedOnly}
      onOrientationChange={handleOrientationChange}
      handleSearchRequests={handleSearchRequests}
      handleFilterRequests={handleFilterRequests}
    />
  );
}

export { BoardLayout };
