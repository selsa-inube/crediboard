import { useContext, useEffect, useState } from "react";

import { get, updateActive } from "@mocks/utils/dataMock.service";
import { PinnedRequest, Requests } from "@services/types";
import { AppContext } from "@context/AppContext";

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

  const [filteredRequests, setFilteredRequests] = useState<Requests[]>([]);

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
          .includes(filters.searchRequestValue.toLowerCase()) ||
        request.k_Prospe.toString().includes(filters.searchRequestValue);

      const isPinned =
        !filters.showPinnedOnly ||
        boardData.requestsPinned
          .filter((req) => req.isPinned === "Y")
          .map((req) => req.requestId)
          .includes(request.k_Prospe);

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
            ].includes(request.i_Estprs);
          case "3":
            return request.i_Estprs === "GESTION_COMERCIAL";
          case "4":
            return request.i_Estprs === "VERIFICACION_APROBACION";
          case "5":
            return request.i_Estprs === "FORMALIZACION_GARANTIAS";
          case "6":
            return request.i_Estprs === "TRAMITE_DESEMBOLSO";
          case "7":
            return request.i_Estprs === "CUMPLIMIENTO_REQUISITOS";
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

  return (
    <BoardLayoutUI
      selectOptions={filters.selectOptions}
      boardOrientation={filters.boardOrientation}
      BoardRequests={filteredRequests}
      searchRequestValue={filters.searchRequestValue}
      showPinnedOnly={filters.showPinnedOnly}
      pinnedRequests={boardData.requestsPinned}
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
