import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Toggle } from "@inubekit/toggle";
import { Stack } from "@inubekit/stack";
import { useMediaQuery } from "@inubekit/hooks";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Textarea } from "@inubekit/textarea";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";

import { validationMessages } from "@validations/validationMessages";

import { aprovalsConfig } from "./config";
import { StyledModal, StyledContainerClose } from "./styles";

interface FormValues {
  textarea: string;
  isApproved: boolean;
}

interface AprovalsModalProps {
  portalId?: string;
  isApproved?: boolean;
  onChangeApprove?: (isApproved: boolean) => void;
  onSubmit?: (values: FormValues) => void;
  onCloseModal?: () => void;
}

export function AprovalsModal(props: AprovalsModalProps) {
  const {
    portalId = "portal",
    onSubmit,
    onCloseModal,
    onChangeApprove,
  } = props;

  const validationSchema = Yup.object().shape({
    textarea: Yup.string()
      .max(aprovalsConfig.maxLength, aprovalsConfig.limitedTxt)
      .required(aprovalsConfig.requiredField),
  });

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  return createPortal(
    <Blanket>
      <StyledModal $isMobile={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {aprovalsConfig.title}
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap="8px">
              <Text>{aprovalsConfig.close}</Text>
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
        <Formik
          initialValues={{ textarea: "", isApproved: false }}
          validationSchema={validationSchema}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            if (values.isApproved) {
              onSubmit?.(values);
              onCloseModal?.();
            }
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting, values, setFieldValue }) => (
            <Form>
              <Stack direction="column" gap="24px">
                <Stack gap="8px">
                  <Toggle
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setFieldValue("isApproved", checked);
                      onChangeApprove?.(checked);
                    }}
                    checked={values.isApproved}
                  />
                  <Text
                    type="label"
                    size="large"
                    weight="bold"
                    appearance={values.isApproved ? "success" : "danger"}
                  >
                    {values.isApproved
                      ? aprovalsConfig.meets
                      : aprovalsConfig.doesNotComply}
                  </Text>
                </Stack>
                <Field name="textarea">
                  {({ field, form: { setFieldTouched } }: FieldProps) => (
                    <Textarea
                      {...field}
                      id="textarea"
                      label={aprovalsConfig.observations}
                      placeholder={aprovalsConfig.observationdetails}
                      maxLength={aprovalsConfig.maxLength}
                      status={
                        touched.textarea && errors.textarea
                          ? "invalid"
                          : "pending"
                      }
                      message={
                        touched.textarea && errors.textarea
                          ? errors.textarea
                          : ""
                      }
                      fullwidth
                      onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldTouched("textarea");
                        field.onBlur(e);
                      }}
                    />
                  )}
                </Field>
              </Stack>
              <Stack justifyContent="flex-end" margin="16px 0" gap="12px">
                <Button
                  type="button"
                  variant="outlined"
                  appearance="gray"
                  onClick={onCloseModal}
                >
                  {aprovalsConfig.Cancel}
                </Button>
                <Button
                  type="submit"
                  appearance="primary"
                  disabled={!values.isApproved || isSubmitting}
                >
                  {aprovalsConfig.confirm}
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </StyledModal>
    </Blanket>,
    node
  );
}
