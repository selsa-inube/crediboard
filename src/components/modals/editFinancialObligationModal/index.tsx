import { Formik, FormikValues } from "formik";
import localforage from "localforage";
import * as Yup from "yup";
import { createPortal } from "react-dom";
import { MdClear, MdOutlineAttachMoney } from "react-icons/md";
import { Textfield } from "@inubekit/textfield";
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

import { StyledModal, StyledContainerClose } from "./styles";
import { dataInputs } from "./config";

interface IEditFinancialObligationModalProps {
  portalId?: string;
  title: string;
  confirmButtonText: string;
  initialValues: FormikValues;
  iconBefore?: React.JSX.Element;
  iconAfter?: React.JSX.Element;
  onCloseModal: () => void;
  onConfirm: (values: FormikValues) => void;
}

function EditFinancialObligationModal(
  props: IEditFinancialObligationModalProps
) {
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
    fee: Yup.number().required(""),
    balance: Yup.number().required(""),
  });

  const handleFormSubmit = async (values: FormikValues) => {
    const storedData =
      (await localforage.getItem<ITableFinancialObligationsProps[]>(
        "financial_obligation"
      )) || [];

    if (values.id) {
      const updatedData = storedData.map((item) =>
        item.id === values.id ? { ...item, ...values } : item
      );
      await localforage.setItem("financial_obligation", updatedData);
    } else {
      const newItem = {
        ...values,
        id: Date.now(),
      };
      await localforage.setItem("financial_obligation", [
        ...storedData,
        newItem,
      ]);
    }

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
            <Grid
              templateColumns="1fr"
              autoRows="auto"
              gap="20px"
              width={isMobile ? "280px" : "100%"}
            >
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
                value={validateCurrencyField("fee", formik, false, "")}
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
                value={validateCurrencyField("balance", formik, false, "")}
                size="compact"
                onBlur={formik.handleBlur}
                onChange={(e) => handleChangeWithCurrency(formik, e)}
                fullwidth
              />
            </Grid>
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

export { EditFinancialObligationModal };
export type { IEditFinancialObligationModalProps };
