import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@inubekit/hooks";

import { get, updateActive } from "@mocks/utils/dataMock.service";
import { PinnedRequest, ICreditRequest } from "@services/types";
import { getCreditRequestInProgress } from "@services/creditRequets/getCreditRequestInProgress";
import { AppContext } from "@context/AppContext/AppContext";

import { BoardLayoutUI } from "./interface";
import { selectCheckOptions } from "./config/select";
import { IBoardData } from "./types";

function BoardLayout() {
  const { user, updatePreferences } = useContext(AppContext);

  const [boardData, setBoardData] = useState<IBoardData>({
    boardRequests: [],
    requestsPinned: [],
  });

  const [filters, setFilters] = useState({
    searchRequestValue: "",
    showPinnedOnly: user.preferences.showPinnedOnly || false,
    selectOptions: selectCheckOptions,
    boardOrientation: user.preferences.boardOrientation || "vertical",
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

  useEffect(() => {
    getCreditRequestInProgress()
      .then((data) => {
        setBoardData((prevState) => ({
          ...prevState,
          boardRequests: data,
        }));
        setFilteredRequests(data);
      })
      .catch((error) => {
        console.error("Error fetching requests data:", error);
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
        setErrorLoadingPins(true);
        console.error("Error fetching requests pinned data:", error.message);
      });
  }, []);

  useEffect(() => {
    const filteredRequests = boardData.boardRequests.filter((request) => {
      const isSearchMatch =
        request.clientName
          .toLowerCase()
          .includes(filters.searchRequestValue.toLowerCase()) ||
        request.creditRequestCode
          .toString()
          .includes(filters.searchRequestValue);

      const isPinned =
        !filters.showPinnedOnly ||
        boardData.requestsPinned
          .filter((req) => req.isPinned === "Y")
          .map((req) => req.requestId)
          .includes(request.creditRequestCode);

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
      updatePreferences({ boardOrientation: newFilters.boardOrientation });
    }

    if (newFilters.showPinnedOnly !== undefined) {
      updatePreferences({ showPinnedOnly: newFilters.showPinnedOnly });
    }
  };

  const handlePinRequest = async (requestId: string) => {
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

  return (
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
  );
}

export { BoardLayout };
