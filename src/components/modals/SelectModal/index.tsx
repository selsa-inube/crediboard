import {
  Stack,
  useMediaQuery,
  Blanket,
  Text,
  Button,
  inube,
  Select,
} from "@inube/design-system";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";

import { StyledModal } from "./styles";

interface FormValues {
  select: string;
}

export interface SelectModalProps {
  title: string;
  buttonText: string;
  inputLabel: string;
  inputPlaceholder: string;
  options: { id: string; label: string; disabled: boolean }[];
  portalId?: string;
  onSubmit?: (value: string) => void;
  onCloseModal?: () => void;
}

export function SelectModal(props: SelectModalProps) {
  const {
    title,
    buttonText,
    inputLabel,
    inputPlaceholder,
    options,
    portalId = "portal",
    onSubmit,
    onCloseModal,
  } = props;
  const validationSchema = Yup.object().shape({
    select: Yup.string().required("Este campo es obligatorio"),
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
          initialValues={{ select: "" }}
          validationSchema={validationSchema}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            onSubmit?.(values.select);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => (
            <Form>
              <Field name="select">
                {({ field, form: { setFieldTouched } }: FieldProps) => (
                  <Select
                    {...field}
                    label={inputLabel}
                    placeholder={inputPlaceholder}
                    options={options}
                    value={field.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("select", e.target.outerText);
                    }}
                    status={
                      touched.select && errors.select ? "invalid" : "pending"
                    }
                    message={
                      touched.select && errors.select ? errors.select : ""
                    }
                    fullwidth
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                      setFieldTouched("select");
                      field.onBlur(e);
                    }}
                  />
                )}
              </Field>
              <Stack justifyContent="flex-end" margin="s350 s0 s100 s200">
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
