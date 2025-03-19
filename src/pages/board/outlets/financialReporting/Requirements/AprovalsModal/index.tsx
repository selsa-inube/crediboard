import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Toggle } from "@inubekit/toggle";
import { Stack } from "@inubekit/inubekit";
import { useMediaQuery } from "@inubekit/hooks";
import { Textarea } from "@inubekit/textarea";
import { Text } from "@inubekit/text";

import { validationMessages } from "@validations/validationMessages";
import { BaseModal } from "@components/modals/baseModal";

import { aprovalsConfig } from "./config";

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
      .max(aprovalsConfig.maxLength, validationMessages.limitedTxt)
      .required(validationMessages.required),
  });

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  return (
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
          <BaseModal
            title={aprovalsConfig.title}
            handleNext={() => onCloseModal?.()}
            width={isMobile ? "280px" : "500px"}
            handleBack={onCloseModal}
            portalId={portalId}
            backButton={aprovalsConfig.Cancel}
            nextButton={aprovalsConfig.confirm}
            disabledNext={
              !values.isApproved || isSubmitting || !values.textarea.trim()
            }
          >
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
                      touched.textarea && errors.textarea ? errors.textarea : ""
                    }
                    fullwidth
                    disabled={!values.isApproved}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldTouched("textarea");
                      field.onBlur(e);
                    }}
                  />
                )}
              </Field>
            </Stack>
          </BaseModal>
        </Form>
      )}
    </Formik>
  );
}
