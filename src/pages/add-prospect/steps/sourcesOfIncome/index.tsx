import { IncomeCard } from "@src/components/cards/IncomeCard";
import { income } from "@src/mocks/income/income.mock";

export function SourcesOfIncome() {
  const initialFormData = income[0];

  const handleChange = (name: string, newValue: string) => {
    console.log(`${name}: ${newValue}`);
  };

  const options: { id: string; label: string; value: string }[] = [
    { id: "1", label: "Maria Lopez", value: "Maria Lopez" },
    { id: "2", label: "Alfonso Gomez", value: "Alfonso Gomez" },
  ];

  return (
    <IncomeCard
      form={initialFormData}
      onChange={handleChange}
      options={options}
    />
  );
}
