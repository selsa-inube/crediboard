import { useState } from "react";
import { useMediaQuery, Blanket, Text, inube } from "@inube/design-system";
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

interface FormValues {
  field1: number;
  field2: number;
}

export interface Option {
  id: string;
  label: string;
  value: string;
}

export interface AddSeriesModalProps {
  title: string;
  handleClose: () => void;
  onSubmit: () => void;
  buttonText: string;
  secondButtonText: string;
  portalId?: string;
  formValues: FormValues;
  paymentMethodOptions: Option[];
  frequencyOptions: Option[];
}

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
    firstPayment: { value: "", status: "pending" as IDatefieldStatus },
    field1: "",
    field2: "",
  });

  const onChange = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
  };

  const handleNumberChange = (name: string, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setForm({ ...form, [name]: numericValue });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      firstPayment: { value: e.target.value, status: "pending" },
    });
  };

  const handleDateBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = isValidDate(e.target.value);
    setForm({
      ...form,
      firstPayment: {
        value: e.target.value,
        status: isValid ? "pending" : "invalid",
      },
    });
  };

  const handleDateFocus = () => {
    setForm({
      ...form,
      firstPayment: {
        ...form.firstPayment,
        status: form.firstPayment.status === "invalid" ? "invalid" : "pending",
      },
    });
  };

  const isValidDate = (value: string) => {
    return /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);
  };

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <StyledContainerTitle>
          <Text type="headline" size="small">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap={inube.spacing.s100}>
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
        <Stack gap={inube.spacing.s300} direction="column">
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
            type="text"
            onChange={(e) => handleNumberChange("field1", e.target.value)}
            value={form.field1}
            size="wide"
          />
          <Textfield
            id="field2"
            label="Valor"
            iconBefore={
              <MdOutlineAttachMoney
                color={inube.color.stroke.success.regular}
              />
            }
            placeholder="Valor a pagar"
            fullwidth
            type="text"
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
          id="firstPayment"
          name="firstPayment"
          label="Fecha del primer pago"
          value={form.firstPayment.value}
          onChange={handleDateChange}
          onBlur={handleDateBlur}
          onFocus={handleDateFocus}
          message="Formato de fecha no válido"
          status={form.firstPayment.status}
          size="wide"
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
