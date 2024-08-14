import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Icon,
  Stack,
  Select,
  Text,
  Textfield,
  inube,
} from "@inube/design-system";

import { Fieldset } from "@components/data/Fieldset";
import { Divider } from "@components/layout/Divider";
import { IStaff, IToDo } from "@services/types";
import { get } from "@mocks/utils/dataMock.service";

import { StaffModal } from "./StaffModal";

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
  const [toDo, setToDo] = useState<IToDo | null>(null);
  const [assignedStaff, setAssignedStaff] = useState({
    commercialManager: "",
    analyst: "",
  });
  const [tempStaff, setTempStaff] = useState(assignedStaff);
  const [decision, setDecision] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [staffResult, toDoResult] = await Promise.allSettled([
        get("staff"),
        get("to-do"),
      ]);

      if (staffResult.status === "fulfilled") {
        setStaff(staffResult.value as IStaff[]);
      }

      if (toDoResult.status === "fulfilled") {
        const toDoList = toDoResult.value as IToDo[];
        const filteredToDo = toDoList.find(
          (item) => item.credit_request_state_id === id
        );
        setToDo(filteredToDo || null);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (toDo) {
      const { account_manager_name = "", analyst_name = "" } = toDo;
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

  const onChangeDecision = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.innerText;
    setDecision(value);
  };

  const handleSubmit = () => {
    setAssignedStaff(tempStaff);
    handleToggleStaffModal();
  };

  const { label, onClick, disabled, loading } = button || {};

  return (
    <>
      <Fieldset
        title="Por hacer"
        descriptionTitle={assignedStaff.commercialManager}
        heightFieldset={isMobile ? "inherit" : "284px"}
        hasOverflow
      >
        <Stack
          direction="column"
          gap={isMobile ? inube.spacing.s050 : inube.spacing.s075}
        >
          <Stack direction={isMobile ? "column" : "row"}>
            {isMobile && (
              <Text appearance="primary" type="title" size="medium">
                Tarea
              </Text>
            )}
            <Text size={isMobile ? "medium" : "large"}>
              {toDo?.task_to_be_done}
            </Text>
          </Stack>
          <Stack
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? inube.spacing.s025 : inube.spacing.s200}
            padding="s100 s0"
            alignItems="center"
          >
            <Stack width={isMobile ? "100%" : "340px"}>
              <Select
                id="toDo"
                name="decision"
                label="Decisión"
                value={decision}
                placeholder="Seleccione una opción"
                size="compact"
                fullwidth
                options={toDo?.decisions}
                onChange={onChangeDecision}
              />
            </Stack>
            <Stack padding="s200 s0 s0 s0" width={isMobile ? "100%" : "auto"}>
              <Button
                onClick={onClick}
                cursorHover
                disabled={disabled || false}
                loading={loading || false}
                type="submit"
                fullwidth={isMobile}
              >
                {label || "Enviar"}
              </Button>
            </Stack>
          </Stack>
          <Divider />
          <Stack
            direction={isMobile ? "column" : "row"}
            gap={inube.spacing.s200}
            alignItems="center"
            padding="s100 s0 s0 s0"
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
                readOnly
              />
            </Stack>
            <Textfield
              id="analista"
              name="analista"
              label="Analista"
              placeholder="Analista"
              value={assignedStaff.analyst}
              fullwidth
              readOnly
            />
            {icon && !isMobile && (
              <Stack width="100px" height="70px" alignItems="end">
                <Icon
                  icon={icon.icon}
                  appearance="primary"
                  size="36px"
                  onClick={handleToggleStaffModal}
                  cursorHover
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
    </>
  );
}

export { ToDo };
