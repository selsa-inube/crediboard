import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
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
import { useFlag } from "@inubekit/flag";

import { makeDecisions } from "@services/todo/makeDecisions";
import { validationMessages } from "@validations/validationMessages";

import { IMakeDecisionsCreditRequestWithXAction } from "./types";

import {
  StyledModal,
  StyledContainerClose,
  StyledContainerTextField,
} from "./styles";
import { txtFlags, txtOthersOptions } from "./../config";

interface FormValues {
  textarea: string;
}

export interface DecisionModalProps {
  data: IMakeDecisionsCreditRequestWithXAction;
  title: string;
  buttonText: string;
  inputLabel: string;
  inputPlaceholder: string;
  maxLength?: number;
  portalId?: string;
  readOnly?: boolean;
  hideCharCount?: boolean;
  disableTextarea?: boolean;
  secondaryButtonText?: string;
  onSubmit?: (values: { textarea: string }) => void;
  onCloseModal?: () => void;
  onSecondaryButtonClick?: () => void;
}

export function DecisionModal(props: DecisionModalProps) {
  const {
    data,
    title,
    buttonText,
    inputLabel,
    inputPlaceholder,
    maxLength = 200,
    portalId = "portal",
    readOnly = false,
    disableTextarea = false,
    secondaryButtonText = "Cancelar",
    onSubmit,
    onCloseModal,
    onSecondaryButtonClick,
  } = props;

  const navigate = useNavigate();
  const { addFlag } = useFlag();
  const isMobile = useMediaQuery("(max-width: 700px)");

  const validationSchema = Yup.object().shape({
    textarea: readOnly
      ? Yup.string()
      : Yup.string()
          .max(maxLength, validationMessages.maxCharacters(maxLength))
          .required(validationMessages.required),
  });

  const node = document.getElementById(portalId);

  const sendData = async (value: string) => {
    try {
      const response = await makeDecisions(
        {
          creditRequestId: data.makeDecision.creditRequestId,
          humanDecision: data.makeDecision.humanDecision,
          justification: value,
        },
        data.xAction
      );
      if (response.statusServices === 200) {
        navigate("/");
        addFlag({
          title: txtFlags.titleSuccess,
          description: `${txtFlags.descriptionSuccess} ${response.status}`,
          appearance: "success",
          duration: txtFlags.duration,
        });
      } else {
        addFlag({
          title: txtFlags.titleWarning,
          description: `${txtFlags.descriptionWarning} ${response.statusServices}`,
          appearance: "warning",
          duration: txtFlags.duration,
        });
      }
    } catch (error) {
      addFlag({
        title: txtFlags.titleDanger,
        description: txtFlags.descriptionDanger,
        appearance: "danger",
        duration: txtFlags.duration,
      });
    } finally {
      onCloseModal?.();
    }
  };

  if (!node) {
    throw new Error(validationMessages.errorNodo);
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
              <Text>{txtOthersOptions.optionClose}</Text>
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
            sendData(values.textarea);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <StyledContainerTextField $smallScreen={isMobile}>
                <Stack direction="column">
                  <Text
                    type="label"
                    size="large"
                    appearance="dark"
                    weight="bold"
                  >
                    {txtOthersOptions.txtDecision}
                  </Text>
                  <Text
                    type="body"
                    size="medium"
                    appearance="gray"
                    weight="normal"
                    textAlign="justify"
                  >
                    {data.humanDecisionDescription
                      ? data.humanDecisionDescription
                      : txtOthersOptions.txtNoSelect}
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
                  disabled={data.makeDecision.humanDecision ? false : true}
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
