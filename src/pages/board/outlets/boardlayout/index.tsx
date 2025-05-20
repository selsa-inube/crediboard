import { useCallback, useContext, useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Stack, Icon, Text, useMediaQuery, useFlag } from "@inubekit/inubekit";

import { BaseModal } from "@components/modals/baseModal";
import { ICreditRequest } from "@services/types";
import { getCreditRequestPinned } from "@services/isPinned";
import { getCreditRequestInProgress } from "@services/creditRequets/getCreditRequestInProgress";
import { patchChangeAnchorToCreditRequest } from "@services/anchorCreditRequest";
import { AppContext } from "@context/AppContext";
import { mockErrorBoard } from "@mocks/error-board/errorborad.mock";

import { dataInformationModal } from "./config/board";
import { BoardLayoutUI } from "./interface";
import { selectCheckOptions } from "./config/select";
import { IBoardData } from "./types";
import { getEnumerators } from "@services/enumerators";
import { IEnumerator } from "@pages/SubmitCreditApplication/types";

function BoardLayout() {
  const { businessUnitSigla, eventData, setEventData } = useContext(AppContext);
  const [enumerators, setEnumerators] = useState<IEnumerator[]>([]);
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const identificationStaff = eventData.user.staff.identificationDocumentNumber;
  const staffId = eventData.user.staff.staffId;

  useEffect(() => {
    const orientation = isMobile ? "horizontal" : "vertical";
    setFilters((prevFilters) => ({
      ...prevFilters,
      boardOrientation: orientation,
    }));
  }, [isMobile]);

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  const { userAccount } =
    typeof eventData === "string" ? JSON.parse(eventData).user : eventData.user;

  const errorData = mockErrorBoard[0];

  const [recordsToFetch, setRecordsToFetch] = useState(0);
  const [recordsToFetchInitial, setRecordsToFetchInitial] = useState(79);

  const fetchBoardData = async (
    businessUnitPublicCode: string,
    limit: number,
    numberCard?: string,
    stage?: string,
    creditRequestStateAbbreviatedName?: string,
    inStage?: string
  ) => {
    try {
      const [boardRequestsResult, requestsPinnedResult] =
        await Promise.allSettled([
          getCreditRequestInProgress(
            businessUnitPublicCode,
            limit,
            numberCard,
            stage,
            creditRequestStateAbbreviatedName,
            inStage?.split(",")
          ),
          getCreditRequestPinned(businessUnitPublicCode),
        ]);

      if (boardRequestsResult.status === "fulfilled") {
        setBoardData((prevState) => ({
          ...prevState,
          boardRequests: boardRequestsResult.value,
        }));
        setFilteredRequests(boardRequestsResult.value);
      }

      if (requestsPinnedResult.status === "fulfilled") {
        setBoardData((prevState) => ({
          ...prevState,
          requestsPinned: requestsPinnedResult.value,
        }));
      } else {
        handleFlag(errorData.Summary[0], errorData.Summary[1]);
      }
    } catch (error) {
      console.error("Error fetching board data:", error);
      setErrorLoadingPins(true);
    }
  };

  const handleLoadMoreData = () => {
    setRecordsToFetch((prev) => prev + 50);
    setRecordsToFetchInitial((prev) => prev + 50);
  };

  const specialFilterMap: Record<
    string,
    {
      stage?: string;
      creditRequestStateAbbreviatedName?: string;
      inStage?: string;
    }
  > = {
    "2": {
      inStage:
        "GESTION_COMERCIAL,VERIFICACION_APROBACION,FORMALIZACION_GARANTIAS,TRAMITE_DESEMBOLSO",
    },
    "3": { stage: "GESTION_COMERCIAL" },
    "4": { stage: "VERIFICACION_APROBACION" },
    "5": { stage: "FORMALIZACION_GARANTIAS" },
    "6": { stage: "TRAMITE_DESEMBOLSO" },
    "7": { stage: "CUMPLIMIENTO_REQUISITOS" },
    "9": { creditRequestStateAbbreviatedName: "REVISION_CLIENTE" },
  };
  useEffect(() => {
    const hasFiltersActive = filters.selectOptions.some((o) => o.checked);

    if (!hasFiltersActive) {
      fetchBoardData(
        businessUnitPublicCode,
        recordsToFetchInitial,
        filters.searchRequestValue
      );
      return;
    }

    const fetchDataForActiveFilters = async () => {
      const activeFilterIds = filters.selectOptions
        .filter((o) => o.checked)
        .map((o) => o.id);

      const specialFilterIds = activeFilterIds.filter(
        (id) => id in specialFilterMap
      );

      if (specialFilterIds.length > 0) {
        const specialFilters = specialFilterIds.map(
          (id) => specialFilterMap[id]
        );


        const combineValues = (
          keys: (keyof (typeof specialFilterMap)[string])[]
        ) => {
          const combinedSet = new Set<string>();
          specialFilters.forEach((filter) => {
            keys.forEach((key) => {
              const value = filter[key];
              if (value) {
                value
                  .split(",")
                  .map((v) => v.trim())
                  .forEach((v) => combinedSet.add(v));
              }
            });
          });
          return combinedSet.size > 0
            ? Array.from(combinedSet).join(",")
            : undefined;
        };

        
        const allStages = combineValues(["stage", "inStage"]);
        const allCreditStates = combineValues([
          "creditRequestStateAbbreviatedName",
        ]);

        await fetchBoardData(
          businessUnitPublicCode,
          recordsToFetch,
          "",
          allStages,
          allCreditStates, 
          undefined
        );
        return;
      }

      applyLocalFilter();
    };

    fetchDataForActiveFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.selectOptions,
    businessUnitPublicCode,
    recordsToFetch,
    filters.searchRequestValue,
  ]);

  const applyLocalFilter = () => {
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
          case "1":
            return request.userWhoPinnnedId === staffId;

          case "10":
            return request.unreadNovelties === "Y";
          default:
            return false;
        }
      });
    });

    setFilteredRequests(finalFilteredRequests);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const accountManagers = await getEnumerators(businessUnitPublicCode);

        setEnumerators(accountManagers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [businessUnitPublicCode]);

  useEffect(() => {
    const updatedEventData = { ...eventData };
    updatedEventData.enumRole = enumerators;

    setEventData(updatedEventData);
  }, []);

  const handleFiltersChange = async (newFilters: Partial<typeof filters>) => {
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

  const { addFlag } = useFlag();

  const handleFlag = useCallback(
    (title: string, description: string) => {
      addFlag({
        title: title,
        description: description,
        appearance: "danger",
        duration: 5000,
      });
    },
    [addFlag]
  );

  const handlePinRequest = async (
    creditRequestId: string | undefined,
    identificationNumber: string[],
    userWhoPinnnedId: string,
    isPinned: string
  ) => {
    try {
      if (
        userWhoPinnnedId === staffId ||
        identificationNumber.includes(identificationStaff) ||
        isPinned === "Y"
      ) {
        setBoardData((prevState) => ({
          ...prevState,
          requestsPinned: prevState.requestsPinned.map((card) =>
            card.creditRequestId === creditRequestId
              ? { ...card, isPinned }
              : card
          ),
        }));

        await patchChangeAnchorToCreditRequest(
          businessUnitPublicCode,
          userAccount,
          creditRequestId,
          isPinned
        );
        await fetchBoardData(businessUnitPublicCode, recordsToFetch);
      } else {
        setIsOpenModal(true);
        return;
      }
    } catch (error) {
      handleFlag(errorData.anchor[0], errorData.anchor[1]);
    }
  };

  return (
    <>
      <BoardLayoutUI
        isMobile={isMobile}
        loading={loading}
        selectOptions={filters.selectOptions}
        boardOrientation={filters.boardOrientation}
        BoardRequests={filteredRequests}
        searchRequestValue={filters.searchRequestValue}
        showPinnedOnly={filters.showPinnedOnly}
        pinnedRequests={boardData.requestsPinned}
        errorLoadingPins={errorLoadingPins}
        handleLoadMoreData={handleLoadMoreData}
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
      {isOpenModal && (
        <BaseModal
          title={dataInformationModal.tilte}
          nextButton={dataInformationModal.button}
          handleNext={() => setIsOpenModal(false)}
          handleClose={() => setIsOpenModal(false)}
          width={isMobile ? "290px" : "403px"}
        >
          <Stack direction="column" alignItems="center" gap="16px">
            <Icon icon={<MdInfoOutline />} size="68px" appearance="primary" />
            <Text type="body" size="medium" appearance="gray">
              {dataInformationModal.description}
            </Text>
          </Stack>
        </BaseModal>
      )}
    </>
  );
}

export { BoardLayout };
