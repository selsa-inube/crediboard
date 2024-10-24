import { useState } from "react";

import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Toggle } from "@inubekit/toggle";
import { Divider } from "@inubekit/divider";
import { ProductSelectCard } from "@components/cards/ProcuctSelectCard";
import { Fieldset } from "@components/data/Fieldset";
import { lineOfCredit } from "@mocks/line-of-credit/lineOfCredit.mock";

import { electionData } from "./config";

export function ProductSelection() {
  const [toggleChecked, setToggleChecked] = useState(true);
  const [toggles, setToggles] = useState([false, true, false]);

  const onChange = () => {
    setToggleChecked(!toggleChecked);
  };

  const onChanges = (index: number) => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
  };

  const questions = Object.entries(electionData.data);
  const limitedLineOfCredit = lineOfCredit.slice(0, 3);

  return (
    <Stack direction="column" gap="20px">
      <Stack direction="column" gap="16px">
        <Text type="label" size="large" weight="bold">
          {electionData.title}
        </Text>
        <Stack gap="8px">
          <Toggle checked={toggleChecked} onChange={onChange} />
          <Text
            type="label"
            size="large"
            weight="bold"
            appearance={toggleChecked ? "success" : "danger"}
          >
            {toggleChecked ? electionData.yes : electionData.no}
          </Text>
        </Stack>
      </Stack>
      <Stack gap="16px">
        {limitedLineOfCredit.map((credit) => (
          <ProductSelectCard
            key={credit.line_of_credit_id}
            amount={credit.loan_amount_limit}
            rate={credit.interest_rate}
            term={credit.loan_term_limit}
            description={credit.description_use}
            disabled={toggleChecked}
          />
        ))}
      </Stack>
      <Fieldset>
        {questions.map(([key, question], index) => (
          <Stack direction="column" key={key} gap="16px" padding="4px 10px">
            <Text type="body" size="medium">
              {question}
            </Text>
            <Stack gap="8px">
              <Toggle
                checked={toggles[index]}
                onChange={() => onChanges(index)}
              />
              <Text
                type="label"
                size="large"
                weight="bold"
                appearance={toggles[index] ? "success" : "danger"}
              >
                {toggles[index] ? electionData.yes : electionData.no}
              </Text>
            </Stack>
            {index < questions.length - 1 && <Divider dashed />}
          </Stack>
        ))}
      </Fieldset>
    </Stack>
  );
}
