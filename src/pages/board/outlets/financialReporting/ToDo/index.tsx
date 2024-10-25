import { useState, useEffect, ChangeEvent } from "react";
import { Select } from "@inubekit/select";
import { Button } from "@inubekit/button";
import { useFlag } from "@inubekit/flag";
import { Icon } from "@inubekit/icon";
import { SkeletonLine } from "@inubekit/skeleton";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Textfield } from "@inubekit/textfield";
import { ItemNotFound } from "@components/layout/ItemNotFound";

import { Fieldset } from "@components/data/Fieldset";
import { Divider } from "@components/layout/Divider";
import { IStaff, IToDo } from "@services/types";
import { TextAreaModal } from "@components/modals/TextAreaModal";
import { get, getById } from "@mocks/utils/dataMock.service";
import userNotFound from "@assets/images/ItemNotFound.png";

import { StaffModal } from "./StaffModal";
import { errorMessagge, buttonText } from "./config";
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
  const { icon, button, isMobile, id } = props;
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staff, setStaff] = useState<IStaff[]>([]);
  const [toDo, setToDo] = useState<IToDo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignedStaff, setAssignedStaff] = useState({
    commercialManager: "",
    analyst: "",
  });
  const [tempStaff, setTempStaff] = useState(assignedStaff);
  const [decisionValue, setDecisionValue] = useState({
    decision: "",
  });

  const [loading, setLoading] = useState(true);
  const { addFlag } = useFlag();

  useEffect(() => {
    (async () => {
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
    })();
  }, [id]);

  const handleRetry = () => {
    setLoading(true);
  };

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

    addFlag({
      title: "Cambio realizado",
      description: "El cambio se realizó con éxito.",
      appearance: "success",
      duration: 5000,
    });
  };

  const handleSend = async () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Fieldset
        title="Por hacer"
        descriptionTitle={assignedStaff.commercialManager}
        heightFieldset="277px"
        hasOverflow
        aspectRatio={isMobile ? "auto" : "1"}
      >
        {toDo.length === 0 ? (
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
              <Stack padding="16px 0px 0px 0px" width="100%">
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
              padding="8px 0px 0px 0px"
            >
              {isModalOpen && (
                <TextAreaModal
                title="Confirmar la decisión"
                buttonText="Enviar"
                secondaryButtonText="Cancelar"
                inputLabel="Justificación"
                maxLength={120}
                inputPlaceholder="Describa el motivo de su decisión."
                onSecondaryButtonClick={handleCloseModal}
                onCloseModal={handleCloseModal}
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
