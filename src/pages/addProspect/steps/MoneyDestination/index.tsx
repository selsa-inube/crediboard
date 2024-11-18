import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useMediaQuery } from "@inubekit/hooks";

import { get } from "@mocks/utils/dataMock.service";
import { IMoneyDestination } from "@services/types";

import { MoneyDestinationUI } from "./interface";

const validate = (values: { selectedDestination: string }) => {
  const errors: { selectedDestination?: string } = {};
  if (!values.selectedDestination) {
    errors.selectedDestination = "Este campo es obligatorio";
  }
  return errors;
};

interface IMoneyDestinationProps {
  initialValues: string;
  handleOnChange: (newDestination: string) => void;
  onFormValid: React.Dispatch<React.SetStateAction<boolean>>;
}

function MoneyDestination(props: IMoneyDestinationProps) {
  const { initialValues, handleOnChange, onFormValid } = props;
  const [moneyDestinations, setMoneyDestinations] =
    useState<IMoneyDestination[]>();

  useEffect(() => {
    get("money_destinations")
      .then((data) => {
        if (data && Array.isArray(data)) {
          setMoneyDestinations(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching money destinations data:", error.message);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      selectedDestination: initialValues || "",
    },
    validate,
    onSubmit: (values) => {
      console.log("Formulario enviado", values);
    },
  });

  useEffect(() => {
    if (formik.values.selectedDestination) {
      handleOnChange(formik.values.selectedDestination);
      onFormValid(true);
    } else {
      onFormValid(false);
    }
  }, [formik.values.selectedDestination, handleOnChange, onFormValid]);

  const isTablet = useMediaQuery("(max-width: 1482px)");

  const handleChange = (value: string) => {
    formik.setFieldValue("selectedDestination", value);
  };

  return (
    <MoneyDestinationUI
      destinations={moneyDestinations}
      isTablet={isTablet}
      handleChange={handleChange}
      selectedDestination={formik.values.selectedDestination}
    />
  );
}

export { MoneyDestination };
