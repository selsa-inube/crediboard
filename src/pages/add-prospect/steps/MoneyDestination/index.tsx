import { useState } from "react";
import { useMediaQuery } from "@inubekit/hooks";
import { useEffect } from "react";

import { get } from "@mocks/utils/dataMock.service";
import { IMoneyDestination } from "@services/types";

import { MoneyDestinationUI } from "./interface";

function MoneyDestination() {
  const [selectedDestination, setSelectedDestination] = useState<string>("");
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

  console.log(selectedDestination);

  const isTablet = useMediaQuery("(max-width: 1482px)");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDestination(e.target.value);
  };

  return (
    <MoneyDestinationUI
      destinations={moneyDestinations}
      isTablet={isTablet}
      handleChange={handleChange}
    />
  );
}
export { MoneyDestination };
