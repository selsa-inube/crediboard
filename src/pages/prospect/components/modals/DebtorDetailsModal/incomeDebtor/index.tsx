import { Stack } from "@inubekit/inubekit";

import { CardGray } from "@components/cards/CardGray";
import { Fieldset } from "@components/data/Fieldset";
import { getPropertyValue } from "@pages/SubmitCreditApplication/util";
import { currencyFormat } from "@utils/formatData/currency";

import { dataIncomeDebtor } from "./config";

interface IIncomeDebtor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any;
}

const incomeFields = [
  { label: dataIncomeDebtor.work, key: "PeriodicSalary" },
  { label: dataIncomeDebtor.capital, key: "PersonalBusinessUtilities" },
  { label: dataIncomeDebtor.variables, key: "OtherNonSalaryEmoluments" },
];

export function IncomeDebtor(props: IIncomeDebtor) {
  const { initialValues } = props;

  return (
    <Fieldset>
      <Stack direction="column" padding="10px 16px" gap="16px">
        {incomeFields.map((field, index) => (
          <CardGray
            key={index}
            label={field.label}
            placeHolder={currencyFormat(
              getPropertyValue(initialValues.borrower_properties, field.key)
            )}
            apparencePlaceHolder="gray"
          />
        ))}
      </Stack>
    </Fieldset>
  );
}
