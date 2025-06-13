import { useCallback, useContext, useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Stack, Icon, Text, useMediaQuery, useFlag } from "@inubekit/inubekit";

import { BaseModal } from "@components/modals/baseModal";
import { ICreditRequest } from "@services/types";
import { getCreditRequestPinned } from "@services/credit-request/query/isPinned";
import { getCreditRequestInProgress } from "@services/credit-request/query/getCreditRequestInProgress";
import { patchChangeAnchorToCreditRequest } from "@services/credit-request/command/anchorCreditRequest";
import { AppContext } from "@context/AppContext";
import { mockErrorBoard } from "@mocks/error-board/errorborad.mock";
import { Filter } from "@components/cards/SelectedFilters/interface";
import { ruleConfig } from "@utils/configRules/configRules";
import { evaluateRule } from "@utils/configRules/evaluateRules";
import { postBusinessUnitRules } from "@services/businessUnitRules";


import { dataInformationModal } from "./config/board";
import { BoardLayoutUI } from "./interface";
import { selectCheckOptions } from "./config/select";
import { IBoardData } from "./types";

export interface IFilterFormValues {
  assignment: string;
  status?: string;
}

function BoardLayout() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { businessUnitSigla, eventData, setEventData } = useContext(AppContext);
  const [boardData, setBoardData] = useState<IBoardData>({
    boardRequests: [],
    requestsPinned: [],
  });
  const [activeOptions, setActiveOptions] = useState<Filter[]>([]);
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
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const missionName = eventData.user.staff.missionName;
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

  const [valueRule, setValueRule] = useState<Record<string, string[]>>({});
  const [recordsToFetch, setRecordsToFetch] = useState(79);

  const fetchBoardData = async (
    businessUnitPublicCode: string,
    limit: number,
    searchParam?: { filter?: string; text?: string }
  ) => {
    try {
      const [boardRequestsResult, requestsPinnedResult] =
        await Promise.allSettled([
          getCreditRequestInProgress(
            businessUnitPublicCode,
            limit,
            searchParam
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

  useEffect(() => {
    fetchBoardData(businessUnitPublicCode, recordsToFetch);
    fetchValidationRulesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessUnitPublicCode, recordsToFetch]);

  const handleLoadMoreData = () => {
    setRecordsToFetch((prev) => prev + 50);
  };

  const handleApplyFilters = async (values: IFilterFormValues) => {
    const assignmentIds = values.assignment.split(",");
    const activeFilteredValues: Filter[] = selectCheckOptions
      .filter((option) => assignmentIds.includes(option.id))
      .map((option, index) => ({
        id: option.id,
        label: option.label,
        value: option.value,
        type: "assignment",
        count: index + 1,
      }));

    const queryFilterString = activeFilteredValues
      .map((filter) => filter.value)
      .join(";");

    setActiveOptions(activeFilteredValues);

    await fetchBoardData(businessUnitPublicCode, recordsToFetch, {
      filter: `in.${queryFilterString}`,
    });

    setIsFilterModalOpen(false);
  };

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

  const fetchValidationRulesData = useCallback(async () => {
    const rulesValidate = ["PositionsAuthorizedToRemoveAnchorsPlacedByOther"];
    await Promise.all(
      rulesValidate.map(async (ruleName) => {
        const rule = ruleConfig[ruleName]?.({});
        if (!rule) return;

        try {
          const values = await evaluateRule(
            rule,
            postBusinessUnitRules,
            "value",
            businessUnitPublicCode
          );

          const extractedValues = Array.isArray(values)
            ? values
                .map((v) => (typeof v === "string" ? v : (v?.value ?? "")))
                .filter((val): val is string => val !== "")
            : [];

          setValueRule((prev) => {
            const current = prev[ruleName] || [];
            const merged = [...current, ...extractedValues];
            const unique = Array.from(new Set(merged));
            return { ...prev, [ruleName]: unique };
          });
        } catch (error: unknown) {
          console.error(`Error evaluando ${ruleName} para este usuario.`);
        }
      })
    );
  }, [businessUnitPublicCode]);

  const handlePinRequest = async (
    creditRequestId: string | undefined,
    userWhoPinnnedId: string,
    isPinned: string
  ) => {
    try {
      const isOwner = userWhoPinnnedId === staffId;
      const isUnpin = isPinned === "N";
      const isAuthorizedByRule =
        valueRule["PositionsAuthorizedToRemoveAnchorsPlacedByOther"]?.includes(
          missionName
        );

      if (isOwner || (isUnpin && isAuthorizedByRule) || isPinned === "Y") {
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
  const openFilterModal = useCallback(() => {
    setIsFilterModalOpen(true);
    setIsMenuOpen(false);
  }, []);
  const handleClearFilters = () => {
    setFilteredRequests(boardData.boardRequests);
    setActiveOptions([]);
    setFilters((prev) => ({
      ...prev,
      searchRequestValue: "",
      showPinnedOnly: false,
      selectOptions: selectCheckOptions,
    }));
  };
  const handleRemoveFilter = async (filterIdToRemove: string) => {
    const updatedActiveOptions = activeOptions.filter(
      (option) => option.id !== filterIdToRemove
    );
    setActiveOptions(updatedActiveOptions);

    const updatedFilterString = updatedActiveOptions
      .map((filter) => filter.value)
      .join(";")
      .trim();

    await fetchBoardData(businessUnitPublicCode, recordsToFetch, {
      filter: updatedFilterString ? `in.${updatedFilterString}` : undefined,
    });
  };

  const handleSearchRequestsValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    handleFiltersChange({ searchRequestValue: value });

    if (value.trim().length >= 3) {
      fetchBoardData(businessUnitPublicCode, recordsToFetch, {
        text: value.trim(),
      });
    }

    if (value.trim().length === 0) {
      fetchBoardData(businessUnitPublicCode, recordsToFetch);
    }
  };

  const closeFilterModal = useCallback(() => setIsFilterModalOpen(false), []);
  return (
    <>
      <BoardLayoutUI
        isMobile={isMobile}
        openFilterModal={openFilterModal}
        boardOrientation={filters.boardOrientation}
        BoardRequests={filteredRequests}
        searchRequestValue={filters.searchRequestValue}
        showPinnedOnly={filters.showPinnedOnly}
        pinnedRequests={boardData.requestsPinned}
        errorLoadingPins={errorLoadingPins}
        handleLoadMoreData={handleLoadMoreData}
        activeOptions={activeOptions}
        handlePinRequest={handlePinRequest}
        handleShowPinnedOnly={(e) =>
          handleFiltersChange({ showPinnedOnly: e.target.checked })
        }
        handleSearchRequestsValue={handleSearchRequestsValue}
        onOrientationChange={(orientation) =>
          handleFiltersChange({ boardOrientation: orientation })
        }
        isFilterModalOpen={isFilterModalOpen}
        handleApplyFilters={handleApplyFilters}
        handleClearFilters={handleClearFilters}
        handleRemoveFilter={handleRemoveFilter}
        isMenuOpen={isMenuOpen}
        selectOptions={[]}
        handleSelectCheckChange={() => {}}
        closeFilterModal={closeFilterModal}
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
