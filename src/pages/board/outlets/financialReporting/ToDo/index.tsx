import { useState, useEffect, ChangeEvent } from "react";
import { Select } from "@inubekit/select";
import { Button } from "@inubekit/button";
import { useFlag } from "@inubekit/flag";
import { Icon } from "@inubekit/icon";
import { SkeletonLine } from "@inubekit/skeleton";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { IOption } from "@inubekit/select";

import { Fieldset } from "@components/data/Fieldset";
import { Divider } from "@components/layout/Divider";
import { IStaff, IToDo, ICreditRequest } from "@services/types";
import { DecisionModal } from "@pages/board/outlets/financialReporting/ToDo/DecisionModal";
import { getToDoByCreditRequestId } from "@services/todo/getToDoByCreditRequestId";
import { capitalizeFirstLetterEachWord } from "@utils/formatData/text";
import userNotFound from "@assets/images/ItemNotFound.png";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { getCreditRequestByCode } from "@services/creditRequets/getCreditRequestByCode";
import { getSearchDecisionByTaskToBeDone } from "@src/services/todo/getSearchDecisionByTaskToBeDone";

import { StaffModal } from "./StaffModal";
import { errorMessagge, txtLabels, txtLabelsNoData } from "./config";
import { IICon, IButton } from "./types";
import { getXAction } from "./util/utils";
import { errorObserver } from "../config";

interface ToDoProps {
  icon?: IICon;
  button?: IButton;
  isMobile?: boolean;
  user: string;
  id: string;
}

function ToDo(props: ToDoProps) {
  const { icon, button, isMobile, id } = props;

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

  const { addFlag } = useFlag();

  useEffect(() => {
    const fetchCreditRequest = async () => {
      try {
        const data = await getCreditRequestByCode(id);
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
  }, [id]);

  useEffect(() => {
    const fetchToDoData = async () => {
      if (!requests?.creditRequestId) return;
      setLoading(true);
      try {
        const data = await getToDoByCreditRequestId(requests.creditRequestId);
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
  }, [requests?.creditRequestId]);

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
        (staffMember) => staffMember.position === "Account_manager"
      );

      const firstAnalyst = formattedStaff.find(
        (staffMember) => staffMember.position === "Analyst"
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
        const data = await getToDoByCreditRequestId(requests.creditRequestId);
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

    addFlag({
      title: "Cambio realizado",
      description: "El cambio se realizó con éxito.",
      appearance: "success",
      duration: 5000,
    });
  };

  const handleSend = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectOpen = async () => {
    setLoading(true);
    if (requests?.creditRequestId) {
      try {
        const decision = await getSearchDecisionByTaskToBeDone(
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

  const data = {
    creditRequestId: requests?.creditRequestId || "",
    executedTask: requests?.taskToBeDone || "",
    humanDecision: selectedDecision?.label.split(":")[0] || "",
    humanDecisionDescripcion: selectedDecision?.label || "",
    justification: "",
    xAction: getXAction(
      requests?.taskToBeDone || "",
      selectedDecision?.label.split(":")[0] || ""
    ),
  };

  return (
    <>
      <Fieldset
        title="Por hacer"
        descriptionTitle={assignedStaff.commercialManager}
        heightFieldset="241px"
        hasOverflow
        aspectRatio={isMobile ? "auto" : "1"}
      >
        {!taskData ? (
          <ItemNotFound
            image={userNotFound}
            title={txtLabelsNoData.title}
            description={txtLabelsNoData.description}
            buttonDescription={txtLabelsNoData.buttonDescription}
            route={txtLabelsNoData.route}
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
              direction={isMobile ? "column" : "row"}
              gap="16px"
              alignItems="center"
              padding="8px 0px 0px 0px"
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
              <Stack direction="column" width="100%" alignItems="end">
                {icon && isMobile && (
                  <Icon
                    icon={icon.icon}
                    appearance="primary"
                    size="24px"
                    onClick={handleToggleStaffModal}
                    cursorHover
                  />
                )}
                <Textfield
                  id="gestorComercial"
                  name="gestorComercial"
                  label="Gestor Comercial"
                  placeholder="Gestor Comercial"
                  value={assignedStaff.commercialManager}
                  fullwidth
                  disabled={staff === null}
                  size="compact"
                />
              </Stack>
              <Textfield
                id="analista"
                name="analista"
                label="Analista"
                placeholder="Analista"
                value={assignedStaff.analyst}
                fullwidth
                disabled={staff === null}
                size="compact"
              />
              {icon && !isMobile && (
                <Stack width="100px" height="50px" alignItems="end">
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
        />
      )}
    </>
  );
}

export { ToDo };
