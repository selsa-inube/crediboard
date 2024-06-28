import { useState } from "react";
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
import { Requests } from "@services/types";

import { optionSelectDecision } from "./config";

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

interface IToDoProps {
  icon?: IICon;
  button?: IButton;
  isMobile?: boolean;
  data: Requests;
}

export const ToDo = (props: IToDoProps) => {
  const { icon, button, isMobile, data } = props;

  const { label, onClick, disabled, loading } = button || {};

  const [changeTextfield, setChangeTextfield] = useState({
    gestorComercial: "Juan Sebastian Moralez García",
    analista: "",
  });

  const [changeSelect, setChangeSelect] = useState<{ [key: string]: string }>({
    decision: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeTextfield({ ...changeTextfield, [e.target.name]: e.target.value });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.innerText;
    setChangeSelect({ decision: value });
  };
  return (
    <Fieldset
      title="Por hacer"
      descriptionTitle="Juan Sebastian Moralez García"
      heightFieldset={isMobile ? "inherit" : "284px"}
      isMobile={isMobile}
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
              value={changeSelect.decision}
              placeholder="Seleccione una opción"
              size="compact"
              fullwidth
              options={optionSelectDecision}
              onChange={onChange}
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
                onClick={icon.onClick}
                cursorHover
              />
            )}
            <Textfield
              id="gestorComercial"
              name="gestorComercial"
              label="Gestor Comercial"
              placeholder="Gestor Comercial"
              value={changeTextfield.gestorComercial}
              onChange={handleChange}
              fullwidth
              readOnly
            />
          </Stack>

          <Textfield
            id="analista"
            name="analista"
            label="Analista"
            placeholder="Analista"
            value={changeTextfield.analista}
            onChange={handleChange}
            fullwidth
            readOnly
          />

          {icon && !isMobile && (
            <Stack width="100px" height="70px" alignItems="end">
              <Icon
                icon={icon.icon}
                appearance="primary"
                size="36px"
                onClick={icon.onClick}
                cursorHover
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Fieldset>
  );
};
