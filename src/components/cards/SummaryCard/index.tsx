import { SummaryCardUI } from "./interface";

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
    />
  );
}

export { SummaryCard };
export type { SummaryCardProps };
