import { Stack } from "@inubekit/stack";

import { MoneyDestinationCardProps } from "@components/cards/MoneyDestinationCard";
import { MoneyDestinationCard } from "@components/cards/MoneyDestinationCard";

interface MoneyDestinationUIProps {
  destinations: Omit<MoneyDestinationCardProps, "handleChange">[] | undefined;
  isTablet: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function MoneyDestinationUI(props: MoneyDestinationUIProps) {
  const { destinations, isTablet, handleChange } = props;

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
            key={destination.id}
            id={destination.id}
            name={destination.name}
            value={destination.value}
            label={destination.label}
            icon={destination.icon}
            handleChange={handleChange}
          />
        ))}
    </Stack>
  );
}

export { MoneyDestinationUI };
