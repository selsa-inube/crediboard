import { FormikValues } from "formik";

const currencyFormat = (price: number, withCurrencySymbol = true): string => {
  if (price === 0) {
    if (withCurrencySymbol) return "$ 0";
    return "0";
  }

  const value = Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);

  return withCurrencySymbol ? value : value.replace(/\$/g, "");
};

const parseCurrencyString = (currencyString: string): number => {
  if (!currencyString) return 0;

  const cleanedString = currencyString
    .replace(/[^0-9,]/g, "")
    .replace(",", ".");
  const parsedValue = parseFloat(cleanedString);

  return isNaN(parsedValue) ? 0 : parsedValue;
};

const validateCurrencyField = (
  fieldName: string,
  formik: FormikValues,
  withCurrencySymbol = true,
  optionNameForm: string | undefined
) => {
  const value = optionNameForm
    ? formik.values[optionNameForm]?.[fieldName]
    : formik.values[fieldName];

  return typeof value === "number"
    ? currencyFormat(value, withCurrencySymbol)
    : value;
};

const handleChangeWithCurrency = (
  formik: FormikValues,
  e: React.ChangeEvent<HTMLInputElement>,
  optionNameForm?: string
) => {
  const parsedValue = parseCurrencyString(e.target.value);
  const formattedValue = isNaN(parsedValue) ? "" : parsedValue;

  const fieldName = optionNameForm
    ? `${optionNameForm}.${e.target.name}`
    : e.target.name;

  formik.setFieldValue(fieldName, formattedValue);
};

const parseCunstomFormat = (amount: string) => {
  const amountParsed = parseFloat(amount);
  return amount === "0" || !amountParsed ? "$ 0" : currencyFormat(amountParsed);
};

export {
  currencyFormat,
  parseCunstomFormat,
  handleChangeWithCurrency,
  parseCurrencyString,
  validateCurrencyField,
};
