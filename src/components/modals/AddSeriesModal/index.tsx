import * as Yup from "yup";
import { Formik, FormikValues } from "formik";
import localforage from "localforage";
import { createPortal } from "react-dom";
import { MdClear, MdOutlineAttachMoney } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Text } from "@inubekit/text";
import { inube } from "@inubekit/foundations";
import { Blanket } from "@inubekit/blanket";
import { Divider } from "@inubekit/divider";
import { Icon } from "@inubekit/icon";
import { Textfield } from "@inubekit/textfield";
import { Select } from "@inubekit/select";
import { Stack } from "@inubekit/stack";
import { Button } from "@inubekit/button";
import { Datefield } from "@inubekit/datefield";

import { TableExtraordinaryInstallmentProps } from "@pages/prospect/components/TableExtraordinaryInstallment";
import {
  handleChangeWithCurrency,
  validateCurrencyField,
} from "@utils/formatData/currency";
import {
  frequencyOptionsMock,
  paymentMethodOptionsMock,
} from "@mocks/prospect/extraordinaryInstallment.mock";
import { validationMessages } from "@validations/validationMessages";

import {
  StyledModal,
  StyledContainerClose,
  StyledContainerTitle,
} from "./styles";
import { dataAddSeriesModal } from "./config";

export interface AddSeriesModalProps {
  handleClose: () => void;
  onSubmit: () => void;
  onConfirm: (values: FormikValues) => void;
  initialValues: FormikValues;
  portalId?: string;
}

export function AddSeriesModal(props: AddSeriesModalProps) {
  const {
    portalId = "portal",
    initialValues,
    onConfirm,
    handleClose,
    onSubmit,
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  const validationSchema = Yup.object({
    paymentMethod: Yup.string().required(""),
    amount: Yup.number().required(""),
    value: Yup.number().required(""),
    frequency: Yup.string().required(""),
    datePayment: Yup.date().required(""),
  });

  const handleFormSubmit = async (values: FormikValues) => {
    const storedData =
      (await localforage.getItem<TableExtraordinaryInstallmentProps[]>(
        "extraordinary_installments"
      )) || [];

    const updatedValues = {
      ...values,
    };

    if (values.id) {
      const updatedData = storedData.map((item) =>
        item.id === values.id ? { ...item, ...updatedValues } : item
      );
      await localforage.setItem("extraordinary_installments", updatedData);
    } else {
      const newItem = {
        ...updatedValues,
        id: Date.now(),
      };
      await localforage.setItem("extraordinary_installments", [
        ...storedData,
        newItem,
      ]);
    }
    onConfirm(updatedValues);
  };

  return createPortal(
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, formikHelpers) => {
        await handleFormSubmit(values);
        formikHelpers.setSubmitting(false);
        handleClose();
      }}
    >
      {(formik) => (
        <Blanket>
          <StyledModal $smallScreen={isMobile}>
            <StyledContainerTitle>
              <Text type="headline" size="small">
                {dataAddSeriesModal.title}
              </Text>
              <StyledContainerClose onClick={handleClose}>
                <Stack alignItems="center" gap="8px">
                  <Text>{dataAddSeriesModal.close}</Text>
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
                name="paymentMethod"
                id="paymentMethod"
                label={dataAddSeriesModal.labelPaymentMethod}
                placeholder={dataAddSeriesModal.placeHolderSelect}
                options={paymentMethodOptionsMock}
                value={formik.values.paymentMethod}
                onChange={(name, value) => formik.setFieldValue(name, value)}
                onBlur={formik.handleBlur}
                size="wide"
                fullwidth
              />
              <Textfield
                name="amount"
                id="amount"
                label={dataAddSeriesModal.labelAmount}
                placeholder={dataAddSeriesModal.placeHolderAmount}
                onChange={(e) => handleChangeWithCurrency(formik, e)}
                value={validateCurrencyField("amount", formik, false, "")}
                onBlur={formik.handleBlur}
                size="wide"
                fullwidth
              />
              <Textfield
                name="value"
                id="value"
                label={dataAddSeriesModal.labelValue}
                placeholder={dataAddSeriesModal.placeHolderValue}
                iconBefore={
                  <MdOutlineAttachMoney color={inube.palette.green.G400} />
                }
                onChange={(e) => handleChangeWithCurrency(formik, e)}
                value={validateCurrencyField("value", formik, false, "")}
                onBlur={formik.handleBlur}
                fullwidth
              />
            </Stack>
            <Select
              name="frequency"
              id="frequency"
              label={dataAddSeriesModal.labelFrequency}
              placeholder={dataAddSeriesModal.placeHolderSelect}
              options={frequencyOptionsMock}
              value={formik.values.frequency}
              onChange={(name, value) => formik.setFieldValue(name, value)}
              onBlur={formik.handleBlur}
              size="wide"
              fullwidth
            />
            <Datefield
              name="datePayment"
              id="datePayment"
              label={dataAddSeriesModal.labelDate}
              value={formik.values.datePayment}
              onChange={(e) =>
                formik.setFieldValue("datePayment", e.target.value)
              }
              onBlur={formik.handleBlur}
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
                {dataAddSeriesModal.cancel}
              </Button>
              <Button
                type="button"
                disabled={!formik.dirty || !formik.isValid}
                onClick={formik.submitForm}
              >
                {dataAddSeriesModal.add}
              </Button>
            </Stack>
          </StyledModal>
        </Blanket>
      )}
    </Formik>,
    node
  );
}
