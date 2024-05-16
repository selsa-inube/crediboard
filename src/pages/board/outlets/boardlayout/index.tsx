import { useEffect, useState } from "react";

import { SectionOrientation } from "@components/layout/BoardSection/types";
import { get, updateActive } from "@mocks/utils/dataMock.service";
import { PinnedRequest } from "@services/types";

import { BoardLayoutUI } from "./interface";
import { filterOptions } from "./config/select";
import { IBoardData } from "./types";

function BoardLayout() {
  const [boardData, setBoardData] = useState<IBoardData>({
    boardRequests: [],
    requestsPinned: [],
  });

  const [boardOrientation, setBoardOrientation] = useState<SectionOrientation>(
    () => {
      const saved = localStorage.getItem("boardOrientation");
      return (saved as SectionOrientation) || "vertical";
    }
  );

  const [showPinnedOnly, setShowPinnedOnly] = useState(() => {
    const saved = localStorage.getItem("showPinnedOnly");
    const initialValue = JSON.parse(saved!);
    return initialValue || false;
  });

  const [filteredRequests, setFilteredRequests] = useState(
    boardData.boardRequests
  );

  const [searchRequestValue, setSearchRequestValue] = useState("");

  useEffect(() => {
    localStorage.setItem("boardOrientation", boardOrientation);
  }, [boardOrientation]);

  useEffect(() => {
    localStorage.setItem("showPinnedOnly", JSON.stringify(showPinnedOnly));

    if (showPinnedOnly) {
      setFilteredRequests((prevFilteredRequests) =>
        prevFilteredRequests.filter((req) =>
          boardData.requestsPinned
            .filter((req) => req.isPinned === "Y")
            .map((req) => req.requestId)
            .includes(req.k_Prospe)
        )
      );
    } else {
      setFilteredRequests(boardData.boardRequests);
    }
  }, [showPinnedOnly, boardData.requestsPinned, boardData.boardRequests]);

  useEffect(() => {
    get("requests")
      .then((data) => {
        if (data && Array.isArray(data)) {
          setBoardData((prevState) => ({
            ...prevState,
            boardRequests: data,
          }));
          setFilteredRequests(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching requests data:", error.message);
      });
    get("requests-pinned")
      .then((data) => {
        if (data && Array.isArray(data)) {
          setBoardData((prevState) => ({
            ...prevState,
            requestsPinned: data,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching requests pinned data:", error.message);
      });
  }, []);

  const handleOrientationChange = (orientation: SectionOrientation) => {
    setBoardOrientation(orientation);
  };

  const handleShowPinnedOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPinnedOnly(e.target.checked);
  };

  const handlePinRequest = async (requestId: number) => {
    setBoardData((prevState) => ({
      ...prevState,
      requestsPinned: prevState.requestsPinned.map((request) => {
        if (request.requestId === requestId) {
          updateActive({
            key: "requestId",
            nameDB: "requests-pinned",
            identifier: requestId,
            editData: { isPinned: request.isPinned === "Y" ? "N" : "Y" },
          });
          return {
            ...request,
            isPinned: request.isPinned === "Y" ? "N" : "Y",
          } as PinnedRequest;
        }
        return request;
      }),
    }));
  };

  const handleSearchRequestsValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchRequestValue(e.target.value);
  };

  const handleClickSearchButton = () => {
    const requests = boardData.boardRequests.filter(
      (request) =>
        (request.nnasocia
          .toLowerCase()
          .includes(searchRequestValue.toLowerCase()) ||
          request.k_Prospe.toString().includes(searchRequestValue)) &&
        (!showPinnedOnly ||
          boardData.requestsPinned
            .filter((req) => req.isPinned === "Y")
            .map((req) => req.requestId)
            .includes(request.k_Prospe))
    );
    setSearchRequestValue("");
    setFilteredRequests(requests);
  };

  return (
    <BoardLayoutUI
      filterOptions={filterOptions}
      boardOrientation={boardOrientation}
      BoardRequests={filteredRequests}
      searchRequestValue={searchRequestValue}
      showPinnedOnly={showPinnedOnly}
      pinnedRequests={boardData.requestsPinned}
      handleClickSearchButton={handleClickSearchButton}
      handlePinRequest={handlePinRequest}
      handleShowPinnedOnly={handleShowPinnedOnly}
      handleSearchRequestsValue={handleSearchRequestsValue}
      onOrientationChange={handleOrientationChange}
    />
  );
}

export { BoardLayout };
