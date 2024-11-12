import { useEffect } from "react";

import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Toggle } from "@inubekit/toggle";
import { Divider } from "@inubekit/divider";
import { ProductSelectCard } from "@components/cards/ProcuctSelectCard";
import { Fieldset } from "@components/data/Fieldset";
import { lineOfCredit } from "@mocks/line-of-credit/lineOfCredit.mock";

import { electionData } from "./config";

interface IProductSelectionProps {
  selectedProducts: string[];
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>;
  generalToggleChecked: boolean;
  onGeneralToggleChange: () => void;
  togglesState: boolean[];
  onToggleChange: (index: number) => void;
}

export function ProductSelection(props: IProductSelectionProps) {
  const {
    selectedProducts,
    setSelectedProducts,
    togglesState,
    onToggleChange,
    generalToggleChecked,
    onGeneralToggleChange,
  } = props;

  const handleCardSelect = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    if (generalToggleChecked) {
      setSelectedProducts([]);
    }
  }, [generalToggleChecked, setSelectedProducts]);

  const questions = Object.entries(electionData.data);
  const limitedLineOfCredit = lineOfCredit.slice(0, 3);

  return (
    <Stack direction="column" gap="20px">
      <Stack direction="column" gap="16px">
        <Text type="label" size="large" weight="bold">
          {electionData.title}
        </Text>
        <Stack gap="8px">
          <Toggle
            checked={generalToggleChecked}
            onChange={onGeneralToggleChange}
          />
          <Text
            type="label"
            size="large"
            weight="bold"
            appearance={generalToggleChecked ? "success" : "danger"}
          >
            {generalToggleChecked ? electionData.yes : electionData.no}
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
            disabled={generalToggleChecked}
            isSelected={selectedProducts.includes(credit.line_of_credit_id)}
            onSelect={() => handleCardSelect(credit.line_of_credit_id)}
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
                checked={togglesState[index]}
                onChange={() => onToggleChange(index)}
              />
              <Text
                type="label"
                size="large"
                weight="bold"
                appearance={togglesState[index] ? "success" : "danger"}
              >
                {togglesState[index] ? electionData.yes : electionData.no}
              </Text>
            </Stack>
            {index < questions.length - 1 && <Divider dashed />}
          </Stack>
        ))}
      </Fieldset>
    </Stack>
  );
}
