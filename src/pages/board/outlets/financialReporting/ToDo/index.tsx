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
  data: Requests;
}

export const ToDo = (props: IToDoProps) => {
  const { icon, button, data } = props;

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
      heigthFieldset="284px"
    >
      <Stack direction="column" gap={inube.spacing.s075}>
        <Stack>
          <Text>{data?.n_Descr_Tarea}</Text>
        </Stack>
        <Stack gap={inube.spacing.s200} padding="s100 s0" alignItems="center">
          <Stack width="340px">
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

          <Stack padding="s200 s0 s0 s0">
            <Button
              onClick={onClick}
              cursorHover
              disabled={disabled || false}
              loading={loading || false}
              type="submit"
            >
              {label || "Enviar"}
            </Button>
          </Stack>
        </Stack>
        <Divider />
        <Stack gap={inube.spacing.s200} alignItems="center" padding="s100 s0">
          <Textfield
            id="gestorComercial"
            name="gestorComercial"
            label="Gestor Comercial"
            placeholder="Gestor Comercial"
            value={changeTextfield.gestorComercial}
            onChange={handleChange}
          />

          <Textfield
            id="analista"
            name="analista"
            label="Analista"
            placeholder="Analista"
            value={changeTextfield.analista}
            onChange={handleChange}
          />

          {icon && (
            <Stack height="70px" alignItems="end">
              <Icon
                icon={icon.icon}
                appearance="primary"
                size="36px"
                onClick={icon.onClick}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Fieldset>
  );
};
