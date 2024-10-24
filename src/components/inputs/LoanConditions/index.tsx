import { useState } from "react";
import { useMediaQuery } from "@inubekit/hooks";
import { LoanConditionUI } from "./interface";
import { dataConditions, answer } from "./config";

export function LoanCondition() {
  const screenMovil = useMediaQuery("(max-width:880px)");
  const [limitSelected, setLimitSelected] = useState("");
  const [deadlineSelected, setDeadlineSelected] = useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimitSelected(event.target.value);
  };

  const handleRadioChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeadlineSelected(event.target.value === "yes");
  };

  return (
    <LoanConditionUI
      screenMovil={screenMovil}
      limitSelected={limitSelected}
      deadlineSelected={deadlineSelected}
      handleRadioChange={handleRadioChange}
      handleRadioChange1={handleRadioChange1}
      dataConditions={dataConditions}
      answer={answer}
    />
  );
}
