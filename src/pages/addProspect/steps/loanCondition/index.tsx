import { useState } from "react";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Toggle } from "@inubekit/toggle";
import { Textfield } from "@inubekit/textfield";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";

import { Fieldset } from "@components/data/Fieldset";

import { currencyFormat } from "@utils/formatData/currency";
import { loanData } from "./config";

export function LoanCondition() {
  const [toggles, setToggles] = useState({
    quotaCapToggle: true,
    maximumTermToggle: false,
  });
  const [quotaCapValue, setQuotaCapValue] = useState("");
  const isMobile = useMediaQuery("(max-width:880px)");

  const handleToggleChange =
    (toggleKey: "quotaCapToggle" | "maximumTermToggle") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setToggles((prev) => ({ ...prev, [toggleKey]: e.target.checked }));
    };

  const handleCurrencyChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.replace(/[^0-9]/g, "");
      const formattedValue = currencyFormat(Number(inputValue));
      setter(formattedValue);
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
                onChange={handleCurrencyChange(setQuotaCapValue)}
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
