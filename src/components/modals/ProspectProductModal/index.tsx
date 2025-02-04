import { Formik, FormikValues, FormikHelpers } from "formik";
import * as Yup from "yup";
import { createPortal } from "react-dom";
import { MdAttachMoney, MdPercent, MdClear } from "react-icons/md";
import { Textfield } from "@inubekit/textfield";
import { Select } from "@inubekit/select";
import { useMediaQuery } from "@inubekit/hooks";
import { Divider } from "@inubekit/divider";
import { Blanket } from "@inubekit/blanket";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";

import { truncateTextToMaxLength } from "@utils/formatData/text";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "@utils/formatData/currency";

import {
  StyledModal,
  StyledContainerClose,
  ScrollableContainer,
} from "./styles";
import {
  creditLineOptions,
  paymentMethodOptions,
  paymentCycleOptions,
  firstPaymentCycleOptions,
  termInMonthsOptions,
  amortizationTypeOptions,
  rateTypeOptions,
} from "./config";

interface EditProductModalProps {
  portalId: string;
  title: string;
  confirmButtonText: string;
  initialValues: FormikValues;
  iconBefore?: React.JSX.Element;
  iconAfter?: React.JSX.Element;
  onCloseModal: () => void;
  onConfirm: (values: FormikValues) => void;
}

function EditProductModal(props: EditProductModalProps) {
  const {
    portalId,
    title,
    confirmButtonText,
    initialValues,
    iconBefore,
    iconAfter,
    onCloseModal,
    onConfirm,
  } = props;

  const isMobile = useMediaQuery("(max-width: 550px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const validationSchema = Yup.object({
    creditLine: Yup.string().required("Campo requerido"),
    creditAmount: Yup.number().required("Campo requerido"),
    paymentMethod: Yup.string().required("Campo requerido"),
    paymentCycle: Yup.string().required("Campo requerido"),
    firstPaymentCycle: Yup.string().required("Campo requerido"),
    termInMonths: Yup.number().required("Campo requerido"),
    amortizationType: Yup.string().required("Campo requerido"),
    interestRate: Yup.number()
      .required("Campo requerido")
      .min(0, "No puede ser negativo"),
    rateType: Yup.string().required("Campo requerido"),
  });

  return createPortal(
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(
        values: FormikValues,
        formikHelpers: FormikHelpers<FormikValues>
      ) => {
        onConfirm(values);
        formikHelpers.setSubmitting(false);
      }}
    >
      {(formik) => (
        <Blanket>
          <StyledModal $smallScreen={isMobile}>
            <Stack
              direction="column"
              width="100%"
              gap={isMobile ? "4px" : "8px"}
            >
              <Stack justifyContent="space-between" alignItems="center">
                <Text type="headline" size="small" appearance="dark">
                  {truncateTextToMaxLength(title, 25)}
                </Text>
                <StyledContainerClose onClick={onCloseModal}>
                  <Stack alignItems="center" gap="8px">
                    <Text>Cerrar</Text>
                    <Icon
                      icon={<MdClear />}
                      size="24px"
                      cursorHover
                      appearance="dark"
                    />
                  </Stack>
                </StyledContainerClose>
              </Stack>
            </Stack>

            <Divider />

            <ScrollableContainer>
              <Stack direction="column" gap="24px" width="100%">
                <Select
                  label="Línea de crédito"
                  name="creditLine"
                  id="creditLine"
                  size="compact"
                  placeholder="Seleccione una opción"
                  options={creditLineOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.creditLine}
                  fullwidth
                />
                <Textfield
                  label="Monto del crédito"
                  name="creditAmount"
                  id="creditAmount"
                  placeholder="Monto solicitado"
                  value={validateCurrencyField(
                    "creditAmount",
                    formik,
                    false,
                    ""
                  )}
                  iconBefore={
                    <Icon
                      icon={<MdAttachMoney />}
                      appearance="success"
                      size="18px"
                      spacing="narrow"
                    />
                  }
                  size="compact"
                  onBlur={formik.handleBlur}
                  onChange={(e) => handleChangeWithCurrency(formik, e)}
                  fullwidth
                />
                <Select
                  label="Medio de pago"
                  name="paymentMethod"
                  id="paymentMethod"
                  size="compact"
                  placeholder="Seleccione una opción"
                  options={paymentMethodOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.paymentMethod}
                  fullwidth
                />
                <Select
                  label="Ciclo de pagos"
                  name="paymentCycle"
                  id="paymentCycle"
                  size="compact"
                  placeholder="Seleccione una opción"
                  options={paymentCycleOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.paymentCycle}
                  fullwidth
                />
                <Select
                  label="Primer ciclo de pago"
                  name="firstPaymentCycle"
                  id="firstPaymentCycle"
                  size="compact"
                  placeholder="Seleccione una opción"
                  options={firstPaymentCycleOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.firstPaymentCycle}
                  fullwidth
                />
                <Select
                  label="Plazo en meses"
                  name="termInMonths"
                  id="termInMonths"
                  size="compact"
                  placeholder="Seleccione una opción"
                  options={termInMonthsOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.termInMonths}
                  fullwidth
                />
                <Select
                  label="Tipo de amortización"
                  name="amortizationType"
                  id="amortizationType"
                  size="compact"
                  placeholder="Seleccione una opción"
                  options={amortizationTypeOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.amortizationType}
                  fullwidth
                />
                <Textfield
                  label="Tasa de interés"
                  name="interestRate"
                  id="interestRate"
                  placeholder="Ej: 0.9"
                  value={formik.values.interestRate}
                  iconAfter={
                    <Icon
                      icon={<MdPercent />}
                      appearance="dark"
                      size="18px"
                      spacing="narrow"
                    />
                  }
                  type="number"
                  size="compact"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullwidth
                />
                <Select
                  label="Tipo de tasa"
                  name="rateType"
                  id="rateType"
                  size="compact"
                  placeholder="Seleccione una opción"
                  options={rateTypeOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.rateType}
                  fullwidth
                />
              </Stack>
            </ScrollableContainer>
            <Divider />

            <Stack gap="24px" justifyContent="flex-end">
              <Button
                variant="outlined"
                appearance="gray"
                onClick={onCloseModal}
              >
                Cancelar
              </Button>
              <Button
                onClick={formik.submitForm}
                disabled={!formik.dirty || !formik.isValid}
                appearance="primary"
                iconBefore={iconBefore}
                iconAfter={iconAfter}
              >
                {confirmButtonText}
              </Button>
            </Stack>
          </StyledModal>
        </Blanket>
      )}
    </Formik>,
    node
  );
}

export { EditProductModal };
export type { EditProductModalProps };
