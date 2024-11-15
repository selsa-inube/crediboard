import { useState, useEffect } from "react";
import { useMediaQuery } from "@inubekit/hooks";

import { get } from "@mocks/utils/dataMock.service";
import { IMoneyDestination } from "@services/types";

import { MoneyDestinationUI } from "./interface";

interface IMoneyDestinationProps {
  selectedDestination: string;
  setSelectedDestination: React.Dispatch<React.SetStateAction<string>>;
}

function MoneyDestination(props: IMoneyDestinationProps) {
  const { selectedDestination, setSelectedDestination } = props;

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

  const isTablet = useMediaQuery("(max-width: 1482px)");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDestination(e.target.value);
  };

  return (
    <MoneyDestinationUI
      destinations={moneyDestinations}
      isTablet={isTablet}
      handleChange={handleChange}
      selectedDestination={selectedDestination}
    />
  );
}
export { MoneyDestination };
