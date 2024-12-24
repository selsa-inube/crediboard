import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
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
import { Datefield } from "@inubekit/datefield";
import {
  StyledModal,
  StyledContainerClose,
  StyledContainerTitle,
} from "./styles";
import { paymentMethodOptions, frequencyOptions } from "./config";

import { AddSeriesModalProps, FormState } from "./type";

export function AddSeriesModal(props: AddSeriesModalProps) {
  const {
    title,
    buttonText,
    secondButtonText,
    portalId = "portal",
    initialValues,
    onConfirm,
    handleClose,
    onSubmit,
  } = props;

  const node = document.getElementById(portalId);
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const [form, setForm] = useState<FormState>({
    paymentMethod: "",
    frequency: "",
    field1: "",
    field2: "",
    date: "",
  });

  const onChange = (name: string, newValue: string) => {
    setForm({ ...form, [name]: newValue });
  };

  const handleNumberChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const isMobile = useMediaQuery("(max-width: 700px)");

  const validationSchema = Yup.object({
    paymentMethod: Yup.string().required("Campo requerido"),
    field1: Yup.number().required("Campo requerido"),
    field2: Yup.number().required("Campo requerido"),
    frequency: Yup.string().required("Campo requerido"),
    date: Yup.date().required("Campo requerido"),
  });

  return createPortal(
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => onConfirm()}
    >
      {(formik) => (
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
                onBlur={formik.handleBlur}
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
                  <MdOutlineAttachMoney color={inube.palette.green.G400} />
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
              label="Primer pago"
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required={false}
              value={form.date}
              fullwidth
            />
            <Divider />
            <Stack justifyContent="flex-end" margin="16px 0px" gap="10px">
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
        </Blanket>
      )}
    </Formik>,
    node
  );
}
