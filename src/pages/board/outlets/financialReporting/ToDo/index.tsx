import { useState, useEffect } from "react";
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
import { IStaff, Requests } from "@services/types";
import { get } from "@mocks/utils/dataMock.service";

import { optionSelectDecision } from "./config";
import { StaffModal } from "./StaffModal";

interface IICon {
  icon: JSX.Element;
  onClick?: (e?: React.ChangeEvent) => void;
}

interface IButton {
  label: string;
  onClick: (e?: React.ChangeEvent) => void;
  disabled: boolean;
  loading?: boolean;
}

interface ToDoProps {
  icon?: IICon;
  button?: IButton;
  isMobile?: boolean;
  data: Requests;
}

export const ToDo = (props: ToDoProps) => {
  const { icon, button, isMobile, data } = props;
  const { label, onClick, disabled, loading } = button || {};
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staff, setStaff] = useState<IStaff[]>([]);
  const [assignedStaff, setAssignedStaff] = useState({
    commercialManager: "Jorge Enrique Díaz Vargas",
    analyst: "Ana Patricia García Herrera",
  });
  const [tempStaff, setTempStaff] = useState(assignedStaff);
  const [changeDecision, setChangeDecision] = useState({ decision: "" });

  const handleToggleStaffModal = () => {
    setShowStaffModal(!showStaffModal);
  };

  const handleSelectOfficial =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.innerText;
      setTempStaff((prev) => ({ ...prev, [key]: value }));
    };

  const onChangeDecision = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.innerText;
    setChangeDecision({ decision: value });
  };

  const handleSubmit = () => {
    setAssignedStaff(tempStaff);
    handleToggleStaffModal();
  };

  useEffect(() => {
    get("staff")
      .then((data) => {
        if (data && Array.isArray(data)) {
          setStaff(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching staff data:", error.message);
      });
  }, []);

  return (
    <>
      <Fieldset
        title="Por hacer"
        descriptionTitle="Juan Sebastian Moralez García"
        heigthFieldset={isMobile ? "inherit" : "284px"}
        isMobile={isMobile}
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
              {data?.n_Descr_Tarea}
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
                value={changeDecision.decision}
                placeholder="Seleccione una opción"
                size="compact"
                fullwidth
                options={optionSelectDecision}
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
};
