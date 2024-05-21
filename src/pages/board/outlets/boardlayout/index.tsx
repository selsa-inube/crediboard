import { useContext, useEffect, useState } from "react";

import { SectionOrientation } from "@components/layout/BoardSection/types";
import { get, updateActive } from "@mocks/utils/dataMock.service";
import { PinnedRequest, Requests } from "@services/types";
import { AppContext } from "@src/context/AppContext";

import { BoardLayoutUI } from "./interface";
import { filterOptions } from "./config/select";
import { IBoardData } from "./types";

function BoardLayout() {
  const { user, updatePreferences } = useContext(AppContext);
  const [searchRequestValue, setSearchRequestValue] = useState("");
  const [filteredRequests, setFilteredRequests] = useState<Requests[]>([]);
  const [boardData, setBoardData] = useState<IBoardData>({
    boardRequests: [],
    requestsPinned: [],
  });
  const [boardOrientation, setBoardOrientation] = useState<SectionOrientation>(
    user.preferences.boardOrientation || "vertical"
  );
  const [showPinnedOnly, setShowPinnedOnly] = useState(
    user.preferences.showPinnedOnly || false
  );

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

  useEffect(() => {
    const filteredRequests = boardData.boardRequests.filter((request) => {
      const isSearchMatch =
        request.nnasocia
          .toLowerCase()
          .includes(searchRequestValue.toLowerCase()) ||
        request.k_Prospe.toString().includes(searchRequestValue);

      const isPinned =
        !showPinnedOnly ||
        boardData.requestsPinned
          .filter((req) => req.isPinned === "Y")
          .map((req) => req.requestId)
          .includes(request.k_Prospe);

      return isSearchMatch && isPinned;
    });

    setFilteredRequests(filteredRequests);
  }, [
    showPinnedOnly,
    searchRequestValue,
    boardData.requestsPinned,
    boardData.boardRequests,
  ]);

  const handleOrientationChange = (orientation: SectionOrientation) => {
    setBoardOrientation(orientation);
    updatePreferences({ boardOrientation: orientation });
  };

  const handleShowPinnedOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPinnedOnly(e.target.checked);
    updatePreferences({ showPinnedOnly: e.target.checked });
  };

  const handlePinRequest = async (requestId: number) => {
    setBoardData((prevState) => ({
      ...prevState,
      requestsPinned: prevState.requestsPinned.map((request) => {
        if (request.requestId !== requestId) return request;

        const isPinned = request.isPinned === "Y" ? "N" : "Y";
        updateActive({
          key: "requestId",
          nameDB: "requests-pinned",
          identifier: requestId,
          editData: { isPinned },
        });

        return { ...request, isPinned } as PinnedRequest;
      }),
    }));
  };

  const handleSearchRequestsValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchRequestValue(e.target.value);
  };

  return (
    <BoardLayoutUI
      filterOptions={filterOptions}
      boardOrientation={boardOrientation}
      BoardRequests={filteredRequests}
      searchRequestValue={searchRequestValue}
      showPinnedOnly={showPinnedOnly}
      pinnedRequests={boardData.requestsPinned}
      handlePinRequest={handlePinRequest}
      handleShowPinnedOnly={handleShowPinnedOnly}
      handleSearchRequestsValue={handleSearchRequestsValue}
      onOrientationChange={handleOrientationChange}
    />
  );
}

export { BoardLayout };
