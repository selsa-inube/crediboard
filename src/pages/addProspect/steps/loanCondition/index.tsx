import { useEffect } from "react";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Toggle } from "@inubekit/toggle";
import { Textfield } from "@inubekit/textfield";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";

import { Fieldset } from "@components/data/Fieldset";
import { currencyFormat } from "@utils/formatData/currency";

import { loanData } from "./config";
import { LoanConditionState } from "../../types/forms.types";

interface ILoanCondition {
  initialValues: LoanConditionState;
  handleOnChange: (newState: LoanConditionState) => void;
  onFormValid: (isValid: boolean) => void;
}

export function LoanCondition(props: ILoanCondition) {
  const { initialValues, handleOnChange, onFormValid } = props;

  const { toggles, quotaCapValue, maximumTermValue } = initialValues;
  const isMobile = useMediaQuery("(max-width:880px)");

  useEffect(() => {
    const isQuotaCapValid =
      !toggles.quotaCapToggle ||
      (toggles.quotaCapToggle && quotaCapValue.trim() !== "");

    const isMaximumTermValid =
      !toggles.maximumTermToggle ||
      (toggles.maximumTermToggle && maximumTermValue.trim() !== "");

    onFormValid(isQuotaCapValid && isMaximumTermValid);
  }, [toggles, quotaCapValue, maximumTermValue, onFormValid]);

  const handleToggleChange =
    (toggleKey: "quotaCapToggle" | "maximumTermToggle") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleOnChange({
        ...initialValues,
        toggles: {
          ...initialValues.toggles,
          [toggleKey]: e.target.checked,
        },
      });
    };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    const formattedValue = currencyFormat(Number(inputValue));
    handleOnChange({
      ...initialValues,
      quotaCapValue: formattedValue,
    });
  };

  const handleMaximumTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange({
      ...initialValues,
      maximumTermValue: e.target.value,
    });
  };

  return (
    <Stack height={isMobile ? "320px" : "272px"}>
      <Fieldset>
        <Stack
          direction="column"
          gap="16px"
          padding={isMobile ? "16px" : "0px 16px"}
        >
          <Text>{loanData.quotaCapTitle}</Text>
          <Stack gap="8px" alignItems="center">
            <Toggle
              checked={toggles.quotaCapToggle}
              onChange={handleToggleChange("quotaCapToggle")}
            />
            <Text
              type="label"
              size="large"
              weight="bold"
              appearance={toggles.quotaCapToggle ? "success" : "danger"}
            >
              {toggles.quotaCapToggle ? loanData.yes : loanData.no}
            </Text>
            <Stack padding={isMobile ? "0px 10px" : "0px 40px"}>
              <Textfield
                id="quotaCap"
                label={loanData.quotaCapLabel}
                placeholder={loanData.quotaCapPlaceholder}
                size="compact"
                type="text"
                disabled={!toggles.quotaCapToggle}
                fullwidth={isMobile}
                value={quotaCapValue}
                onChange={handleCurrencyChange}
              />
            </Stack>
          </Stack>
          {!toggles.quotaCapToggle && (
            <Stack direction="column" gap="8px">
              <Divider dashed />
              <Text>{loanData.maximumTermTitle}</Text>
              <Stack gap="8px" alignItems="center">
                <Toggle
                  checked={toggles.maximumTermToggle}
                  onChange={handleToggleChange("maximumTermToggle")}
                />
                <Text
                  type="label"
                  size="large"
                  weight="bold"
                  appearance={toggles.maximumTermToggle ? "success" : "danger"}
                >
                  {toggles.maximumTermToggle ? loanData.yes : loanData.no}
                </Text>
                <Stack padding={isMobile ? "0px 10px" : "0px 40px"}>
                  <Textfield
                    id="maximumTerm"
                    label={loanData.maximumTermLabel}
                    placeholder={loanData.maximumTermPlaceholder}
                    size="compact"
                    type="number"
                    disabled={!toggles.maximumTermToggle}
                    fullwidth={isMobile}
                    value={maximumTermValue}
                    onChange={handleMaximumTermChange}
                  />
                </Stack>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Fieldset>
    </Stack>
  );
}
