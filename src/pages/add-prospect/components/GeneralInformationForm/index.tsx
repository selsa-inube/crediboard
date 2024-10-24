import { forwardRef, useImperativeHandle, useState } from "react";
import { FormikProps, useFormik } from "formik";

import * as Yup from "yup";
import { validationMessages } from "@validations/validationMessages";
import { IMessageState } from "@pages/add-prospect/types/forms.types";
import { generalMessage } from "@pages/add-prospect/config/messages.config";
import { IHandleUpdateDataSwitchstep } from "@pages/add-prospect/types";

import { GeneralInformationFormUI } from "./interface";

export interface IGeneralInformationEntry {
  abbreviated_name: string;
  n_Uso: string;
}

const validationSchema = Yup.object({
  abbreviated_name: Yup.string().required(validationMessages.required),
  n_Uso: Yup.string().required(validationMessages.required),
});

interface IGeneralInformationFormProps {
  initialValues: IGeneralInformationEntry;
  id?: string;
  loading?: boolean;
  withSubmitButtons?: boolean;
  handleSubmit?: (values: IHandleUpdateDataSwitchstep) => void;
  onFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  onHasChanges?: (hasChanges: boolean) => void;
}

export const GeneralInformationForm = forwardRef(
  function GeneralInformationForm(
    props: IGeneralInformationFormProps,
    ref: React.Ref<FormikProps<IGeneralInformationEntry>>
  ) {
    const { initialValues, withSubmitButtons, handleSubmit, onHasChanges } =
      props;

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<IMessageState>({
      visible: false,
    });

    const formik = useFormik({
      initialValues,
      validationSchema,
      validateOnBlur: false,
      onSubmit: () => {
        setLoading(true);
        setTimeout(() => {
          handleSubmit && handleSubmit(formik.values);
          setLoading(false);
          setMessage({
            visible: true,
            data: generalMessage.success,
          });
        });
      },
    });

    useImperativeHandle(ref, () => formik);

    const handleCloseSectionMessage = () => {
      setMessage({
        visible: false,
      });
    };

    const handleSubmitForm = () => {
      formik.validateForm().then((errors) => {
        if (Object.keys(errors).length > 0) {
          setMessage({
            visible: true,
            data: generalMessage.failed,
          });
        }

        formik.handleSubmit();
      });
    };

    const disabledButtons = (valueCompare: IGeneralInformationEntry) =>
      JSON.stringify(formik.initialValues) !== JSON.stringify(valueCompare);

    const handleChangeForm = (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      if (onHasChanges) onHasChanges(disabledButtons(formik.values));
      formik
        .setFieldValue(event.target.name, event.target.value)
        .then((errors) => {
          if (withSubmitButtons) return;

          if (!errors || Object.keys(errors).length === 0) {
            handleSubmit &&
              handleSubmit({
                ...formik.values,
                [event.target.name]: event.target.value,
              });
          }
        });
    };

    return (
      <GeneralInformationFormUI
        formik={formik}
        message={message}
        disabledButtons={disabledButtons}
        handleCloseSectionMessage={handleCloseSectionMessage}
        handleChangeForm={handleChangeForm}
        handleSubmitForm={handleSubmitForm}
        handleReset={handleCloseSectionMessage}
        loading={loading}
        withSubmitButtons={withSubmitButtons}
      />
    );
  }
);
