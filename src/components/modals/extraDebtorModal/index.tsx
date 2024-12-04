import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import localforage from "localforage";
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

import { ExtraDebtor } from "@pages/prospect/components/TableExtraDebtors";
import { truncateTextToMaxLength } from "@utils/formatData/text";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "@utils/formatData/currency";
import { addItem } from "@mocks/utils/dataMock.service";

import { StyledModal, StyledContainerClose } from "./styles";
import { typeDocument, genderOptions } from "./config";

interface ExtraDebtorModalProps {
  portalId?: string;
  title: string;
  confirmButtonText: string;
  initialValues: FormikValues;
  iconBefore?: React.JSX.Element;
  iconAfter?: React.JSX.Element;
  onCloseModal: () => void;
  onConfirm: () => void;
}

function ExtraDebtorModal(props: ExtraDebtorModalProps) {
  const {
    portalId = "portal",
    title,
    confirmButtonText,
    initialValues,
    iconBefore,
    iconAfter,
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 550px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const validationSchema = Yup.object({
    documentType: Yup.string().required("Campo requerido"),
    documentNumber: Yup.number().required("Campo requerido"),
    names: Yup.string().required("Campo requerido"),
    lastName: Yup.string().required("Campo requerido"),
    income: Yup.string().required("Campo requerido"),
    expenses: Yup.string().required("Campo requerido"),
    email: Yup.string().required("Campo requerido"),
    phone: Yup.number().required("Campo requerido"),
    gender: Yup.string().required("Campo requerido"),
  });

  const handleConfirm = async (values: FormikValues) => {
    try {
      const storedData =
        (await localforage.getItem<ExtraDebtor[]>("extra_debtors")) || [];

      if (values.id) {
        const updatedData = storedData.map((debtor) =>
          debtor.id === values.id ? { ...debtor, ...values } : debtor
        );
        await localforage.setItem("extra_debtors", updatedData);
      } else {
        await addItem("extra_debtors", {
          id: crypto.randomUUID(),
          ...values,
        });
      }

      onCloseModal();
    } catch (error) {
      console.error("Error updating data in localforage:", error);
    }
  };

  return createPortal(
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleConfirm}
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
            <Stack direction="column" gap="24px" width="100%">
              <Select
                label="Tipo de documento"
                name="documentType"
                id="documentType"
                size="compact"
                placeholder="Seleccione una opción"
                options={typeDocument}
                onBlur={formik.handleBlur}
                onChange={(name, value) => formik.setFieldValue(name, value)}
                value={formik.values.documentType}
                fullwidth
              />
              <Textfield
                label="Numero de documento"
                name="documentNumber"
                id="documentNumber"
                placeholder="Ej.: 1.000.000.000"
                value={validateCurrencyField("documentNumber", formik, false)}
                size="compact"
                onBlur={formik.handleBlur}
                onChange={(e) => handleChangeWithCurrency(formik, e)}
                fullwidth
              />
              <Textfield
                label="Nombres"
                name="names"
                id="names"
                placeholder="Escriba sus nombres"
                value={formik.values.names}
                size="compact"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullwidth
              />
              <Textfield
                label="Apellidos"
                name="lastName"
                id="lastName"
                placeholder="Escriba sus apellidos"
                value={formik.values.lastName}
                size="compact"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullwidth
              />
              <Textfield
                label="Ingresos"
                name="income"
                id="income"
                placeholder="Ej.: 1.300.000"
                value={validateCurrencyField("income", formik, false)}
                size="compact"
                onBlur={formik.handleBlur}
                onChange={(e) => handleChangeWithCurrency(formik, e)}
                fullwidth
              />
              <Textfield
                label="Egresos"
                name="expenses"
                id="expenses"
                placeholder="Ej.: 390.000"
                value={validateCurrencyField("expenses", formik, false)}
                size="compact"
                onBlur={formik.handleBlur}
                onChange={(e) => handleChangeWithCurrency(formik, e)}
                fullwidth
              />
              <Textfield
                label="Correo electrónico"
                name="email"
                id="email"
                type="email"
                placeholder="Escriba su correo electrónico"
                value={formik.values.email}
                size="compact"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullwidth
              />
              <Textfield
                label="Número de teléfono"
                name="phone"
                id="phone"
                type="number"
                placeholder="Escriba su número de teléfono"
                value={formik.values.phone}
                size="compact"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullwidth
              />
              <Select
                label="Género"
                name="gender"
                id="gender"
                size="compact"
                placeholder="Seleccione una opción"
                options={genderOptions}
                onBlur={formik.handleBlur}
                onChange={(name, value) => formik.setFieldValue(name, value)}
                value={formik.values.gender}
                fullwidth
              />
              <Divider />
            </Stack>
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

export { ExtraDebtorModal };
export type { ExtraDebtorModalProps };
