import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/hooks";

import { ICreditRequest } from "@services/types";
import { getCreditRequestPin } from "@services/isPinned";
import { getCreditRequestInProgress } from "@services/creditRequets/getCreditRequestInProgress";
import { ChangeAnchorToCreditRequest } from "@services/anchorCreditRequest";
import { AppContext } from "@context/AppContext";

import { BoardLayoutUI } from "./interface";
import { selectCheckOptions } from "./config/select";
import { IBoardData } from "./types";

function BoardLayout() {
  const { businessUnitSigla, eventData, setEventData } = useContext(AppContext);

  const [boardData, setBoardData] = useState<IBoardData>({
    boardRequests: [],
    requestsPinned: [],
  });

  const [filters, setFilters] = useState({
    searchRequestValue: "",
    showPinnedOnly: eventData.user.preferences.showPinnedOnly || false,
    selectOptions: selectCheckOptions,
    boardOrientation: eventData.user.preferences.boardOrientation || "vertical",
  });

  const [filteredRequests, setFilteredRequests] = useState<ICreditRequest[]>(
    []
  );
  const [errorLoadingPins, setErrorLoadingPins] = useState(false);

  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    const orientation = isMobile ? "horizontal" : "vertical";
    setFilters((prevFilters) => ({
      ...prevFilters,
      boardOrientation: orientation,
    }));
  }, [isMobile]);

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  const fetchBoardData = async () => {
    try {
      const [boardRequests, requestsPinned] = await Promise.all([
        getCreditRequestInProgress(businessUnitPublicCode),
        getCreditRequestPin(),
      ]);

      setBoardData((prevState) => ({
        ...prevState,
        boardRequests,
        requestsPinned,
      }));
      setFilteredRequests(boardRequests);
    } catch (error) {
      console.error("Error fetching board data:", error);
      setErrorLoadingPins(true);
    }
  };

  useEffect(() => {
    fetchBoardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessUnitPublicCode]);

  useEffect(() => {
    const filteredRequests = boardData.boardRequests.filter((request) => {
      const isSearchMatch =
        request.clientName
          .toLowerCase()
          .includes(filters.searchRequestValue.toLowerCase()) ||
        request.creditRequestCode
          .toString()
          .includes(filters.searchRequestValue);
      request.creditRequestCode.toString().includes(filters.searchRequestValue);

      const isPinned =
        !filters.showPinnedOnly ||
        boardData.requestsPinned
          .filter((req) => req.isPinned === "Y")
          .map((req) => req.creditRequestId)
          .includes(request.creditRequestId as string);

      return isSearchMatch && isPinned;
    });

    const activeFilterIds = filters.selectOptions
      .filter((option) => option.checked)
      .map((option) => option.id);

    const finalFilteredRequests = filteredRequests.filter((request) => {
      if (activeFilterIds.length === 0) return true;

      return activeFilterIds.some((filterId) => {
        switch (filterId) {
          case "2":
            return [
              "GESTION_COMERCIAL",
              "VERIFICACION_APROBACION",
              "FORMALIZACION_GARANTIAS",
              "TRAMITE_DESEMBOLSO",
            ].includes(request.stage);
          case "3":
            return request.stage === "GESTION_COMERCIAL";
          case "4":
            return request.stage === "VERIFICACION_APROBACION";
          case "5":
            return request.stage === "FORMALIZACION_GARANTIAS";
          case "6":
            return request.stage === "TRAMITE_DESEMBOLSO";
          case "7":
            return request.stage === "CUMPLIMIENTO_REQUISITOS";
          case "10":
            return request.unreadNovelties === "Y";
          default:
            return false;
        }
      });
    });
    setFilteredRequests(finalFilteredRequests);
  }, [filters, boardData]);

  const handleFiltersChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));

    if (newFilters.boardOrientation !== undefined) {
      const updatedEventData = { ...eventData };
      updatedEventData.user.preferences = {
        ...updatedEventData.user.preferences,
        boardOrientation: newFilters.boardOrientation,
      };

      setEventData(updatedEventData);
    }

    if (newFilters.showPinnedOnly !== undefined) {
      const updatedEventData = { ...eventData };

      updatedEventData.user.preferences = {
        ...updatedEventData.user.preferences,
        showPinnedOnly: newFilters.showPinnedOnly,
      };

      setEventData(updatedEventData);
    }
  };

  const handlePinRequest = async (
    creditRequestId: string | undefined,
    isPinned: string
  ) => {
    setBoardData((prevState) => ({
      ...prevState,
      requestsPinned: prevState.requestsPinned.map((card) =>
        card.creditRequestId === creditRequestId ? { ...card, isPinned } : card
      ),
    }));
    await ChangeAnchorToCreditRequest(creditRequestId, isPinned);
    await fetchBoardData();
  };

  return (
    <>
      <BoardLayoutUI
        isMobile={isMobile}
        selectOptions={filters.selectOptions}
        boardOrientation={filters.boardOrientation}
        BoardRequests={filteredRequests}
        searchRequestValue={filters.searchRequestValue}
        showPinnedOnly={filters.showPinnedOnly}
        pinnedRequests={boardData.requestsPinned}
        errorLoadingPins={errorLoadingPins}
        handleSelectCheckChange={(e) =>
          handleFiltersChange({
            selectOptions: filters.selectOptions.map((option) =>
              option.id === e.target.name
                ? { ...option, checked: e.target.checked }
                : option
            ),
          })
        }
        handlePinRequest={handlePinRequest}
        handleShowPinnedOnly={(e) =>
          handleFiltersChange({ showPinnedOnly: e.target.checked })
        }
        handleSearchRequestsValue={(e) =>
          handleFiltersChange({ searchRequestValue: e.target.value })
        }
        onOrientationChange={(orientation) =>
          handleFiltersChange({ boardOrientation: orientation })
        }
      />
    </>
  );
}

export { BoardLayout };
