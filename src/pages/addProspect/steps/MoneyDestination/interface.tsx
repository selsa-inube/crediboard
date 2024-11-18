import { Stack } from "@inubekit/stack";

import { IMoneyDestination } from "@services/types";
import { MoneyDestinationCard } from "@components/cards/MoneyDestinationCard";

interface MoneyDestinationUIProps {
  destinations: IMoneyDestination[] | undefined;
  isTablet: boolean;
  selectedDestination: string;
  handleChange: (value: string) => void; 
}

function MoneyDestinationUI(props: MoneyDestinationUIProps) {
  const { destinations, isTablet, handleChange, selectedDestination } = props;

  return (
    <Stack
      direction="row"
      gap="12px"
      wrap="wrap"
      justifyContent={isTablet ? "center" : "initial"}
    >
      {destinations &&
        destinations.map((destination) => (
          <MoneyDestinationCard
            key={destination.money_destination_id}
            id={destination.money_destination_id}
            name={destination.money_destination_unique_reference}
            value={destination.description_use}
            label={destination.abbreviated_name}
            icon={destination.icon}
            handleChange={() =>
              handleChange(destination.description_use)
            }
            isSelected={selectedDestination === destination.description_use}
          />
        ))}
    </Stack>
  );
}

export { MoneyDestinationUI };
