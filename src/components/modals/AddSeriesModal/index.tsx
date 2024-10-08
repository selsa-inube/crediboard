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
  portalId?: string;
  formValues: FormValues;
  paymentMethodOptions: Option[]; 
  frequencyOptions: Option[];      
  firstPaymentOptions: Option[];   
}

export function AddSeriesModal(props: AddSeriesModalProps) {
  const {
    title,
    buttonText,
    portalId = "portal",
    handleClose,
    onSubmit,
    paymentMethodOptions, 
    frequencyOptions,      
    firstPaymentOptions,   
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
    firstPayment: "",
  });

  const onChange = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
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
            placeholder="(?)"
            fullwidth
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
          size="compact"
          fullwidth
        />
        <Select
          id="firstPayment"
          name="firstPayment"
          label="Primer pago"
          placeholder="Seleccione una opción"
          options={firstPaymentOptions} 
          value={form["firstPayment"]}
          onChange={onChange}
          size="compact"
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
            {buttonText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}
