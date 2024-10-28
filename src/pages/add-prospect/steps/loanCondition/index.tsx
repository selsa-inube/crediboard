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
  const [toggles, setToggles] = useState({ toggle1: true, toggle2: false });

  const handleToggleChange =
    (toggleKey: "toggle1" | "toggle2") =>
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
              checked={toggles.toggle1}
              onChange={handleToggleChange("toggle1")}
            ></Toggle>
            <Text
              type="label"
              size="large"
              weight="bold"
              appearance={toggles.toggle1 ? "success" : "danger"}
            >
              {toggles.toggle1 ? loanData.yes : loanData.no}
            </Text>
            <Stack padding={isMobile ? "0px 10px" : "0px 40px"}>
              <Textfield
                id="1"
                label={loanData.quotaCapLabel}
                placeholder={loanData.quotaCapPlaceholder}
                size="compact"
                type="number"
                disabled={!toggles.toggle1}
                fullwidth={isMobile}
              />
            </Stack>
          </Stack>
          {!toggles.toggle1 && (
            <Stack direction="column" gap="8px">
              <Divider dashed />
              <Text>{loanData.maximumTermTitle}</Text>
              <Stack gap="8px" alignItems="center">
                <Toggle
                  checked={toggles.toggle2}
                  onChange={handleToggleChange("toggle2")}
                ></Toggle>
                <Text
                  type="label"
                  size="large"
                  weight="bold"
                  appearance={toggles.toggle2 ? "success" : "danger"}
                >
                  {toggles.toggle2 ? loanData.yes : loanData.no}
                </Text>
                <Stack padding={isMobile ? "0px 10px" : "0px 40px"}>
                  <Textfield
                    id="1"
                    label={loanData.maximumTermLabel}
                    placeholder={loanData.maximumTermPlaceholder}
                    size="compact"
                    type="number"
                    disabled={!toggles.toggle2}
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
