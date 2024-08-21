import { SummaryCardUI } from "./interface";
import { mockRequestsPinned } from "@mocks/requests/requestsPinned.mock";

interface SummaryCardProps {
  rad: number;
  date: string;
  name: string;
  destination: string;
  value: number;
  toDo: string;
  path: string;
  isPinned?: boolean;
  hasMessage?: boolean;
  onPinChange?: () => void;
  errorLoadingPins?: boolean;
}

function SummaryCard(props: SummaryCardProps) {
  const {
    rad,
    date,
    name,
    destination,
    value,
    toDo,
    path,
    isPinned = false,
    hasMessage = false,
    onPinChange,
  } = props;

  const errorLoadingPins = !mockRequestsPinned || mockRequestsPinned.length === 0;

  return (
    <SummaryCardUI
      rad={rad}
      date={date}
      name={name}
      destination={destination}
      value={value}
      toDo={toDo}
      path={path}
      isPinned={isPinned}
      hasMessage={hasMessage}
      onPinChange={onPinChange}
      errorLoadingPins={errorLoadingPins} 
    />
  );
}

export { SummaryCard };
export type { SummaryCardProps };
