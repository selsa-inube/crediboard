import { Stack, useMediaQuery, Blanket, Text, Button, inube } from "@inube/design-system";
import { createPortal } from "react-dom";
import { MdClear, MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Textfield } from "@inubekit/textfield";
import { StyledModal } from "./styles";

interface FormValues {
  field1: string;
  field2: string;
  field3: string;
}

const validationSchema = Yup.object().shape({
  field1: Yup.string()
    .email("Este campo es obligatorio")
    .required("Este campo es obligatorio"),
  field2: Yup.number()
    .required("Este campo es obligatorio")
    .typeError("Número inválido"),
  field3: Yup.number()
    .required("Este campo es obligatorio")
    .typeError("Número inválido"),
});

export interface PromissoryNotesModalProps {
  title: string;
  buttonText: string;
  portalId?: string;
  onSubmit?: (values: FormValues) => void;
  onCloseModal?: () => void;
}

export function PromissoryNotesModal(props: PromissoryNotesModalProps) {
  const {
    title,
    buttonText,
    portalId = "portal",
    onSubmit,
    onCloseModal,
  } = props;

  const node = document.getElementById(portalId);
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }
  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
          </Text>
          <Stack gap={inube.spacing.s100}>
            <Text>Cerrar</Text>
            <Icon
              appearance="dark"
              icon={<MdClear/>}
              size="24px"
              cursorHover
              onClick={onCloseModal}
            />
          </Stack>
        </Stack>
        <Formik
          initialValues={{ field1: "", field2: "", field3: "" }}
          validationSchema={validationSchema}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            onSubmit?.(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting, handleChange, handleBlur }) => (
            <Form>
              <Stack gap={inube.spacing.s300} direction="column">
                <Field name="field1">
                  {({ field }: FieldProps) => (
                    <Textfield
                      id="field1"
                      value={field.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Correo"
                      iconBefore={<MdOutlineEmail color={inube.color.stroke.dark.regular} />}
                      placeholder="usuario@inube.com"
                      message={
                        touched.field1 && errors.field1 ? errors.field1 : ""
                      }
                      status={
                        touched.field1 && errors.field1 ? "invalid" : "pending"
                      }
                      fullwidth
                    />
                  )}
                </Field>

                <Field name="field2">
                  {({ field }: FieldProps) => (
                    <Textfield
                      id="field2"
                      value={field.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Teléfono"
                      iconBefore={<MdOutlinePhone color={inube.color.stroke.dark.regular}/>}
                      placeholder="3122638128"
                      message={
                        touched.field2 && errors.field2 ? errors.field2 : ""
                      }
                      status={
                        touched.field2 && errors.field2 ? "invalid" : "pending"
                      }
                      fullwidth
                    />
                  )}
                </Field>

                <Field name="field3">
                  {({ field }: FieldProps) => (
                    <Textfield
                      id="field3"
                      value={field.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Whatsapp"
                      iconBefore={<MdOutlinePhone color={inube.color.stroke.dark.regular} />}
                      placeholder="3122638128"
                      message={
                        touched.field3 && errors.field3 ? errors.field3 : ""
                      }
                      status={
                        touched.field3 && errors.field3 ? "invalid" : "pending"
                      }
                      fullwidth
                    />
                  )}
                </Field>
              </Stack>
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
