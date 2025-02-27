import { createPortal } from "react-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { MdClear, MdInfoOutline } from "react-icons/md";
import { Button } from "@inubekit/button";
import { Divider } from "@inubekit/divider";

import { validationMessages } from "@validations/validationMessages";

import { dataSharModal } from "./config";
import { StyledContainer, StyledContainerClose } from "./styles";
import { Textfield } from "@inubekit/textfield";

export interface IShareCreditModalProps {
  handleClose: () => void;
  isMobile: boolean;
  portalId?: string;
}

export function ShareCreditModal(props: IShareCreditModalProps) {
  const { handleClose, isMobile, portalId = "portal" } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

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

  return createPortal(
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {(formik) => (
        <Blanket>
          <StyledContainer>
            <Stack
              direction="column"
              padding="24px"
              gap="24px"
              width={isMobile ? "287px" : "402px"}
            >
              <Stack justifyContent="space-between" alignItems="center">
                <Text size="small" type="headline">
                  {dataSharModal.title}
                </Text>
                <StyledContainerClose onClick={handleClose}>
                  <Stack alignItems="center" gap="8px">
                    <Text type="body" size="large">
                      {dataSharModal.close}
                    </Text>
                    <Icon
                      icon={<MdClear />}
                      size="24px"
                      cursorHover
                      appearance="dark"
                    />
                  </Stack>
                </StyledContainerClose>
              </Stack>
              <Divider />
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
              <Stack justifyContent="end" gap="20px">
                <Button
                  onClick={handleClose}
                  appearance="gray"
                  variant="outlined"
                >
                  {dataSharModal.cancel}
                </Button>
                <Button
                  onClick={formik.submitForm}
                  disabled={!formik.dirty || !formik.isValid}
                >
                  {dataSharModal.share}
                </Button>
              </Stack>
            </Stack>
          </StyledContainer>
        </Blanket>
      )}
    </Formik>,
    node
  );
}
