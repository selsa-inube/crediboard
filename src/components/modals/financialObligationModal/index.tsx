import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
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
  obligationTypeOptions,
  entityOptions,
  meansPaymentOptions,
} from "./config";
import { addItem } from "@src/mocks/utils/dataMock.service";


interface FinancialObligationModalProps {
  portalId?: string;
  title: string;
  confirmButtonText: string;
  initialValues: FormikValues;
  iconBefore?: React.JSX.Element;
  iconAfter?: React.JSX.Element;
  onCloseModal: () => void;
  onConfirm: (values: FormikValues) => void;
}

function FinancialObligationModal(props: FinancialObligationModalProps) {
  const {
    portalId = "portal",
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
    obligationType: Yup.string().required("Campo requerido"),
    balance: Yup.number().required("Campo requerido"),
    fee: Yup.number().required("Campo requerido"),
    entity: Yup.string().required("Campo requerido"),
    meansPayment: Yup.string().required("Campo requerido"),
    quota: Yup.string().required("Campo requerido"),
  });

  const handleFormSubmit = async (values: FormikValues) => {
    await addItem("financial_obligation", {
      type: values.obligationType,
      balance: values.balance,
      fee: values.fee,
      entity: values.entity,
      payment: values.meansPayment,
      id: values.id,
      height: values.quota,
      actions: "", 
    });

    onConfirm(values); 
  };

  return createPortal(
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
        await handleFormSubmit(values);
        formikHelpers.setSubmitting(false);
        onCloseModal();
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
                  label="Tipo"
                  name="obligationType"
                  id="obligationType"
                  size="compact"
                  placeholder="Seleccione una opción"
                  options={obligationTypeOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.obligationType}
                  fullwidth
                />
                <Textfield
                  label="Saldo"
                  name="balance"
                  id="balance"
                  placeholder="Monto solicitado"
                  value={validateCurrencyField("balance", formik, false)}
                  size="compact"
                  onBlur={formik.handleBlur}
                  onChange={(e) => handleChangeWithCurrency(formik, e)}
                  fullwidth
                />
                <Textfield
                  label="Cuota"
                  name="fee"
                  id="fee"
                  placeholder="Monto solicitado"
                  value={validateCurrencyField("fee", formik, false)}
                  size="compact"
                  onBlur={formik.handleBlur}
                  onChange={(e) => handleChangeWithCurrency(formik, e)}
                  fullwidth
                />
                <Select
                  label="Entidad"
                  name="entity"
                  id="entity"
                  size="compact"
                  placeholder="Seleccione una opción"
                  options={entityOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.entity}
                  fullwidth
                />
                <Select
                  label="Medio de pago"
                  name="meansPayment"
                  id="meansPayment"
                  size="compact"
                  placeholder="Seleccione una opción"
                  options={meansPaymentOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.meansPayment}
                  fullwidth
                />
                <Textfield
                  label="Id"
                  name="id"
                  id="id"
                  placeholder="Monto solicitado"
                  value={formik.values.id}
                  size="compact"
                  onBlur={formik.handleBlur}
                  onChange={(e) => handleChangeWithCurrency(formik, e)}
                  fullwidth
                />
                <Textfield
                  label="Altura"
                  name="quota"
                  id="quota"
                  placeholder="Monto solicitado"
                  value={formik.values.quota}
                  size="compact"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
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


export { FinancialObligationModal };
export type { FinancialObligationModalProps };
