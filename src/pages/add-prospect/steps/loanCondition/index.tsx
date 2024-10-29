import { useState } from "react";

import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Toggle } from "@inubekit/toggle";
import { Textfield } from "@inubekit/textfield";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Fieldset } from "@components/data/Fieldset";

import { loanData } from "./config";

export function LoanCondition() {
  const [toggles, setToggles] = useState({ quotaCapToggle: true, maximumTermToggle: false });

  const handleToggleChange =
    (toggleKey: "quotaCapToggle" | "maximumTermToggle") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setToggles((prev) => ({ ...prev, [toggleKey]: e.target.checked }));
    };

  const isMobile = useMediaQuery("(max-width:880px)");

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
            ></Toggle>
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
                id="1"
                label={loanData.quotaCapLabel}
                placeholder={loanData.quotaCapPlaceholder}
                size="compact"
                type="number"
                disabled={!toggles.quotaCapToggle}
                fullwidth={isMobile}
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
                ></Toggle>
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
                    id="1"
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
