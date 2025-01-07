import { Formik, FormikValues } from "formik";
import localforage from "localforage";
import * as Yup from "yup";
import { createPortal } from "react-dom";
import { MdClear, MdOutlineAttachMoney, MdOutlineTag } from "react-icons/md";
import { Textfield } from "@inubekit/textfield";
import { Select } from "@inubekit/select";
import { useMediaQuery } from "@inubekit/hooks";
import { Divider } from "@inubekit/divider";
import { Blanket } from "@inubekit/blanket";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { Grid } from "@inubekit/grid";

import { ITableFinancialObligationsProps } from "@pages/prospect/components/TableObligationsFinancial";
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
  dataInputs,
} from "./config";

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

  const isMobile = useMediaQuery("(max-width: 880px)");
  const node = document.getElementById(portalId);

  if (node === null) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const validationSchema = Yup.object({
    type: Yup.string().required(""),
    entity: Yup.string().required(""),
    fee: Yup.number().required(""),
    balance: Yup.number().required(""),
    payment: Yup.string().required(""),
    feePaid: Yup.number()
      .required("")
      .test(function (value) {
        const { term } = this.parent;
        return value !== undefined && term !== undefined ? value < term : true;
      }),
    term: Yup.number().required(""),
  });

  const handleFormSubmit = async (values: FormikValues) => {
    const storedData =
      (await localforage.getItem<ITableFinancialObligationsProps[]>(
        "financial_obligation"
      )) || [];

    const updatedValues = {
      ...values,
      feePaid: `${values.feePaid || 0}/${values.term || 0}`,
    };

    if (values.id) {
      const updatedData = storedData.map((item) =>
        item.id === values.id ? { ...item, ...updatedValues } : item
      );
      await localforage.setItem("financial_obligation", updatedData);
    } else {
      const newItem = {
        ...updatedValues,
        id: Date.now(),
      };
      await localforage.setItem("financial_obligation", [
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
                    <Text>{dataInputs.close}</Text>
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
              <Grid
                templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
                autoRows="auto"
                gap="20px"
                width={isMobile ? "280px" : "100%"}
              >
                <Select
                  label={dataInputs.labelType}
                  name="type"
                  id="type"
                  size="compact"
                  placeholder={dataInputs.palaceHolderSelect}
                  options={obligationTypeOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.type}
                  fullwidth
                />
                <Select
                  label={dataInputs.labelEntity}
                  name="entity"
                  id="entity"
                  size="compact"
                  placeholder={dataInputs.palaceHolderSelect}
                  options={entityOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.entity}
                  fullwidth
                />
                <Textfield
                  label={dataInputs.labelFee}
                  name="fee"
                  id="fee"
                  iconBefore={
                    <Icon
                      icon={<MdOutlineAttachMoney />}
                      appearance="dark"
                      size="20px"
                    />
                  }
                  placeholder={dataInputs.palaceHolderFee}
                  value={validateCurrencyField("fee", formik, false)}
                  size="compact"
                  onBlur={formik.handleBlur}
                  onChange={(e) => handleChangeWithCurrency(formik, e)}
                  fullwidth
                />
                <Textfield
                  label={dataInputs.labelBalance}
                  name="balance"
                  id="balance"
                  iconBefore={
                    <Icon
                      icon={<MdOutlineAttachMoney />}
                      appearance="dark"
                      size="20px"
                    />
                  }
                  placeholder={dataInputs.palaceHolderBalance}
                  value={validateCurrencyField("balance", formik, false)}
                  size="compact"
                  onBlur={formik.handleBlur}
                  onChange={(e) => handleChangeWithCurrency(formik, e)}
                  fullwidth
                />
                <Select
                  label={dataInputs.labelPayment}
                  name="payment"
                  id="payment"
                  size="compact"
                  placeholder={dataInputs.palaceHolderSelect}
                  options={meansPaymentOptions}
                  onBlur={formik.handleBlur}
                  onChange={(name, value) => formik.setFieldValue(name, value)}
                  value={formik.values.payment}
                  fullwidth
                />
                <Textfield
                  label={dataInputs.labelId}
                  name="idUser"
                  id="idUser"
                  iconBefore={
                    <Icon
                      icon={<MdOutlineTag />}
                      appearance="dark"
                      size="20px"
                    />
                  }
                  placeholder={dataInputs.palaceHolderId}
                  value={formik.values.idUser}
                  size="compact"
                  onBlur={formik.handleBlur}
                  onChange={(e) => handleChangeWithCurrency(formik, e)}
                  fullwidth
                />
                <Textfield
                  label={dataInputs.labelFeePaid}
                  name="feePaid"
                  id="feePaid"
                  iconBefore={
                    <Icon
                      icon={<MdOutlineTag />}
                      appearance="dark"
                      size="20px"
                    />
                  }
                  placeholder={dataInputs.palaceHolderFeePaid}
                  value={formik.values.feePaid}
                  size="compact"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  fullwidth
                />
                <Textfield
                  label={dataInputs.labelterm}
                  name="term"
                  id="term"
                  iconBefore={
                    <Icon
                      icon={<MdOutlineTag />}
                      appearance="dark"
                      size="20px"
                    />
                  }
                  placeholder={dataInputs.palaceHolderterm}
                  value={formik.values.term}
                  size="compact"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  fullwidth
                />
              </Grid>
            </ScrollableContainer>
            <Divider />
            <Stack gap="24px" justifyContent="flex-end">
              <Button
                variant="outlined"
                appearance="gray"
                onClick={onCloseModal}
              >
                {dataInputs.cancel}
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
