import { useState } from "react";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";
import { inube } from "@inubekit/foundations";
import { Blanket } from "@inubekit/blanket";
import { createPortal } from "react-dom";
import { MdClear, MdOutlineAttachMoney } from "react-icons/md";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Textfield } from "@inubekit/textfield";
import { Select } from "@inubekit/select";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";
import { Datefield, IDatefieldStatus } from "@inubekit/datefield"; 
import {
  StyledModal,
  StyledContainerClose,
  StyledContainerTitle,
} from "./styles";

import { AddSeriesModalProps } from "./type";

export function AddSeriesModal(props: AddSeriesModalProps) {
  const {
    title,
    buttonText,
    secondButtonText,
    portalId = "portal",
    handleClose,
    onSubmit,
    paymentMethodOptions,
    frequencyOptions,
  } = props;

  const node = document.getElementById(portalId);
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const [form, setForm] = useState({
    paymentMethod: "",
    frequency: "",
    field1: "",
    field2: "",
    date: "", 
    dateStatus: "pending", 
  });

  const onChange = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
  };

  const handleNumberChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const isValidDate = (value: string) => {
    return /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);
  };

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, date: e.target.value, dateStatus: "pending" });
  };

  const onDateBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = isValidDate(e.target.value);
    setForm({ ...form, dateStatus: isValid ? "pending" : "invalid" });
  };

  const dateMessage = "La fecha no es válida."; 

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <StyledContainerTitle>
          <Text type="headline" size="small">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap="8px">
              <Text>Cerrar</Text>
              <Icon
                appearance="dark"
                icon={<MdClear />}
                size="24px"
                cursorHover
              />
            </Stack>
          </StyledContainerClose>
        </StyledContainerTitle>
        <Divider />
        <Stack gap="24px" direction="column">
          <Select
            fullwidth
            id="paymentMethod"
            label="Medio de pago"
            name="paymentMethod"
            onChange={onChange}
            options={paymentMethodOptions}
            placeholder="Seleccione una opción"
            required={false}
            size="wide"
            value={form["paymentMethod"]}
          />
          <Textfield
            id="field1"
            label="Cantidad"
            placeholder="Número de pagos"
            fullwidth
            type="number"
            onChange={(e) => handleNumberChange("field1", e.target.value)}
            value={form.field1}
            size="wide"
          />
          <Textfield
            id="field2"
            label="Valor"
            iconBefore={
              <MdOutlineAttachMoney
                color={inube.icon.success.content.color.regular}
              />
            }
            placeholder="Valor a pagar"
            fullwidth
            type="number"
            onChange={(e) => handleNumberChange("field2", e.target.value)}
            value={form.field2}
          />
        </Stack>
        <Select
          id="frequency"
          name="frequency"
          label="Frecuencia de pago"
          placeholder="Seleccione una opción"
          options={frequencyOptions}
          value={form["frequency"]}
          onChange={onChange}
          size="wide"
          fullwidth
        />
        <Datefield
          id="date"
          label="Fecha"
          message={dateMessage}
          onChange={onDateChange}
          onBlur={onDateBlur}
          required={false}
          status={form.dateStatus as IDatefieldStatus}
          value={form.date}
          fullwidth
        />
        <Divider />
        <Stack justifyContent="flex-end" margin="s200 s0" gap="10px">
          <Button
            type="button"
            onClick={onSubmit}
            appearance="gray"
            variant="outlined"
          >
            {buttonText}
          </Button>
          <Button type="button" onClick={onSubmit}>
            {secondButtonText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}
