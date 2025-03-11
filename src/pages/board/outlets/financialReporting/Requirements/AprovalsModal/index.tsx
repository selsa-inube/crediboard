import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Toggle } from "@inubekit/toggle";
import { Stack } from "@inubekit/inubekit";
import { useMediaQuery } from "@inubekit/hooks";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Textarea } from "@inubekit/textarea";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/inubekit";

import { StyledModal, StyledContainerClose } from "./styles";
interface FormValues {
  textarea: string;
  isApproved: boolean;
}

interface AprovalsModalProps {
  title: string;
  buttonText: string;
  inputLabel: string;
  inputPlaceholder: string;
  maxLength?: number;
  portalId?: string;
  isApproved?: boolean;
  onChangeApprove?: () => void;
  onSubmit?: (values: FormValues) => void;
  onCloseModal?: () => void;
}

export function AprovalsModal(props: AprovalsModalProps) {
  const {
    title,
    buttonText,
    inputLabel,
    inputPlaceholder,
    maxLength = 200,
    portalId = "portal",
    isApproved = false,
    onChangeApprove,
    onSubmit,
    onCloseModal,
  } = props;

  const validationSchema = Yup.object().shape({
    textarea: Yup.string()
      .max(maxLength, "El número de caracteres es demasiado largo")
      .required("Este campo es obligatorio"),
    approve: Yup.boolean(),
  });

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
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
        <Formik
          initialValues={{ textarea: "", isApproved: false }}
          validationSchema={validationSchema}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            onSubmit?.(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Stack direction="column" gap="24px">
                <Stack>
                  <Toggle
                    id="approve"
                    name="approve"
                    size="large"
                    checked={isApproved}
                    onChange={(e) => {
                      onChangeApprove?.();
                      e.target.checked = !isApproved;
                    }}
                  />
                </Stack>
                <Field name="textarea">
                  {({ field, form: { setFieldTouched } }: FieldProps) => (
                    <Textarea
                      {...field}
                      id="textarea"
                      label={inputLabel}
                      placeholder={inputPlaceholder}
                      maxLength={maxLength}
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
              <Stack justifyContent="flex-end" margin="16px 0">
                <Button type="submit" disabled={isSubmitting}>
                  {buttonText}
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
