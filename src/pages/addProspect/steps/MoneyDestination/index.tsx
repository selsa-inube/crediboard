import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMediaQuery } from "@inubekit/hooks";

import { get } from "@mocks/utils/dataMock.service";
import { IMoneyDestination } from "@services/types";

import { MoneyDestinationUI } from "./interface";

interface IMoneyDestinationProps {
  initialValues: string;
  handleOnChange: React.Dispatch<React.SetStateAction<string>>;
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

  useEffect(() => {
    if (!initialValues) {
      onFormValid(false);
    } else {
      onFormValid(true);
    }
  }, [initialValues, onFormValid]);

  const MoneyDestinationSchema = Yup.object().shape({
    selectedDestination: Yup.string().required("Este campo es obligatorio"),
  });

  const isTablet = useMediaQuery("(max-width: 1482px)");

  return (
    <Formik
      initialValues={{ selectedDestination: initialValues }}
      validationSchema={MoneyDestinationSchema}
      onSubmit={(values) => {
        handleOnChange(values.selectedDestination);
        onFormValid(true);
      }}
    >
      {({ values, setFieldValue }) => (
        <MoneyDestinationUI
          destinations={moneyDestinations}
          isTablet={isTablet}
          selectedDestination={values.selectedDestination}
          handleChange={(value: string) => {
            setFieldValue("selectedDestination", value);
            handleOnChange(value);
            onFormValid(Boolean(value));
          }}
        />
      )}
    </Formik>
  );
}

export { MoneyDestination };
