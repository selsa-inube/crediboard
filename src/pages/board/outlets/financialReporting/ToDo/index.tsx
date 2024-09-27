import { useState, useEffect, ChangeEvent, useCallback } from "react";
import { MdOutlineThumbUp } from "react-icons/md";
import { Select } from "@inubekit/select";
import { Button } from "@inubekit/button";
import { Flag } from "@inubekit/flag";
import { Icon } from "@inubekit/icon";
import { SkeletonLine } from "@inubekit/skeleton";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { ItemNotFound } from "@components/layout/ItemNotFound";

import { Fieldset } from "@components/data/Fieldset";
import { Divider } from "@components/layout/Divider";
import { IStaff, IToDo } from "@services/types";
import { get, getById, addItem } from "@mocks/utils/dataMock.service";
import userNotFound from "@assets/images/ItemNotFound.png";

import { StaffModal } from "./StaffModal";
import { traceObserver } from "../config";
import { errorMessagge, FlagMessage, flagMessages, buttonText } from "./config";
import { StyledMessageContainer } from "../styles";
import { errorObserver } from "../config";

interface IICon {
  icon: JSX.Element;
  onClick?: (e?: ChangeEvent) => void;
}

interface IButton {
  label: string;
  onClick: (e?: ChangeEvent) => void;
  disabled: boolean;
  loading?: boolean;
}

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
  const [toDo, setToDo] = useState<IToDo[]>([]);
  const [assignedStaff, setAssignedStaff] = useState({
    commercialManager: "",
    analyst: "",
  });
  const [tempStaff, setTempStaff] = useState(assignedStaff);
  const [decisionValue, setDecisionValue] = useState({
    decision: "",
  });
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagMessage, setFlagMessage] = useState(flagMessages.success);

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [staffResult, toDoResult] = await Promise.allSettled([
        get("staff"),
        getById<IToDo[]>("to-do", "credit_request_state_id", id!, true),
      ]);

      if (
        staffResult.status === "fulfilled" &&
        !(staffResult.value instanceof Error)
      ) {
        setStaff(staffResult.value as IStaff[]);
      }

      if (
        toDoResult.status === "fulfilled" &&
        !(toDoResult.value instanceof Error)
      ) {
        setToDo(toDoResult.value as IToDo[]);
      } else {
        if (
          toDoResult.status === "rejected" ||
          toDoResult.value instanceof Error
        ) {
          errorObserver.notify({
            id: "Management",
            message: "Error al obtener los datos de gestión.",
          });
        }
        setToDo([]);
      }
    } catch (error) {
      console.log(error);
      errorObserver.notify({
        id: "Management",
        message: (error as Error).message.toString(),
      });
    } finally {
      setLoading(false);
    }
  }, [id]); // Add id to dependencies

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Only depend on fetchData

  useEffect(() => {
    if (toDo) {
      const { account_manager_name = "", analyst_name = "" } = toDo[0] ?? {};

      setAssignedStaff({
        commercialManager: account_manager_name,
        analyst: analyst_name,
      });
      setTempStaff({
        commercialManager: account_manager_name,
        analyst: analyst_name,
      });
    }
  }, [toDo]);

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

    setFlagMessage(flagMessages.changeSuccess);
    setShowFlagMessage(true);
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

    setFlagMessage(msgFlag);
    setShowFlagMessage(true);

    const trace = {
      trace_value: "Decision_made",
      credit_request_id: id,
      use_case: "decision_made",
      user_id: user,
      execution_date: new Date().toISOString(),
      justification: decisionValue,
      decision_taken_by_user: decisionValue,
      trace_type: "executed_task",
      read_novelty: "",
    };

    try {
      await addItem("trace", trace);
      traceObserver.notify(trace);
      setShowFlagMessage(true);
    } catch (error) {
      console.error("Error al enviar la decisión:", error);
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
        {toDo.length === 0 ? (
          <ItemNotFound
            image={userNotFound}
            title="No se encontraron tareas"
            description="Parece que no hay tareas disponibles para mostrar."
            buttonDescription="volver a intentar"
            route="/retry-path"
            onRetry={fetchData}
          />
        ) : (
          <Stack direction="column" gap={isMobile ? "4px" : "6px"} height={isMobile ? "auto" : "205px"}>
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
                  appearance={toDo?.[0]?.task_to_be_done ? "dark" : "gray"}
                >
                  {toDo?.[0]?.task_to_be_done ?? errorMessagge}
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
                    options={toDo?.[0]?.decisions ?? []}
                  onChange={onChangeDecision}
                  disabled={toDo === undefined}
                  fullwidth={isMobile}
              />
              </Stack>
              <Stack
                padding="16px 0px 0px 0px"
                width="100%"
              >
                <Button
                  onClick={handleSend}
                  cursorHover
                  disabled={toDo === undefined}
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
              padding="4px 0px 0px 0px"
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
          staff={staff}
          onChange={handleSelectOfficial}
          onSubmit={handleSubmit}
          onCloseModal={handleToggleStaffModal}
        />
      )}
      {showFlagMessage && (
        <StyledMessageContainer>
          <Flag
            title={flagMessage.title}
            description={flagMessage.description}
            appearance={flagMessage.appearance}
            icon={<MdOutlineThumbUp />}
            duration={5000}
            isMessageResponsive={false}
            closeFlag={() => setShowFlagMessage(false)}
          />
        </StyledMessageContainer>
      )}
    </>
  );
}

export { ToDo };
