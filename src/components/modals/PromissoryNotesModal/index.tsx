import React from "react";
import { StyledModal } from "./styles"; 
import {
  Stack,
  Text,
  Button,
  inube,
  TextInput,
  useMediaQuery,
  Blanket,
} from "@inube/design-system";
import { MdClear } from "react-icons/md";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  email: string;
  phone1: string;
  phone2: string;
}

export interface PromissoryNotesModalProps {
  title: string;
  buttonText: string;
  onSubmit?: (values: FormValues) => void;
  onCloseModal?: () => void;
}

export function PromissoryNotesModal(props: PromissoryNotesModalProps) {
  const { title, buttonText, onSubmit, onCloseModal } = props;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo inválido")
      .required("El correo es obligatorio"),
    phone1: Yup.string()
      .matches(/^[0-9]+$/, "Solo se permiten números")
      .required("El primer número de teléfono es obligatorio"),
    phone2: Yup.string()
      .matches(/^[0-9]+$/, "Solo se permiten números")
      .required("El segundo número de teléfono es obligatorio"),
  });

  const isMobile = useMediaQuery("(max-width: 700px)");

  return (
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
          initialValues={{ email: "", phone1: "", phone2: "" }}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
            onSubmit?.(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field name="email">
                {({ field, form: { setFieldTouched } }: FieldProps) => (
                  <TextInput
                    {...field}
                    label="Correo"
                    placeholder="Escribe tu correo aquí..."
                    status={touched.email && errors.email ? "invalid" : "pending"}
                    message={touched.email && errors.email ? errors.email : ""}
                    fullwidth
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      setFieldTouched("email");
                      field.onBlur(e);
                    }}
                  />
                )}
              </Field>
              <Field name="phone1">
                {({ field, form: { setFieldTouched } }: FieldProps) => (
                  <TextInput
                    {...field}
                    label="Número de Teléfono 1"
                    placeholder="Escribe el primer número de teléfono aquí..."
                    status={touched.phone1 && errors.phone1 ? "invalid" : "pending"}
                    message={touched.phone1 && errors.phone1 ? errors.phone1 : ""}
                    fullwidth
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      setFieldTouched("phone1");
                      field.onBlur(e);
                    }}
                  />
                )}
              </Field>
              <Field name="phone2">
                {({ field, form: { setFieldTouched } }: FieldProps) => (
                  <TextInput
                    {...field}
                    label="Número de Teléfono 2"
                    placeholder="Escribe el segundo número de teléfono aquí..."
                    status={touched.phone2 && errors.phone2 ? "invalid" : "pending"}
                    message={touched.phone2 && errors.phone2 ? errors.phone2 : ""}
                    fullwidth
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      setFieldTouched("phone2");
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
    </Blanket>
  );
}
