import {
  Stack,
  useMediaQuery,
  Blanket,
  Text,
  Button,
  inube,
  Textarea,
} from "@inube/design-system";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";

import { StyledModal, StyledLabel } from "./styles";

interface FormValues {
  textarea: string;
}

export interface TextAreaModalProps {
  title: string;
  buttonText: string;
  inputLabel: string;
  inputPlaceholder: string;
  maxLength?: number;
  portalId?: string;
  onSubmit?: (values: { textarea: string }) => void;
  onCloseModal?: () => void;
}

export function TextAreaModal(props: TextAreaModalProps) {
  const {
    title,
    buttonText,
    inputLabel,
    inputPlaceholder,
    maxLength = 200,
    portalId = "portal",
    onSubmit,
    onCloseModal,
  } = props;

  const validationSchema = Yup.object().shape({
    textarea: Yup.string()
      .max(maxLength, "El número de caracteres es demasiado largo")
      .required("Este campo es obligatorio"),
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
          <Stack gap={inube.spacing.s100}>
            <Text>Cerrar</Text>
            <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
          </Stack>
        </Stack>
        <Formik
          initialValues={{ textarea: "" }}
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
              <Field name="textarea">
                {({ field, form: { setFieldTouched } }: FieldProps) => (
                  <Textarea
                    {...field}
                    label={<StyledLabel>{inputLabel}</StyledLabel>} // Aquí usamos StyledLabel
                    placeholder={inputPlaceholder}
                    maxLength={maxLength}
                    status={
                      touched.textarea && errors.textarea
                        ? "invalid"
                        : "pending"
                    }
                    message={
                      touched.textarea && errors.textarea ? errors.textarea : ""
                    }
                    fullwidth
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      setFieldTouched("textarea");
                      field.onBlur(e);
                    }}
                  />
                )}
              </Field>
              <Stack justifyContent="flex-end" margin="s200 s0">
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
