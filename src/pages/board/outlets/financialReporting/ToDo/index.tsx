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
import { IStaff, IToDo } from "@services/types";
import { addItem, get } from "@mocks/utils/dataMock.service";
import { getToDoByCreditRequestId } from "@services/todo/getToDoByCreditRequestId";
import { capitalizeFirstLetterEachWord } from "@utils/formatData/text";
import userNotFound from "@assets/images/ItemNotFound.png";
import { ItemNotFound } from "@components/layout/ItemNotFound";

import { StaffModal } from "./StaffModal";
import { traceObserver } from "../config";
import { errorMessagge, FlagMessage, flagMessages, buttonText } from "./config";
import { errorObserver } from "../config";
import { IICon, IButton } from "./types";

interface ToDoProps {
  icon?: IICon;
  button?: IButton;
  isMobile?: boolean;
  user: string;
  id: string;
}

function ToDo(props: ToDoProps) {
  const { icon, button, isMobile, id, user } = props;

  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staff, setStaff] = useState<IStaff[]>([]);
  const [taskDecisions, setTaskDecisions] = useState<IOption[]>();
  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState<IToDo | null>(null);
  const [hasFetchedDecisions, setHasFetchedDecisions] = useState(false);
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
    (async () => {
      setLoading(true);
      try {
        const data = await getToDoByCreditRequestId(id);
        setTaskData(data);
      } catch (error) {
        console.log(error);
        errorObserver.notify({
          id: "Management",
          message: (error as Error).message.toString(),
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (taskData && taskData.usersByCreditRequestResponse) {
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

      setAssignedStaff({
        commercialManager: firstAccountManager?.userName || "",
        analyst: firstAnalyst?.userName || "",
      });

      setTempStaff({
        commercialManager: firstAccountManager?.userName || "",
        analyst: firstAnalyst?.userName || "",
      });
    }
  }, [taskData]);

  const handleRetry = () => {
    setLoading(true);
  };

  const handleToggleStaffModal = () => setShowStaffModal((prev) => !prev);

  const handleSelectOfficial =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.innerText;
      setTempStaff((prev) => ({ ...prev, [key]: value }));
    };

  const onChangeDecision = (name: string, newValue: string) => {
    setDecisionValue({ ...decisionValue, [name]: newValue });
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

  const handleSend = async () => {
    if (button?.onClick) button.onClick();

    const flagMessagesMap: Record<string, FlagMessage> = {
      Aceptar: flagMessages.success,
      Rechazar: flagMessages.error,
      Pendiente: flagMessages.pending,
      Default: flagMessages.default,
    };

    const msgFlag =
      flagMessagesMap[decisionValue.decision] || flagMessagesMap.Default;

    addFlag({
      title: msgFlag.title,
      description: msgFlag.description,
      appearance: msgFlag.appearance,
      duration: 5000,
    });

    const trace = {
      trace_value: "Decision_made",
      credit_request_id: id,
      use_case: "decision_made",
      user_id: user,
      execution_date: new Date().toISOString(),
      justification: decisionValue.decision,
      decision_taken_by_user: decisionValue.decision,
      trace_type: "executed_task",
      read_novelty: "",
    };

    try {
      await addItem("trace", trace);
      traceObserver.notify(trace);
    } catch (error) {
      console.error("Error al enviar la decisión:", error);
    }
  };

  const handleSelectOpen = async () => {
    if (!hasFetchedDecisions) {
      try {
        const decisions = await get("decisions");
        setTaskDecisions(decisions as IOption[] | undefined);
      } catch (error) {
        console.log(error);
        errorObserver.notify({
          id: "Management",
          message: (error as Error).message.toString(),
        });
      } finally {
        setHasFetchedDecisions(true);
      }
    }
  };

  return (
    <>
      <Fieldset
        title="Por hacer"
        descriptionTitle={assignedStaff.commercialManager}
        heightFieldset="277px"
        hasOverflow
        aspectRatio="1"
      >
        {!taskData ? (
          <ItemNotFound
            image={userNotFound}
            title="No se encontraron tareas"
            description="Parece que no hay tareas disponibles para mostrar."
            buttonDescription="volver a intentar"
            route="/retry-path"
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
                  {button?.label || buttonText}
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
