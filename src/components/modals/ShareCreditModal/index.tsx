import { Formik } from "formik";
import * as Yup from "yup";
import { MdInfoOutline } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Textfield } from "@inubekit/textfield";

import { BaseModal } from "@components/modals/baseModal";

import { dataSharModal } from "./config";

export interface IShareCreditModalProps {
  handleClose: () => void;
  isMobile: boolean;
}

export function ShareCreditModal(props: IShareCreditModalProps) {
  const { handleClose, isMobile } = props;

  const initialValues = {
    name: "",
    email: "",
    aditionalEmail: "",
    share: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(""),
    email: Yup.string().email().required(""),
    aditionalEmail: Yup.string().email(),
    share: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {(formik) => (
        <BaseModal
          title={dataSharModal.title}
          nextButton={dataSharModal.share}
          backButton={dataSharModal.cancel}
          handleNext={() => {
            formik.submitForm();
            handleClose();
          }}
          handleBack={handleClose}
          disabledNext={!formik.dirty || !formik.isValid}
          width={isMobile ? "287px" : "402px"}
        >
          <Stack direction="column" gap="16px">
            <Stack direction="column">
              <Stack gap="4px">
                <Text type="label" weight="bold" size="medium">
                  {dataSharModal.name}
                </Text>
                <Text type="body" size="small" appearance="danger">
                  {dataSharModal.required}
                </Text>
              </Stack>
              <Textfield
                name="name"
                id="name"
                placeholder={dataSharModal.placeHolderName}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullwidth={true}
              />
            </Stack>
            <Stack direction="column">
              <Stack gap="4px">
                <Text type="label" weight="bold" size="medium">
                  {dataSharModal.email}
                </Text>
                <Text type="body" size="small" appearance="danger">
                  {dataSharModal.required}
                </Text>
              </Stack>
              <Textfield
                name="email"
                id="email"
                placeholder={dataSharModal.placeHolderEmail}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullwidth={true}
              />
            </Stack>
            <Stack direction="column">
              <Stack gap="4px">
                <Text type="label" weight="bold" size="medium">
                  {dataSharModal.aditionalEmail}
                </Text>
              </Stack>
              <Stack direction="column" gap="4px">
                <Textfield
                  name="aditionalEmail"
                  id="aditionalEmail"
                  placeholder={dataSharModal.placeHolderAditionalEmail}
                  value={formik.values.aditionalEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullwidth={true}
                />
                <Stack gap="4px">
                  <Icon
                    icon={<MdInfoOutline />}
                    appearance="primary"
                    size="14px"
                  ></Icon>
                  <Text type="label" size="small">
                    {dataSharModal.optional}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </BaseModal>
      )}
    </Formik>
  );
}
