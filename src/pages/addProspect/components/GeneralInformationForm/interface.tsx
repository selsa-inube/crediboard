import { FormikValues } from "formik";
import { Grid } from "@inubekit/grid";
import { Textfield } from "@inubekit/textfield";

import { RenderMessage } from "@components/feedback/RenderMessage";
import { FormButtons } from "@components/forms/submit/FormButtons";
import { IMessageState } from "@pages/addProspect/types/forms.types";

import { IGeneralInformationEntry } from ".";

function stateValue(formik: FormikValues, attribute: string) {
  if (!formik.touched[attribute]) return undefined;
  if (formik.touched[attribute] && formik.errors[attribute]) return "invalid";
}

interface GeneralInformationFormUIProps {
  formik: FormikValues;
  message: IMessageState;
  disabledButtons: (valueCompare: IGeneralInformationEntry) => boolean;
  handleCloseSectionMessage: () => void;
  handleChangeForm: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmitForm: () => void;
  handleReset: () => void;
  loading?: boolean;
  withSubmitButtons?: boolean;
}

export function GeneralInformationFormUI(props: GeneralInformationFormUIProps) {
  const {
    formik,
    loading,
    withSubmitButtons,
    message,
    disabledButtons,
    handleCloseSectionMessage,
    handleReset,
    handleChangeForm,
    handleSubmitForm,
  } = props;

  return (
    <>
      <form>
        <Grid templateColumns="1fr" gap="16px" width="100%" autoRows="unset">
          <Textfield
            label="Nombre Cargo"
            placeholder="Nombre del cargo"
            name="abbreviated_name"
            id="abbreviated_name"
            value={formik.values.abbreviated_name}
            type="text"
            size="compact"
            fullwidth
            message={
              stateValue(formik, "abbreviated_name") === "invalid" &&
              formik.errors.abbreviated_name
            }
            status={stateValue(formik, "abbreviated_name")}
            onBlur={formik.handleBlur}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeForm(event)
            }
            required
          />
        </Grid>
      </form>
      {withSubmitButtons && (
        <FormButtons
          handleSubmit={handleSubmitForm}
          handleReset={formik.resetForm}
          withDisabledButtons={!disabledButtons(formik.values)}
          loading={loading}
          children=""
        />
      )}
      {message.visible && (
        <RenderMessage
          message={message}
          handleCloseMessage={handleCloseSectionMessage}
          onMessageClosed={handleReset}
        />
      )}
    </>
  );
}
