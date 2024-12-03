import { createPortal } from "react-dom";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import { MdClear } from "react-icons/md";

import { Textarea } from "@inubekit/textarea";
import { Icon } from "@inubekit/icon";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Button } from "@inubekit/button";
import { useMediaQuery } from "@inubekit/hooks";
import { Blanket } from "@inubekit/blanket";
import { registerNewsPrequalify } from "@services/todo/prequalifyCreditRequest";
import { IPrequalifyCreditRequest } from "@services/types";

import {
  StyledModal,
  StyledContainerClose,
  StyledContainerTextField,
} from "./styles";

interface FormValues {
  textarea: string;
}

export interface DecisionModalProps {
  title: string;
  buttonText: string;
  inputLabel: string;
  inputPlaceholder: string;
  maxLength?: number;
  portalId?: string;
  onSubmit?: (values: { textarea: string }) => void;
  onCloseModal?: () => void;
  readOnly?: boolean;
  hideCharCount?: boolean;
  disableTextarea?: boolean;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
  data: IPrequalifyCreditRequest;
}

export function DecisionModal(props: DecisionModalProps) {
  const {
    title,
    buttonText,
    inputLabel,
    inputPlaceholder,
    maxLength = 200,
    portalId = "portal",
    onSubmit,
    onCloseModal,
    readOnly = false,
    disableTextarea = false,
    secondaryButtonText = "Cancelar",
    onSecondaryButtonClick,
    data,
  } = props;

  const validationSchema = Yup.object().shape({
    textarea: readOnly
      ? Yup.string()
      : Yup.string()
          .max(maxLength, "El número de caracteres es demasiado largo")
          .required("Este campo es obligatorio"),
  });

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  const sendData = (value: string) => {
    registerNewsPrequalify({
      creditRequestId: data.creditRequestId,
      executedTask: data.executedTask,
      executionDate: new Date().toISOString(),
      humanDecision: data.humanDecision,
      humanDecisionDescripcion: data.humanDecisionDescripcion,
      justification: value,
      xAction: data.xAction,
    });
  };

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
          initialValues={{ textarea: "" }}
          validationSchema={validationSchema}
          onSubmit={(
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            onSubmit?.(values);
            setSubmitting(false);
            onCloseModal?.();
            sendData(values.textarea);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <StyledContainerTextField $smallScreen={isMobile}>
                <Stack direction="column">
                  <Text
                    type="label"
                    size="large"
                    appearance="dark"
                    weight="bold"
                  >
                    Decisión
                  </Text>
                  <Text
                    type="body"
                    size="medium"
                    appearance="gray"
                    weight="normal"
                    textAlign="justify"
                  >
                    {data
                      ? data.humanDecisionDescripcion
                      : "No se seleccionó una decisión disponible"}
                  </Text>
                </Stack>
              </StyledContainerTextField>
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
                      touched.textarea && errors.textarea ? errors.textarea : ""
                    }
                    fullwidth
                    disabled={disableTextarea}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldTouched("textarea");
                      field.onBlur(e);
                    }}
                  />
                )}
              </Field>
              <Stack justifyContent="end" margin="12px 0px" gap="12px">
                <Button
                  type="button"
                  variant="outlined"
                  appearance="gray"
                  onClick={onSecondaryButtonClick}
                >
                  {secondaryButtonText}
                </Button>
                <Button
                  type={readOnly ? "button" : "submit"}
                  onClick={readOnly ? onCloseModal : undefined}
                  disabled={isSubmitting && !readOnly}
                >
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
