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
import { Datefield } from "@inubekit/datefield";
import { useState } from "react";

import { isValidDate } from "@utils/formatData/date";

import { StyledModal } from "./styles";

interface FormValues {
  observation: string;
  date: string;
}
interface DateState {
  value: string;
  status: "valid" | "invalid" | "pending";
}
export interface SeeDetailsModalProps {
  maxLength?: number;
  portalId?: string;
  onSubmit?: (values: { observation: string; date: string }) => void;
  onCloseModal?: () => void;
}

export function SeeDetailsModal(props: SeeDetailsModalProps) {
  const {
    maxLength = 200,
    portalId = "portal",
    onSubmit,
    onCloseModal,
  } = props;

  const validationSchema = Yup.object().shape({
    observation: Yup.string()
      .max(maxLength, "El número de caracteres es demasiado largo")
      .required("Este campo es obligatorio"),
    date: Yup.string()
      .test("is-valid-date", "La fecha no es válida.", (value) =>
        isValidDate(String(value))
      )
      .required("Este campo es obligatorio"),
  });

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const [date, setDate] = useState<DateState>({ value: "", status: "pending" });

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: string,
      shouldValidate?: boolean
    ) => void
  ) => {
    const newValue = e.target.value;
    const status = isValidDate(newValue) ? "valid" : "invalid";
    setDate({ value: newValue, status });
    setFieldValue("date", newValue);
  };

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            Más detalles
          </Text>
          <Stack gap={inube.spacing.s100}>
            <Text>Cerrar</Text>
            <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
          </Stack>
        </Stack>
        <Formik
          initialValues={{ observation: "", date: "" }}
          validationSchema={validationSchema}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            onSubmit?.(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => (
            <Form>
              <Stack direction="column" gap={inube.spacing.s300}>
                <Field name="date">
                  {({ field, form: { setFieldTouched } }: FieldProps) => (
                    <Datefield
                      {...field}
                      id="date"
                      name="date"
                      label="Fecha"
                      message={touched.date && errors.date ? errors.date : ""}
                      onChange={(e) => handleDateChange(e, setFieldValue)}
                      size="wide"
                      status={
                        touched.date && errors.date ? "invalid" : "pending"
                      }
                      value={date.value}
                      onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldTouched("date");
                        field.onBlur(e);
                      }}
                    />
                  )}
                </Field>
                <Field name="observation">
                  {({ field, form: { setFieldTouched } }: FieldProps) => (
                    <Textarea
                      {...field}
                      label="Observación"
                      placeholder="Indique la razón por la que no cumple."
                      maxLength={maxLength}
                      status={
                        touched.observation && errors.observation
                          ? "invalid"
                          : "pending"
                      }
                      message={
                        touched.observation && errors.observation
                          ? errors.observation
                          : ""
                      }
                      fullwidth
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        setFieldTouched("observation");
                        field.onBlur(e);
                      }}
                    />
                  )}
                </Field>
              </Stack>
              <Stack justifyContent="flex-end" margin="s200 s0">
                <Button type="submit" disabled={isSubmitting}>
                  Cerrar
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
