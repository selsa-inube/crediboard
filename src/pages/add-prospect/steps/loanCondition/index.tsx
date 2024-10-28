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
          <Text>{loanData.title1}</Text>
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
            <Stack padding="0px 40px">
              <Textfield
                id="1"
                label={loanData.label1}
                placeholder={loanData.placeholder1}
                size="compact"
                type="number"
                disabled={!toggles.toggle1}
              />
            </Stack>
          </Stack>
          {!toggles.toggle1 && (
            <Stack direction="column" gap="8px">
              <Divider dashed />
              <Text>{loanData.title1}</Text>
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
                <Stack padding="0px 40px">
                  <Textfield
                    id="1"
                    label={loanData.label2}
                    placeholder={loanData.placeholder2}
                    size="compact"
                    type="number"
                    disabled={!toggles.toggle2}
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
