import { Label } from "@inubekit/label";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Fieldset } from "@components/data/Fieldset";
import { Textfield } from "@inubekit/textfield";
import { Divider } from "@inubekit/divider";

interface DataConditions {
  title1: string;
  title2: string;
  label1: string;
  placeholder1: string;
  label2: string;
  placeholder2: string;
}

interface Answer {
  yes: string;
  no: string;
}

interface LoanConditionUIProps {
  screenMovil: boolean;
  limitSelected: string | null;
  deadlineSelected: boolean;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadioChange1: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dataConditions: DataConditions;
  answer: Answer;
}

export function LoanConditionUI(props: LoanConditionUIProps) {
  const {
    screenMovil,
    limitSelected,
    deadlineSelected,
    handleRadioChange,
    handleRadioChange1,
    dataConditions,
    answer,
  } = props;

  return (
    <Stack height={screenMovil ? "320px" : "280px"}>
      <Fieldset slim>
        <Stack direction="column" padding="8px 16px" gap="16px">
          <Text size="medium" type="body">
            {dataConditions.title1}
          </Text>
          <Stack gap="16px" alignItems="center">
            <Stack direction="column" gap="10px">
              <Stack>
                <input
                  id="limit-yes"
                  name="loanCondition"
                  type="radio"
                  value="yes"
                  onChange={handleRadioChange}
                />
                <Label htmlFor="limit-yes">{answer.yes}</Label>
              </Stack>
              <Stack>
                <input
                  id="limit-no"
                  name="loanCondition"
                  type="radio"
                  value="no"
                  onChange={handleRadioChange}
                />
                <Label htmlFor="limit-no">{answer.no}</Label>
              </Stack>
            </Stack>
            {limitSelected === "yes" && (
              <Textfield
                id="1"
                label={dataConditions.label1}
                placeholder={dataConditions.placeholder1}
                size="compact"
                type="number"
                fullwidth={screenMovil}
              />
            )}
          </Stack>
          {limitSelected === "no" && (
            <>
              <Divider dashed />
              <Text size="medium" type="body">
                {dataConditions.title2}
              </Text>
              <Stack gap="16px" alignItems="center">
                <Stack direction="column" gap="10px">
                  <Stack>
                    <input
                      id="deadline-yes"
                      name="deadlineCondition"
                      type="radio"
                      value="yes"
                      onChange={handleRadioChange1}
                    />
                    <Label htmlFor="deadline-yes">{answer.yes}</Label>
                  </Stack>
                  <Stack>
                    <input
                      id="deadline-no"
                      name="deadlineCondition"
                      type="radio"
                      value="no"
                      onChange={handleRadioChange1}
                    />
                    <Label htmlFor="deadline-no">{answer.no}</Label>
                  </Stack>
                </Stack>
                {deadlineSelected && (
                  <Textfield
                    id="2"
                    label={dataConditions.label2}
                    placeholder={dataConditions.placeholder2}
                    size="compact"
                    type="number"
                    fullwidth={screenMovil}
                  />
                )}
              </Stack>
            </>
          )}
        </Stack>
      </Fieldset>
    </Stack>
  );
}
