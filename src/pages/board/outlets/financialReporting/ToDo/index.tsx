import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineThumbUp } from "react-icons/md";
import { Select } from "@inubekit/select";
import { Button } from "@inubekit/button";
import { Flag } from "@inubekit/flag";
import { Icon } from "@inubekit/icon";
import { SkeletonLine } from "@inubekit/skeleton";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";

import { Fieldset } from "@components/data/Fieldset";
import { Divider } from "@components/layout/Divider";
import { IStaff, IToDo } from "@services/types";
import { get, getDataById } from "@mocks/utils/dataMock.service";

import { StaffModal } from "./StaffModal";
import { flagMessages } from "./config";
import { StyledMessageContainer } from "../styles";

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
}

function ToDo(props: ToDoProps) {
  const { icon, button, isMobile } = props;
  const { id } = useParams();
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staff, setStaff] = useState<IStaff[]>([]);
  const [toDo, setToDo] = useState<IToDo[]>([]);
  const [assignedStaff, setAssignedStaff] = useState({
    commercialManager: "",
    analyst: "",
  });
  const [tempStaff, setTempStaff] = useState(assignedStaff);
  const [decision, setDecision] = useState({
    decision: "",
  });
  const [showFlagMessage, setShowFlagMessage] = useState(false);
  const [flagMessage, setFlagMessage] = useState(flagMessages.success);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [staffResult, toDoResult] = await Promise.allSettled([
        get("staff"),
        getDataById<IToDo[]>("to-do", "credit_request_state_id", id!),
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
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (toDo) {
      const { account_manager_name = "", analyst_name = "" } = toDo?.[0] ?? {};
      const commercialManager =
        account_manager_name || "Jorge Enrique Díaz Vargas";

      setAssignedStaff({ commercialManager, analyst: analyst_name });
      setTempStaff({ commercialManager, analyst: analyst_name });
    }
  }, [toDo]);

  const handleToggleStaffModal = () => setShowStaffModal((prev) => !prev);

  const handleSelectOfficial =
    (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.innerText;
      setTempStaff((prev) => ({ ...prev, [key]: value }));
    };

  const onChangeDecision = (name: string, newValue: string) => {
    console.log(name, newValue);
    setDecision({ ...decision, [name]: newValue });
  };

  const handleSubmit = () => {
    setAssignedStaff(tempStaff);
    handleToggleStaffModal();

    setFlagMessage(flagMessages.changeSuccess);
    setShowFlagMessage(true);
  };

  const handleSend = () => {
    if (button?.onClick) button.onClick();

    switch (decision.decision) {
      case "Aceptar":
        setFlagMessage(flagMessages.success);
        break;
      case "Rechazar":
        setFlagMessage(flagMessages.error);
        break;
      case "Pendiente":
        setFlagMessage(flagMessages.pending);
        break;
      default:
        setFlagMessage(flagMessages.default);
        break;
    }

    setShowFlagMessage(true);
  };

  console.log("andres", toDo?.[0]?.decisions);

  return (
    <>
      <Fieldset
        title="Por hacer"
        descriptionTitle={assignedStaff.commercialManager}
        heightFieldset={isMobile ? "inherit" : "284px"}
        hasOverflow
      >
        <Stack direction="column" gap={isMobile ? "4px" : "6px"}>
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
                {toDo?.[0]?.task_to_be_done ??
                  "No se puede cargar la información"}
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
                value={decision["decision"]}
                placeholder="Seleccione una opción"
                size="compact"
                fullwidth
                options={toDo?.[0]?.decisions ?? []}
                onChange={onChangeDecision}
                disabled={toDo === undefined}
              />
            </Stack>
            <Stack
              padding="16px 0px 0px 0px"
              width={isMobile ? "100%" : "auto"}
            >
              <Button
                onClick={handleSend}
                cursorHover
                disabled={toDo === undefined}
                loading={button?.loading || false}
                type="submit"
                fullwidth={isMobile}
              >
                {button?.label || "Enviar"}
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
                  size="32px"
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
                disabled={staff.length === 0}
              />
            </Stack>
            <Textfield
              id="analista"
              name="analista"
              label="Analista"
              placeholder="Analista"
              value={assignedStaff.analyst}
              fullwidth
              disabled={staff.length === 0}
            />
            {icon && !isMobile && (
              <Stack width="100px" height="70px" alignItems="end">
                <Icon
                  icon={icon.icon}
                  appearance="primary"
                  size="36px"
                  onClick={handleToggleStaffModal}
                  cursorHover
                  disabled={staff.length === 0}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
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
