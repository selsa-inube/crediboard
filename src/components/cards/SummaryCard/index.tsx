import { useState } from "react";

import {
  truncateTextToMaxLength,
  capitalizeFirstLetter,
  capitalizeFirstLetterEachWord,
} from "@utils/formatData/text";

import { SummaryCardUI } from "./interface";

interface SummaryCardProps {
  rad: number;
  date: string;
  name: string;
  destination: string;
  value: number;
  toDo: string;
  isPinned?: boolean;
  hasMessage?: boolean;
  onPinChange?: (isPinned: boolean) => void;
}

function SummaryCard(props: SummaryCardProps) {
  const {
    rad,
    date,
    name,
    destination,
    value,
    toDo,
    isPinned = false,
    hasMessage = false,
    onPinChange,
  } = props;

  const [pinned, setPinned] = useState(isPinned);

  const handlePinClick = () => {
    setPinned(!pinned);
    onPinChange && onPinChange(!pinned);
  };

  return (
    <SummaryCardUI
      rad={rad}
      date={date}
      name={truncateTextToMaxLength(capitalizeFirstLetterEachWord(name))}
      destination={capitalizeFirstLetter(
        truncateTextToMaxLength(destination, 60)
      )}
      value={value}
      toDo={capitalizeFirstLetter(truncateTextToMaxLength(toDo, 60))}
      isPinned={pinned}
      hasMessage={hasMessage}
      onPinChange={handlePinClick}
    />
  );
}

export { SummaryCard };
export type { SummaryCardProps };
