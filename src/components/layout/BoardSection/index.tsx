
import { useContext, useEffect, useRef, useState, useCallback } from "react";
import {
  MdOutlineChevronRight,
  MdOutlineFilterAlt,
  MdOutlineFilterAltOff,
} from "react-icons/md";
import {
  Stack,
  Icon,
  Text,
  useFlag,
  useMediaQueries,
  Button,
} from "@inubekit/inubekit";

import { SummaryCard } from "@components/cards/SummaryCard";
import { ICreditRequestPinned, ICreditRequest } from "@services/types";
import { mockErrorBoard } from "@mocks/error-board/errorborad.mock";
import { patchChangeTracesToReadById } from "@services/credit-request/command/patchChangeTracesToReadById";
import { AppContext } from "@context/AppContext";
import { textFlagsUsers } from "@config/pages/staffModal/addFlag";
import { getCanUnpin } from "@utils/configRules/permissions";
import { ruleConfig } from "@utils/configRules/configRules";
import { evaluateRule } from "@utils/configRules/evaluateRules";
import { postBusinessUnitRules } from "@services/businessUnitRules";

import { StyledBoardSection, StyledCollapseIcon } from "./styles";
import { SectionBackground, SectionOrientation } from "./types";
import { configOption } from "./config";

interface BoardSectionProps {
  sectionTitle: string;
  sectionBackground: SectionBackground;
  orientation: SectionOrientation;
  sectionInformation: ICreditRequest[];
  pinnedRequests: ICreditRequestPinned[];
  errorLoadingPins: boolean;
  searchRequestValue: string;
  handlePinRequest: (
    requestId: string,
    userWhoPinnnedId: string,
    isPinned: string
  ) => void;
  handleLoadMoreData: () => void;
  dragIcon?: React.ReactElement;
  onOrientationChange: (orientation: SectionOrientation) => void;
}

function BoardSection(props: BoardSectionProps) {
  const {
    sectionTitle,
    sectionBackground = "light",
    orientation = "vertical",
    sectionInformation,
    pinnedRequests,
    errorLoadingPins,
    searchRequestValue,
    handlePinRequest,
    handleLoadMoreData,
    dragIcon,
    onOrientationChange,
  } = props;
  const disabledCollapse = sectionInformation.length === 0;

  const { "(max-width: 1024px)": isTablet, "(max-width: 595px)": isMobile } =
    useMediaQueries(["(max-width: 1024px)", "(max-width: 595px)"]);

  const [collapse, setCollapse] = useState(false);
  const [currentOrientation, setCurrentOrientation] =
    useState<SectionOrientation>(orientation);

  const flagMessage = useRef(false);
  const { businessUnitSigla, eventData } = useContext(AppContext);

  const missionName = eventData.user.staff.missionName;
  const staffId = eventData.user.staff.staffId;
  const [valueRule, setValueRule] = useState<Record<string, string[]>>({});

  const handleCollapse = () => {
    if (!disabledCollapse) {
      setCollapse(!collapse);
    }
  };

  function isRequestPinned(
    creditRequestId: string | undefined,
    pinnedRequests: ICreditRequestPinned[]
  ) {
    const pinnedRequest = pinnedRequests.find(
      (pinnedRequest) => pinnedRequest.creditRequestId === creditRequestId
    );
    return pinnedRequest && pinnedRequest.isPinned === "Y" ? true : false;
  }
  const { addFlag } = useFlag();

  const handleFlag = (title: string, description: string) => {
    addFlag({
      title: title,
      description: description,
      appearance: "danger",
      duration: 5000,
    });
  };

  const getNoDataMessage = () => {
    if (!sectionInformation || sectionInformation.length === 0) {
      return searchRequestValue
        ? `${configOption.noMatches} "${searchRequestValue}"`
        : `${configOption.textNodata}`;
    }
    return "";
  };
  const handleToggleOrientation = () => {
    const newOrientation =
      currentOrientation === "vertical" ? "horizontal" : "vertical";
    if (newOrientation === "horizontal") {
      setCollapse(true);
    }

    setCurrentOrientation(newOrientation);
    onOrientationChange(newOrientation);
  };

  const errorData = mockErrorBoard[0];
  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const hasUnreadNoveltiesError = sectionInformation.some(
        (request) => request.unreadNovelties === undefined
      );

      if (!flagMessage.current && hasUnreadNoveltiesError) {
        handleFlag(errorData.messages[0], errorData.Summary[1]);
        flagMessage.current = true;
      }
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionInformation]);

  const handleCardClick = async (creditRequestId: string | undefined) => {
    if (!businessUnitPublicCode || !creditRequestId) return;

    try {
      await patchChangeTracesToReadById(
        creditRequestId,
        businessUnitPublicCode
      );
    } catch (error) {
      addFlag({
        title: textFlagsUsers.titleError,
        description: textFlagsUsers.descriptionError,
        appearance: "danger",
        duration: 5000,
      });
    }
  };

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

  useEffect(() => {
    if (businessUnitPublicCode) {
      fetchValidationRulesData();
    }
  }, [businessUnitPublicCode, fetchValidationRulesData]);

  return (
    <StyledBoardSection
      $sectionBackground={sectionBackground}
      $orientation={orientation}
      $isTablet={isTablet}
    >
      <Stack
        justifyContent={
          orientation === "vertical" ? "space-between" : "flex-start"
        }
        alignItems="end"
        gap="24px"
      >
        <Stack
          alignItems="center"
          gap="8px"
          width={orientation === "vertical" ? "180px" : "auto"}
          height={orientation === "vertical" ? "56px" : "auto"}
        >
          {orientation !== "vertical" && (
            <StyledCollapseIcon
              $collapse={collapse}
              $disabledCollapse={disabledCollapse}
              onClick={handleCollapse}
            >
              <Icon
                icon={<MdOutlineChevronRight />}
                disabled={disabledCollapse}
                appearance="dark"
                size="26px"
                cursorHover
              />
            </StyledCollapseIcon>
          )}
          {dragIcon && (
            <Icon
              icon={
                currentOrientation === "vertical" ? (
                  <MdOutlineFilterAlt />
                ) : (
                  <MdOutlineFilterAltOff />
                )
              }
              appearance="primary"
              size="24px"
              onClick={handleToggleOrientation}
            />
          )}

          <Text
            type={orientation === "vertical" || isMobile ? "title" : "headline"}
            size={orientation === "vertical" || isMobile ? "large" : "medium"}
          >
            {sectionTitle}
          </Text>
        </Stack>

        <Text type="title" size="medium">
          {sectionInformation.length}
        </Text>
      </Stack>
      {(collapse || orientation === "vertical") && (
        <Stack
          wrap="wrap"
          alignItems="center"
          direction={orientation === "vertical" ? "column" : "row"}
          justifyContent={isMobile ? "center" : "flex-start"}
          gap="20px"
        >
          {sectionInformation.length > 0 ? (
            sectionInformation.map((request, index) => (
              <SummaryCard
                key={index}
                rad={request.creditRequestCode}
                date={request.creditRequestDateOfCreation}
                name={request.clientName}
                destination={request.moneyDestinationAbreviatedName}
                value={request.loanAmount}
                toDo={request.taskToBeDone}
                path={`extended-card/${request.creditRequestCode}`}
                isPinned={isRequestPinned(
                  request.creditRequestId,
                  pinnedRequests
                )}
                hasMessage={request.unreadNovelties === "Y"}
                onPinChange={() => {
                  if (request.creditRequestId) {
                    handlePinRequest(
                      request.creditRequestId,
                      request.userWhoPinnnedId || "",
                      isRequestPinned(request.creditRequestId, pinnedRequests)
                        ? "N"
                        : "Y"
                    );
                  }
                }}
                canUnpin={getCanUnpin(
                  staffId,
                  request.userWhoPinnnedId || "",
                  missionName || "",
                  valueRule
                )}
                onCardClick={() => handleCardClick(request.creditRequestId)}
                errorLoadingPins={errorLoadingPins}
              />
            ))
          ) : (
            <Stack gap="24px" alignItems="center" height="533px" width="100%">
              <Text type="title" size="small" appearance="gray">
                {getNoDataMessage()}
              </Text>
            </Stack>
          )}
          {orientation === "horizontal" && (
            <Stack justifyContent="center" width="100%">
              <Button
                variant="outlined"
                appearance="dark"
                onClick={handleLoadMoreData}
              >
                {configOption.load}
              </Button>
            </Stack>
          )}
        </Stack>
      )}
    </StyledBoardSection>
  );
}

export { BoardSection };
export type { BoardSectionProps };
