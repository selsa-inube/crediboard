import { Stack } from "@inubekit/stack";

import { IMoneyDestination } from "@services/types";
import { MoneyDestinationCard } from "@components/cards/MoneyDestinationCard";
import { Fieldset } from "@components/data/Fieldset";

interface MoneyDestinationUIProps {
  destinations: IMoneyDestination[] | undefined;
  isTablet: boolean;
  selectedDestination: string;
  handleChange: (value: string) => void;
}

function MoneyDestinationUI(props: MoneyDestinationUIProps) {
  const { destinations, isTablet, handleChange, selectedDestination } = props;

  return (
    <Fieldset>
      <Stack
        direction="row"
        gap="12px"
        wrap="wrap"
        justifyContent={isTablet ? "center" : "initial"}
        padding={isTablet ? "0px 4px" : "10px 16px"}
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
                handleChange(destination.money_destination_id)
              }
              isSelected={
                selectedDestination === destination.money_destination_id
              }
            />
          ))}
      </Stack>
    </Fieldset>
  );
}

export { MoneyDestinationUI };
