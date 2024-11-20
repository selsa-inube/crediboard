import { useEffect, useState } from "react";
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

  const isTablet = useMediaQuery("(max-width: 1482px)");

  const handleChange = (value: string) => {
    handleOnChange(value);

    if (value) {
      onFormValid(true);
    } else {
      onFormValid(false);
    }
  };

  return (
    <MoneyDestinationUI
      destinations={moneyDestinations}
      isTablet={isTablet}
      handleChange={handleChange}
      selectedDestination={initialValues}
    />
  );
}

export { MoneyDestination };
