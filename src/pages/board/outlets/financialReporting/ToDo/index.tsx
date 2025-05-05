import { useState, useEffect, ChangeEvent, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Stack,
  Icon,
  Text,
  SkeletonLine,
  IOption,
  Select,
  Button,
  useFlag,
} from "@inubekit/inubekit";

import { Fieldset } from "@components/data/Fieldset";
import { Divider } from "@components/layout/Divider";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { getCreditRequestByCode } from "@services/creditRequets/getCreditRequestByCode";
import { getSearchDecisionById } from "@services/todo/SearchDecisionById";
import { IStaff, IToDo, ICreditRequest } from "@services/types";
import { getToDoByCreditRequestId } from "@services/todo/getToDoByCreditRequestId";
import { capitalizeFirstLetterEachWord } from "@utils/formatData/text";
import { truncateTextToMaxLength } from "@utils/formatData/text";
import { DecisionModal } from "@pages/board/outlets/financialReporting/ToDo/DecisionModal";
import { AppContext } from "@context/AppContext";
import userNotFound from "@assets/images/ItemNotFound.png";
import {
  ICommercialManagerAndAnalyst,
  ICreditRequests,
} from "@pages/SubmitCreditApplication/types";
import { saveCredit } from "./StaffModal/utils";

import { getCommercialManagerAndAnalyst } from "@services/commercialManagerAndAnalyst";

import { StaffModal } from "./StaffModal";
import { errorMessagge, txtLabels, txtTaskQuery } from "./config";
import { IICon, IButton } from "./types";
import { getXAction } from "./util/utils";
import { StyledHorizontalDivider, StyledTextField } from "../styles";
import { errorMessages, errorObserver } from "../config";
import {
  textFlagsUsers,
} from "@config/pages/staffModal/addFlag";

interface ToDoProps {
  icon?: IICon;
  button?: IButton;
  isMobile?: boolean;
  user: string;
  id: string;
}

function ToDo(props: ToDoProps) {
  const { icon, button, isMobile, id } = props;
  const { approverid } = useParams();
  const [analystList, setAnalystList] = useState<
    ICommercialManagerAndAnalyst[]
  >([]);
  const [accountManagerList, setAccountManagerList] = useState<
    ICommercialManagerAndAnalyst[]
  >([]);
  const [requests, setRequests] = useState<ICreditRequest | null>(null);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staff, setStaff] = useState<IStaff[]>([]);
  const [taskDecisions, setTaskDecisions] = useState<IOption[]>([]);
  const [selectedDecision, setSelectedDecision] = useState<IOption | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState<IToDo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [assignedStaff, setAssignedStaff] = useState({
    commercialManager: "",
    analyst: "",
  });
  const [tempStaff, setTempStaff] = useState(assignedStaff);
  const [decisionValue, setDecisionValue] = useState({
    decision: "",
  });
  const [selectedCommercialManager, setSelectedCommercialManager] =
    useState<ICommercialManagerAndAnalyst | null>(null);
  const [selectedAnalyst, setSelectedAnalyst] =
    useState<ICommercialManagerAndAnalyst | null>(null);
  const { businessUnitSigla, eventData } = useContext(AppContext);
  const { addFlag } = useFlag();
  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;
  const [showModal, setShowModal] = useState(false);
  const { userAccount } =
    typeof eventData === "string" ? JSON.parse(eventData).user : eventData.user;

  useEffect(() => {
    const fetchCreditRequest = async () => {
      try {
        const data = await getCreditRequestByCode(businessUnitPublicCode, id);
        setRequests(data[0] as ICreditRequest);
      } catch (error) {
        console.error(error);
        errorObserver.notify({
          id: "Management",
          message: (error as Error).message.toString(),
        });
      }
    };

    if (id) {
      fetchCreditRequest();
    }
  }, [businessUnitPublicCode, id]);

  useEffect(() => {
    const fetchToDoData = async () => {
      if (!requests?.creditRequestId) return;
      setLoading(true);
      try {
        const data = await getToDoByCreditRequestId(
          businessUnitPublicCode,
          requests.creditRequestId
        );
        setTaskData(data);
      } catch (error) {
        console.error(error);
        errorObserver.notify({
          id: "Management",
          message: (error as Error).message.toString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchToDoData();
  }, [businessUnitPublicCode, requests?.creditRequestId]);
  useEffect(() => {
    if (taskData?.usersByCreditRequestResponse) {
      const formattedStaff = taskData.usersByCreditRequestResponse.map(
        (staffMember: IStaff) => ({
          ...staffMember,
          userName: capitalizeFirstLetterEachWord(staffMember.userName),
        })
      );
      setStaff(formattedStaff);

      const firstAccountManager = formattedStaff.find(
        (staffMember) => staffMember.role === "CredicarAccountManag"
      );

      const firstAnalyst = formattedStaff.find(
        (staffMember) => staffMember.role === "CredicarAnalyst"
      );

      const newStaffState = {
        commercialManager: firstAccountManager?.userName || "",
        analyst: firstAnalyst?.userName || "",
      };

      setAssignedStaff(newStaffState);
      setTempStaff(newStaffState);
    }
  }, [taskData]);

  const handleRetry = async () => {
    setLoading(true);
    if (requests?.creditRequestId) {
      try {
        const data = await getToDoByCreditRequestId(
          businessUnitPublicCode,
          requests.creditRequestId
        );
        setTaskData(data);
      } catch (error) {
        console.error(error);
        errorObserver.notify({
          id: "Management",
          message: (error as Error).message.toString(),
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleStaffModal = () => setShowStaffModal((prev) => !prev);

  const handleSelectOfficial =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.innerText;
      setTempStaff((prev) => ({ ...prev, [key]: value }));
    };

  const onChangeDecision = (name: string, newValue: string) => {
    setDecisionValue({ ...decisionValue, [name]: newValue });

    const selected = taskDecisions.find(
      (decision) => decision.value === newValue
    );
    setSelectedDecision(selected || null);
  };

  const handleSubmit = () => {
    setAssignedStaff(tempStaff);
    handleToggleStaffModal();
  };

  const handleSend = () => {
    setIsModalOpen(true);
  };
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const isFetching = useRef(false);

  const handleSelectOpen = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    if (requests?.creditRequestId) {
      try {
        const decision = await getSearchDecisionById(
          businessUnitPublicCode,
          requests.creditRequestId
        );
        const formattedDecisions = Array.isArray(decision)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            decision.map((decisions: any, index: number) => ({
              id: `decision-${index}`,
              label: decisions.decision + ": " + decisions.value,
              value: decisions.value,
            }))
          : [];
        setTaskDecisions(formattedDecisions);
      } catch (error) {
        console.error(error);
        errorObserver.notify({
          id: "Management",
          message: (error as Error).message.toString(),
        });
      } finally {
        setLoading(false);
      }
    }
  };
  const handleCommercialManagerChange = (
    name: string,
    value: string,
    setFieldValue: (field: string, value: string) => void
  ) => {
    setFieldValue(name, value);
    const selectedManager = accountManagerList.find(
      (manager) => manager.staffName === value
    );
    if (selectedManager) {
      setSelectedCommercialManager(selectedManager);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [accountManagers, analysts] = await Promise.all([
          getCommercialManagerAndAnalyst("CredicarAccountManager", "Selsa"),
          getCommercialManagerAndAnalyst("CredicarAnalyst", "Selsa"),
        ]);
        setAccountManagerList(accountManagers);
        setAnalystList(analysts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleAnalystChange = (
    name: string,
    value: string,
    setFieldValue: (field: string, value: string) => void
  ) => {
    setFieldValue(name, value);
    const selected = analystList.find((analyst) => analyst.staffName === value);
    if (selected) {
      setSelectedAnalyst(selected);
    }
  };
  const buildCreditRequest = (
    role: string,
    user: ICommercialManagerAndAnalyst | null
  ): ICreditRequests | null => {
    if (!user) return null;

    return {
      creditRequestId: taskData?.creditRequestId || "",
      executed_task: taskData?.taskToBeDone || "",
      execution_date: new Date().toISOString().split("T")[0],
      identificationNumber: user.identificationDocumentNumber || "",
      identificationType: "C",
      role: role,
      transactionOperation: "Insert",
      userId: user.staffId || "",
      userName: user.staffName || "",
      justification: "Justificacion",
      creditRequestCode: "",
    };
  };
  const handleCreditRequests = async () => {
    const managerRequest = buildCreditRequest(
      "CredicarAccountManager".substring(0, 20),
      selectedCommercialManager
    );

    const analystRequest = buildCreditRequest(
      "CredicarAnalyst",
      selectedAnalyst
    );

    try {
      if (managerRequest) {
        await saveCredit(businessUnitPublicCode, managerRequest, userAccount);
        setAssignedStaff((prev) => ({
          ...prev,
          commercialManager: selectedCommercialManager?.staffName || "",
        }));
      }

      if (analystRequest) {
        await saveCredit(businessUnitPublicCode, analystRequest, userAccount);
        setAssignedStaff((prev) => ({
          ...prev,
          analyst: selectedAnalyst?.staffName || "",
        }));
      }

      addFlag({
        title: textFlagsUsers.titleSuccess,
        description: textFlagsUsers.descriptionSuccess,
        appearance: "success",
        duration: 5000,
      });
    } catch (error) {
      addFlag({
        title: textFlagsUsers.titleError,
        description: textFlagsUsers.descriptionError,
        appearance: "danger",
        duration: 5000,
      });
    } finally {
      handleToggleModal();
      setTimeout(() => {
        navigate(`/extended-card/${id}`);
      }, 6000);
    }
  };

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const validationId = () => {
    if (approverid === eventData.user.staff.staffId) {
      return true;
    } else {
      return false;
    }
  };

  const data = {
    makeDecision: {
      creditRequestId: requests?.creditRequestId || "",
      humanDecision: selectedDecision?.label.split(":")[0] || "",
      justification: "",
    },
    businessUnit: businessUnitPublicCode,
    user: userAccount,
    xAction: getXAction(
      selectedDecision?.label.split(":")[0] || "",
      validationId()
    ),
    humanDecisionDescription: selectedDecision?.label || "",
  };

  return (
    <>
      <Fieldset
        title={errorMessages.toDo.titleCard}
        descriptionTitle={assignedStaff.commercialManager}
        heightFieldset="241px"
        hasOverflow
        aspectRatio={isMobile ? "auto" : "1"}
      >
        {!taskData ? (
          <ItemNotFound
            image={userNotFound}
            title={errorMessages.toDo.title}
            description={errorMessages.toDo.description}
            buttonDescription={errorMessages.toDo.button}
            onRetry={handleRetry}
          />
        ) : (
          <Stack
            direction="column"
            gap={isMobile ? "4px" : "6px"}
            height={isMobile ? "auto" : "205px"}
          >
            <Stack direction={isMobile ? "column" : "row"}>
              {isMobile && (
                <Text appearance="primary" type="title" size="medium">
                  Tarea
                </Text>
              )}

              {loading ? (
                <SkeletonLine width="100%" animated />
              ) : (
                <Text
                  size={isMobile ? "medium" : "large"}
                  appearance={taskData?.taskToBeDone ? "dark" : "gray"}
                >
                  {taskData?.taskToBeDone ?? errorMessagge}
                </Text>
              )}
            </Stack>
            <Stack
              direction={isMobile ? "column" : "row"}
              gap={isMobile ? "2px" : "16px"}
              padding="8px 0px"
              alignItems="center"
            >
              <Stack width={isMobile ? "100%" : "340px"}>
                <Select
                  id="toDo"
                  name="decision"
                  label="Decisión"
                  value={decisionValue.decision}
                  placeholder="Seleccione una opción"
                  size="compact"
                  options={taskDecisions || []}
                  onChange={onChangeDecision}
                  onClick={handleSelectOpen}
                  fullwidth={isMobile}
                />
              </Stack>
              <Stack padding="16px 0px 0px 0px" width="100%">
                <Button
                  onClick={handleSend}
                  cursorHover
                  loading={button?.loading || false}
                  type="submit"
                  fullwidth={isMobile}
                  spacing="compact"
                >
                  {button?.label || txtLabels.buttonText}
                </Button>
              </Stack>
            </Stack>
            <Divider />
            <Stack
              padding="16px 0"
              justifyContent="space-between"
              direction="row"
              alignItems="center"
              gap="16px"
            >
              {isModalOpen && (
                <DecisionModal
                  title={txtLabels.title}
                  buttonText={txtLabels.buttonText}
                  secondaryButtonText={txtLabels.secondaryButtonText}
                  inputLabel={txtLabels.inputLabel}
                  inputPlaceholder={txtLabels.inputPlaceholder}
                  onSecondaryButtonClick={handleCloseModal}
                  onCloseModal={handleCloseModal}
                  data={data}
                />
              )}
              <Stack
                gap="16px"
                justifyContent="flex-start"
                direction={isMobile ? "column" : "row"}
              >
                <Stack justifyContent="start">
                  <Stack
                    direction="column"
                    alignItems="flex-start"
                    gap="16px"
                    padding={isMobile ? "0px" : "0px 100px 0px 0px"}
                  >
                    <StyledTextField>
                      <Text
                        type="body"
                        weight="bold"
                        size="small"
                        appearance="gray"
                        textAlign="start"
                      >
                        {txtTaskQuery.txtCommercialManager}
                      </Text>
                    </StyledTextField>
                    <StyledTextField>
                      <Text
                        type="title"
                        size="medium"
                        appearance="dark"
                        textAlign="start"
                      >
                        {truncateTextToMaxLength(
                          assignedStaff.commercialManager,
                          30
                        )}
                      </Text>
                    </StyledTextField>
                  </Stack>
                  <StyledHorizontalDivider $isMobile={isMobile} />
                </Stack>
                <Stack>
                  <Stack
                    direction="column"
                    alignItems="flex-start"
                    gap="16px"
                    padding={isMobile ? "0px" : "0px 100px 0px 0px"}
                  >
                    <StyledTextField>
                      <Text
                        type="body"
                        weight="bold"
                        size="small"
                        appearance="gray"
                        textAlign="start"
                      >
                        {txtTaskQuery.txtAnalyst}
                      </Text>
                    </StyledTextField>
                    <StyledTextField>
                      <Text
                        type="title"
                        size="medium"
                        appearance="dark"
                        textAlign="start"
                      >
                        {truncateTextToMaxLength(assignedStaff.analyst, 30)}
                      </Text>
                    </StyledTextField>
                  </Stack>

                  <StyledHorizontalDivider $isMobile={isMobile} />
                </Stack>
              </Stack>
              {icon && (
                <Stack alignItems="center" padding="0px 15px 0px  0px">
                  <Icon
                    icon={icon.icon}
                    appearance="primary"
                    size="24px"
                    onClick={handleToggleStaffModal}
                    cursorHover
                    disabled={staff === null}
                  />
                </Stack>
              )}
            </Stack>
          </Stack>
        )}
      </Fieldset>
      {showStaffModal && (
        <StaffModal
          commercialManager={tempStaff.commercialManager}
          analyst={tempStaff.analyst}
          onChange={handleSelectOfficial}
          onSubmit={handleSubmit}
          onCloseModal={handleToggleStaffModal}
          taskData={taskData}
          handleCommercialManagerChange={handleCommercialManagerChange}
          handleAnalystChange={handleAnalystChange}
          handleCreditRequests={handleCreditRequests}
          loading={loading}
          accountManagerList={accountManagerList}
          analystList={analystList}
        />
      )}
    </>
  );
}

export { ToDo };
